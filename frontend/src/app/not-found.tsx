import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="rounded-xl">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg" className="rounded-xl">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
