const clients = [
  "Cessna",
  "MIT Sloan",
  "Road Scholar",
  "Chums",
  "Segway",
  "Winston Flowers",
  "Broadreach",
  "The North Face",
  "Thomson Safaris",
  "Parker Guitars",
  "Grand Banks Yachts",
  "TIAA Financial Services",
  "DuPont",
  "Wells Fargo",
  "Phoenix Coyotes",
  "Backroads Active Travel",
  "Boyd Gaming",
  "Ballet Arizona",
];

export default function Clients() {
  return (
    <section className="py-16 md:py-20" id="clients" aria-labelledby="clients-heading">
      <div className="section-inner">
        <p className="section-label mb-6">Clients</p>
        <h2 id="clients-heading" className="sr-only">Our Clients</h2>

        {/* Logo grid — replace text names with <Image> tags once logo files are available */}
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-8 gap-y-8" role="list">
          {clients.map((name) => (
            <li key={name} className="flex items-center justify-center">
              {/* TODO: replace with <Image src={`/images/clients/${slug}.svg`} ... /> */}
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
