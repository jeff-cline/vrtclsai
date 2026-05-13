import { PortalHeader } from "@/components/portal/portal-header";
import { Card, CardLabel, CardTitle } from "@/components/ui/card";

export default function ApprovalsPage() {
  return (
    <div>
      <PortalHeader
        eyebrow="Manager · Approvals"
        title="Approval queue"
        subtitle="Audience and download requests awaiting manager approval."
        tone="cyan"
      />
      <Card>
        <CardLabel>Empty</CardLabel>
        <CardTitle className="mt-2">No items awaiting approval.</CardTitle>
        <p className="mt-2 text-sm text-platinum/65">
          When team members submit audience requests above their per-request credit threshold,
          they will appear here for your approval.
        </p>
      </Card>
    </div>
  );
}
