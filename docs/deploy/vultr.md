# Vultr Deployment Runbook

End-to-end production deployment of VRTCLS.AI on a Vultr VPS.

## Target topology

```
Cloudflare (DNS, TLS, DDoS)
       │
       ▼
  nginx (reverse proxy, gzip, HTTP/2)
       │
       ▼
  Next.js (PM2-managed, port 3000)
       │
       ├──► PostgreSQL 16 (localhost or Vultr Managed DB)
       └──► Redis (optional, for rate limiting)
```

## 1. Provision the instance

- Vultr Cloud Compute (or Bare Metal for larger scale).
- **Ubuntu 22.04 LTS**, minimum **4 vCPU / 8 GB RAM / 80 GB SSD**.
- Note the public IPv4. Add to Cloudflare DNS once DNS is decided.
- Open ports: 22 (SSH), 80, 443 in the Vultr firewall.

## 2. Initial server hardening

```bash
ssh root@<IP>
apt update && apt -y upgrade
adduser deploy && usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
# Edit /etc/ssh/sshd_config: PermitRootLogin no, PasswordAuthentication no
systemctl restart ssh
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable
```

## 3. Install system dependencies

```bash
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL 16
sudo apt install -y postgresql postgresql-contrib

# nginx + certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# PM2
sudo npm install -g pm2

# Optional: Redis
sudo apt install -y redis-server
```

## 4. Database setup

```bash
sudo -u postgres psql <<'SQL'
CREATE USER vrtcls WITH PASSWORD 'STRONG_RANDOM_HERE';
CREATE DATABASE vrtclsai OWNER vrtcls;
GRANT ALL PRIVILEGES ON DATABASE vrtclsai TO vrtcls;
SQL
```

## 5. Deploy the app

```bash
sudo -u deploy -i
cd ~
git clone git@github.com:jeff-cline/vrtclsai.git app
cd app
cp .env.example .env
# Edit .env:
#   DATABASE_URL=postgresql://vrtcls:STRONG_RANDOM_HERE@localhost:5432/vrtclsai
#   AUTH_SECRET=$(openssl rand -base64 32)
#   AUTH_URL=https://vrtcls.ai
#   SEED_ADMIN_PASSWORD=<strong unique>
#   NEXT_PUBLIC_SITE_URL=https://vrtcls.ai
nano .env

npm install --legacy-peer-deps
npm run build
npm run db:push
npm run db:seed
```

## 6. PM2

The repo includes `ecosystem.config.cjs`:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd          # run the printed command as sudo
```

Verify:

```bash
pm2 status
curl -I http://127.0.0.1:3000
```

## 7. nginx reverse proxy

```bash
sudo cp docs/deploy/nginx.conf /etc/nginx/sites-available/vrtclsai
sudo ln -sf /etc/nginx/sites-available/vrtclsai /etc/nginx/sites-enabled/vrtclsai
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 8. TLS

```bash
sudo certbot --nginx -d vrtcls.ai -d www.vrtcls.ai
```

Auto-renewal is installed by certbot. Verify with `sudo certbot renew --dry-run`.

## 9. Cloudflare (recommended)

- Add the domain to Cloudflare; copy nameservers to your registrar.
- DNS: `A vrtcls.ai → <Vultr IP>` (proxied/orange-cloud).
- SSL/TLS mode: **Full (strict)**.
- Page rules / cache: aggressive cache for static, bypass for `/portal`, `/admin`, `/manager`, `/api/*`.

## 10. Subsequent deploys

```bash
ssh deploy@<host>
cd ~/app
git pull
npm install --legacy-peer-deps
npm run build
npm run db:push
pm2 reload ecosystem.config.cjs
```

Or use the included `scripts/deploy.sh`.

## Backups

```bash
sudo -u postgres pg_dump vrtclsai | gzip > /var/backups/vrtclsai-$(date +%Y%m%d).sql.gz
```

Schedule via cron; copy off-box to S3-compatible storage (Vultr Object Storage or AWS S3).

## Health checks

```bash
curl -sS https://vrtcls.ai/api/health 2>/dev/null || echo "no health endpoint yet"
pm2 logs vrtclsai --lines 50
sudo journalctl -u nginx -n 50
```

## Rotating secrets

- Rotate `AUTH_SECRET`: invalidates all sessions.
- Rotate `DATABASE_URL` password: update `.env` and `pm2 reload`.
- Rotate admin password: log in, change it; or run `npm run db:seed` after editing `SEED_ADMIN_PASSWORD` (overwrites the existing admin hash).
