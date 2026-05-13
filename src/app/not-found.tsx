import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="py-32 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ai-cyan">
            404 · Signal not found
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-white">
            That page is outside the model.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-platinum/65">
            The page you requested does not exist, or has been retired. Return
            to the platform overview to continue.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/">Return home</Button>
            <Button href="/industries" variant="outline">
              Browse industries
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
