const clients = [
  "The North Face",
  "Cessna",
  "Parker Guitars",
  "Backroads",
  "Segway",
  "Thomson Safaris",
  "JanSport",
  "Hinckley Yachts",
  "Ben Hogan",
  "TomTom",
  "Road Scholar",
  "MIT Sloan",
  "Johnson & Johnson",
  "The Weather Channel",
  "Bombardier",
  "W. L. Gore",
  "Citibank",
  "The Salvation Army",
  "Grand Banks Yachts",
  "TIAA",
  "Winston Flowers",
  "Chums",
  "Broadreach",
];

export default function Clients() {
  return (
    <section className="py-16 md:py-20 bg-charcoal" id="clients" aria-labelledby="clients-heading">
      <div className="section-inner">
        <p className="section-label mb-2">Clients</p>
        <p className="text-muted text-xs font-light mb-10">
          Enthusiast brands come in all industries and sizes.
        </p>
        <h2 id="clients-heading" className="sr-only">Our Clients</h2>

        {/* Logo grid — replace spans with <Image> once logo files are added */}
        <ul
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-8 gap-y-8"
          role="list"
        >
          {clients.map((name) => (
            <li key={name} className="flex items-center justify-center min-h-[40px]">
              {/* TODO: <Image src={`/images/clients/${toSlug(name)}.svg`} alt={name} ... /> */}
              <span className="text-muted/50 text-xs font-light text-center leading-tight">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
