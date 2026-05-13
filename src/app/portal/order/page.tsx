import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { OrderBuilder } from "@/components/portal/order-builder";
import Link from "next/link";

export const metadata = {
  title: "Place an Order",
  robots: { index: false, follow: false },
};

export default async function OrderPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!orgId) {
    return (
      <div>
        <PortalHeader
          eyebrow="Order · Quote"
          title="Order placement is unavailable"
          subtitle="Your account is not yet attached to an organization. Contact your account team."
        />
      </div>
    );
  }
  const [org, delivery] = await Promise.all([
    prisma.organization.findUnique({ where: { id: orgId } }),
    prisma.deliveryPreference.findUnique({ where: { organizationId: orgId } }),
  ]);

  return (
    <div>
      <PortalHeader
        eyebrow="Order · Quote"
        title="Place a new data order"
        subtitle="Configure filters, see the credit cost instantly, and place the order against your balance. Delivery follows your saved preference (editable per-order)."
      />

      <div className="mb-6">
        <OrderBuilder
          creditBalance={org?.creditBalance ?? 0}
          defaultDeliveryMethod={delivery?.method}
          defaultDeliveryEndpoint={delivery?.endpoint}
        />
      </div>

      <Card>
        <CardLabel>Delivery preference</CardLabel>
        <CardTitle className="mt-2">
          {delivery
            ? `Default: ${prettyMethod(delivery.method)}${delivery.endpoint ? " · " + delivery.endpoint : ""}`
            : "No default delivery method set."}
        </CardTitle>
        <p className="mt-2 text-sm text-platinum/65">
          The order above uses your default unless you change it. You can edit
          your standing delivery preference at{" "}
          <Link href="/portal/delivery" className="text-ai-cyan hover:underline">
            /portal/delivery
          </Link>
          .
        </p>
      </Card>
    </div>
  );
}

function prettyMethod(m: string) {
  return (
    {
      FILE_DOWNLOAD: "File download (portal)",
      PING_POST: "Ping-post (HTTPS endpoint)",
      SFTP: "SFTP push",
      API_PULL: "API pull",
      CUSTOM: "Custom · 3rd-party",
    } as Record<string, string>
  )[m] ?? m;
}
