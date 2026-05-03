import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 flex flex-col items-center justify-center text-center">
      <p className="section-label mb-6">404</p>
      <h1 className="text-cream text-4xl font-light mb-4">Page Not Found</h1>
      <p className="text-muted text-sm font-light mb-10">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="border border-olive text-olive hover:bg-olive hover:text-black transition-colors px-8 py-3 text-xs uppercase tracking-widest font-normal"
      >
        Return Home
      </Link>
    </div>
  );
}
