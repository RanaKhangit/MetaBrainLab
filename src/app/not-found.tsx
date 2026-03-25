import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sovereign-navy flex items-center justify-center">
      <Container>
        <div className="text-center">
          <p className="text-6xl font-mono text-cognitive-teal mb-4">404</p>
          <h1 className="heading-section mb-4">Page Not Found</h1>
          <p className="body-large mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-cognitive-teal px-6 py-3 text-sm font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
