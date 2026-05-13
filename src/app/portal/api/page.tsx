import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";

export default function ApiPage() {
  return (
    <div>
      <PortalHeader
        eyebrow="API · Programmatic access"
        title="API tokens & docs"
        subtitle="REST endpoints for order placement, status, file fetch, and credit balance lookup."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardLabel>Tokens</CardLabel>
          <CardTitle className="mt-2">Issued API keys</CardTitle>
          <p className="mt-3 text-sm text-platinum/65">
            API access is enabled per-organization. Contact your account team to issue keys.
          </p>
        </Card>
        <Card>
          <CardLabel>Endpoints</CardLabel>
          <CardTitle className="mt-2">Core surface</CardTitle>
          <ul className="mt-3 space-y-2 font-mono text-xs text-platinum/65">
            <li>POST /v1/orders</li>
            <li>GET /v1/orders/:id</li>
            <li>GET /v1/orders/:id/files</li>
            <li>GET /v1/credits/balance</li>
            <li>GET /v1/delivery-preferences</li>
            <li>PUT /v1/delivery-preferences</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
