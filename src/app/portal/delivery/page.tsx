import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveDeliveryPreference } from "@/app/actions/delivery";

export const metadata = {
  title: "Delivery preferences",
  robots: { index: false, follow: false },
};

const methods: { key: string; label: string; help: string }[] = [
  {
    key: "FILE_DOWNLOAD",
    label: "File download (portal)",
    help: "Our team uploads CSV / Parquet files to your order; your team downloads from the portal. No endpoint required.",
  },
  {
    key: "PING_POST",
    label: "Ping-post · HTTPS endpoint",
    help: "Records are POSTed to your HTTPS endpoint. Endpoint should accept JSON and return 2xx on success.",
  },
  {
    key: "SFTP",
    label: "SFTP push · your server",
    help: "We push files to your SFTP server on a schedule you specify. Provide hostname, path, and credential exchange procedure.",
  },
  {
    key: "API_PULL",
    label: "API pull · you fetch",
    help: "You poll our API to retrieve delivered records. API credentials are issued by your account team.",
  },
  {
    key: "CUSTOM",
    label: "Custom · 3rd-party-mediated",
    help: "Delivery routed through a third party (e.g., delivery middleware, secure exchange). May incur additional third-party costs.",
  },
];

export default async function DeliveryPage() {
  const session = await auth();
  const orgId = (session?.user as { organizationId?: string | null } | undefined)?.organizationId;
  if (!orgId) {
    return (
      <div>
        <PortalHeader
          eyebrow="Delivery · Preferences"
          title="No organization on this account"
          subtitle="Contact your account team to attach your user to an organization."
        />
      </div>
    );
  }
  const pref = await prisma.deliveryPreference.findUnique({
    where: { organizationId: orgId },
  });
  const current = pref?.method ?? "FILE_DOWNLOAD";

  return (
    <div>
      <PortalHeader
        eyebrow="Delivery · Preferences"
        title="How should we deliver your data?"
        subtitle="Set the default delivery method for new orders. Each order can override this at placement time."
        tone="cyan"
      />

      <Card className="p-0">
        <form action={saveDeliveryPreference} className="grid lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6 border-r border-platinum/5 p-8">
            <CardLabel>Default delivery method</CardLabel>
            <div className="space-y-2">
              {methods.map((m) => (
                <label
                  key={m.key}
                  className="block cursor-pointer rounded-md border border-platinum/10 bg-navy-900/50 p-4 transition-colors hover:border-platinum/30 has-[:checked]:border-ai-cyan/50 has-[:checked]:bg-ai-cyan/5"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="method"
                      value={m.key}
                      defaultChecked={current === m.key}
                      className="mt-1 accent-ai-cyan"
                    />
                    <div className="flex-1">
                      <div className="font-display text-sm font-medium text-white">{m.label}</div>
                      <div className="mt-1 text-xs text-platinum/60 leading-relaxed">{m.help}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Endpoint / Server (if applicable)
              </span>
              <input
                name="endpoint"
                defaultValue={pref?.endpoint ?? ""}
                placeholder="https://intake.example.com/v1/leads · sftp://server.example.com/incoming"
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-platinum/60">
                Notes for the fulfillment team
              </span>
              <textarea
                name="notes"
                rows={3}
                defaultValue={pref?.notes ?? ""}
                placeholder="Anything our team should know — schema preferences, authentication, schedule constraints."
                className="mt-1.5 w-full rounded-md border border-platinum/10 bg-navy-900/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-platinum/30 focus:border-ai-cyan/50"
              />
            </label>

            <div>
              <Button type="submit">Save delivery preferences →</Button>
            </div>
          </div>

          <aside className="space-y-5 bg-navy-900/40 p-8">
            <CardLabel>Disclaimer · 3rd-party delivery</CardLabel>
            <CardTitle className="text-base leading-snug">
              Some delivery methods may require additional third-party services
            </CardTitle>
            <p className="text-sm text-platinum/70 leading-relaxed">
              Credit pricing on orders covers data acquisition and standard
              delivery into our portal (file download). Delivery into customer
              infrastructure may use third-party connectors, ingestion
              middleware, or secure-exchange services. Where this applies, the
              third-party cost is billed separately and is{" "}
              <span className="text-white">not included</span> in the credit
              price you see at order placement.
            </p>
            <p className="text-xs text-platinum/55 leading-relaxed">
              Your account team confirms third-party costs in writing before any
              delivery infrastructure is provisioned on your behalf.
            </p>

            <div className="rounded-md border border-platinum/10 bg-navy-800/60 p-4 text-xs text-platinum/70 leading-relaxed">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ai-cyan">
                What does "covered" mean?
              </div>
              <ul className="mt-2 space-y-1">
                <li>· File download from this portal — covered</li>
                <li>· Ping-post to your existing HTTPS endpoint — covered</li>
                <li>· SFTP push to your existing server — covered</li>
                <li>· API pull from our API — covered</li>
                <li>· Custom routing via 3rd-party middleware — billed separately</li>
              </ul>
            </div>
          </aside>
        </form>
      </Card>
    </div>
  );
}
