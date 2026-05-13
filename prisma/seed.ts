import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "jeff.cline@me.com").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeNow!42";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Jeff Cline";

  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.warn(
      "[seed] SEED_ADMIN_PASSWORD not set — using fallback. Change it immediately after first login."
    );
  }

  // Admin user (no org affiliation; super-admin)
  const adminHash = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminHash, role: "ADMIN", name: adminName },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  // Demo enterprise organization
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

  // Sample manager + customer users for Meridian
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

  await prisma.user.upsert({
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

  await prisma.user.upsert({
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

  // Credit txns (audit history)
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
        organizationId: acme.id,
        amount: -1200,
        kind: "CONSUME",
        note: "audience query · healthcare-hnw-2026q2",
        grantedById: null,
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

  // Audiences
  await prisma.audience.createMany({
    data: [
      {
        organizationId: acme.id,
        name: "Regenerative medicine · 4-state cohort",
        description: "Predictive cohort across AZ, NV, TX, FL — 72h intent window",
        filters: { states: ["AZ", "NV", "TX", "FL"], window: "72h", category: "regenerative" },
        size: 18420,
        confidence: 0.92,
      },
      {
        organizationId: acme.id,
        name: "Longevity HNW · concierge tier",
        description: "HNW longevity-program consideration · concierge price point",
        filters: { tier: "concierge", income: ">$500k" },
        size: 4280,
        confidence: 0.88,
      },
      {
        organizationId: aurora.id,
        name: "HNW migration · CA → TX corridor",
        description: "Pre-MLS migration intent · 60–90 day window",
        filters: { from: "CA", to: ["TX"], window: "60-90d" },
        size: 9610,
        confidence: 0.9,
      },
    ],
    skipDuplicates: true,
  });

  // Lead requests
  await prisma.leadRequest.createMany({
    data: [
      {
        organizationId: acme.id,
        requestedById: admin.id,
        industry: "Healthcare",
        audienceName: "Regenerative medicine · AZ cohort",
        filters: { state: "AZ", window: "48h" },
        estimatedSize: 2840,
        confidence: 0.91,
        status: "DELIVERED",
        creditCost: 320,
      },
      {
        organizationId: acme.id,
        requestedById: admin.id,
        industry: "Healthcare",
        audienceName: "Longevity HNW · concierge",
        filters: { tier: "concierge" },
        estimatedSize: 1180,
        confidence: 0.86,
        status: "APPROVED",
        creditCost: 240,
      },
      {
        organizationId: aurora.id,
        requestedById: admin.id,
        industry: "Real Estate",
        audienceName: "TX corridor · pre-MLS",
        filters: { from: "CA", to: "TX" },
        estimatedSize: 4210,
        confidence: 0.9,
        status: "PENDING",
        creditCost: 460,
      },
    ],
    skipDuplicates: true,
  });

  console.log(
    `[seed] OK — admin: ${adminEmail}, orgs: 2, seeded users with passwords: 'DemoManager!1' / 'DemoCustomer!1'`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
