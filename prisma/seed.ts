import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "jeff.cline@me.com").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "TEMP!234";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Jeff Cline";

  // Issue a temporary password only when the admin doesn't exist yet, or when
  // the existing admin hasn't completed the forced password change. Once they
  // change it, future seed runs leave the account alone.
  const adminHash = await bcrypt.hash(adminPassword, 12);
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  // The admin should be on the temp password if any of:
  //   (a) the row doesn't exist yet,
  //   (b) it still has mustChangePassword=true (they haven't completed the flow),
  //   (c) they have never signed in (lastLoginAt is null) — covers the case
  //       where this column was just added by a schema push and the existing
  //       admin row predates the forced-change flow.
  // Once they've signed in *and* chosen their own password, future seed runs
  // leave the account alone.
  let admin;
  if (!existingAdmin) {
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        passwordHash: adminHash,
        role: "ADMIN",
        mustChangePassword: true,
      },
    });
    console.log(`[seed] admin created with temporary password — will be forced to change on first login`);
  } else if (existingAdmin.mustChangePassword || !existingAdmin.lastLoginAt) {
    admin = await prisma.user.update({
      where: { email: adminEmail },
      data: { passwordHash: adminHash, role: "ADMIN", name: adminName, mustChangePassword: true },
    });
    console.log(`[seed] admin still on temporary password — refreshed temp hash`);
  } else {
    admin = await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "ADMIN", name: adminName },
    });
    console.log(`[seed] admin already chose a password — left unchanged`);
  }

  // Demo customer organization
  const acme = await prisma.organization.upsert({
    where: { id: "seed-acme-health" },
    update: {},
    create: {
      id: "seed-acme-health",
      name: "Meridian Regenerative Health",
      tier: "enterprise",
      creditBalance: 25000,
    },
  });

  const aurora = await prisma.organization.upsert({
    where: { id: "seed-aurora-realty" },
    update: {},
    create: {
      id: "seed-aurora-realty",
      name: "Aurora Luxury Realty",
      tier: "strategic",
      creditBalance: 12000,
    },
  });

  // Delivery preferences
  await prisma.deliveryPreference.upsert({
    where: { organizationId: acme.id },
    update: {},
    create: {
      organizationId: acme.id,
      method: "FILE_DOWNLOAD",
      notes: "CSV deliveries preferred; team downloads from the portal.",
    },
  });

  await prisma.deliveryPreference.upsert({
    where: { organizationId: aurora.id },
    update: {},
    create: {
      organizationId: aurora.id,
      method: "PING_POST",
      endpoint: "https://lead-ingest.aurora-realty.example/v1/intake",
      notes: "Ping-post with HMAC signature; admin team has the secret.",
    },
  });

  const managerHash = await bcrypt.hash("DemoManager!1", 12);
  const customerHash = await bcrypt.hash("DemoCustomer!1", 12);

  await prisma.user.upsert({
    where: { email: "manager@meridian.example" },
    update: { organizationId: acme.id, role: "MANAGER" },
    create: {
      email: "manager@meridian.example",
      name: "Morgan Chen",
      passwordHash: managerHash,
      role: "MANAGER",
      organizationId: acme.id,
    },
  });

  const meridianCustomer = await prisma.user.upsert({
    where: { email: "analyst@meridian.example" },
    update: { organizationId: acme.id, role: "CUSTOMER" },
    create: {
      email: "analyst@meridian.example",
      name: "Riley Park",
      passwordHash: customerHash,
      role: "CUSTOMER",
      organizationId: acme.id,
    },
  });

  const auroraCustomer = await prisma.user.upsert({
    where: { email: "ops@aurora.example" },
    update: { organizationId: aurora.id, role: "CUSTOMER" },
    create: {
      email: "ops@aurora.example",
      name: "Avery Ridgeway",
      passwordHash: customerHash,
      role: "CUSTOMER",
      organizationId: aurora.id,
    },
  });

  // Credit txns
  await prisma.creditTxn.createMany({
    data: [
      {
        organizationId: acme.id,
        amount: 25000,
        kind: "GRANT",
        note: "initial enterprise allocation · wire received",
        grantedById: admin.id,
      },
      {
        organizationId: aurora.id,
        amount: 12000,
        kind: "GRANT",
        note: "initial strategic allocation",
        grantedById: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  // Sample orders
  await prisma.order.createMany({
    data: [
      {
        id: "seed-order-acme-1",
        organizationId: acme.id,
        requestedById: meridianCustomer.id,
        industry: "Healthcare",
        region: "AZ, NV, TX, FL",
        volume: 5000,
        filters: { ageRange: [35, 70], incomeMin: 200000, enrichments: ["demographic", "identity"], decayWindowHours: 72 },
        creditCost: 1800,
        status: "DELIVERED",
        deliveryMethod: "FILE_DOWNLOAD",
        deliveryNotes: "CSV with standard schema.",
        acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      },
      {
        id: "seed-order-acme-2",
        organizationId: acme.id,
        requestedById: meridianCustomer.id,
        industry: "Healthcare",
        region: "FL",
        volume: 2500,
        filters: { specialty: "longevity", incomeMin: 350000, enrichments: ["demographic", "psychographic", "identity"] },
        creditCost: 1100,
        status: "PENDING",
        deliveryMethod: "FILE_DOWNLOAD",
        acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
      },
      {
        id: "seed-order-aurora-1",
        organizationId: aurora.id,
        requestedById: auroraCustomer.id,
        industry: "Real Estate",
        region: "CA → TX corridor",
        volume: 8000,
        filters: { window: "60-90d", segment: "HNW migration", enrichments: ["identity", "behavioral"] },
        creditCost: 2400,
        status: "IN_PROGRESS",
        deliveryMethod: "PING_POST",
        deliveryEndpoint: "https://lead-ingest.aurora-realty.example/v1/intake",
        acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
      },
    ],
    skipDuplicates: true,
  });

  // Consume txns for placed orders
  await prisma.creditTxn.createMany({
    data: [
      {
        organizationId: acme.id,
        amount: -1800,
        kind: "CONSUME",
        note: "order seed-order-acme-1 · 5,000 records",
        orderId: "seed-order-acme-1",
      },
      {
        organizationId: acme.id,
        amount: -1100,
        kind: "CONSUME",
        note: "order seed-order-acme-2 · 2,500 records",
        orderId: "seed-order-acme-2",
      },
      {
        organizationId: aurora.id,
        amount: -2400,
        kind: "CONSUME",
        note: "order seed-order-aurora-1 · 8,000 records",
        orderId: "seed-order-aurora-1",
      },
    ],
    skipDuplicates: true,
  });

  // Reconcile balances to reflect consumption
  await prisma.organization.update({
    where: { id: acme.id },
    data: { creditBalance: 25000 - 1800 - 1100 },
  });
  await prisma.organization.update({
    where: { id: aurora.id },
    data: { creditBalance: 12000 - 2400 },
  });

  // Sample inbound lead from public /quote form
  await prisma.demoRequest.createMany({
    data: [
      {
        name: "Casey Brennan",
        email: "casey@example-clinic.com",
        company: "Pacific Longevity Clinic",
        phone: "+1-555-0107",
        industry: "Healthcare",
        volume: "10k–50k",
        message: "Looking to acquire HNW patient leads in West Coast metros, Q3 ramp.",
        source: "quote",
      },
      {
        name: "Jordan Hale",
        email: "jordan@example-pe.com",
        company: "Beacon Equity Partners",
        industry: "Private Equity",
        volume: "50k–250k",
        message: "Portfolio-wide deployment across home services and wellness portcos.",
        source: "demo",
      },
    ],
    skipDuplicates: true,
  });

  console.log(
    `[seed] OK · admin: ${adminEmail} · orgs: 2 · sample orders + delivery preferences seeded · demo passwords 'DemoManager!1' / 'DemoCustomer!1'`
  );
  void admin;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
