"use client";

import { useState } from "react";
import Image from "next/image";

const clients = [
  { name: "The North Face",               logo: "/images/clients/clients_01.png" },
  { name: "Cessna Aircraft",              logo: "/images/clients/clients_02.png" },
  { name: "Parker Guitars",               logo: "/images/clients/clients_03.png" },
  { name: "Backroads Active Travel",      logo: "/images/clients/clients_04.png" },
  { name: "Segway",                       logo: "/images/clients/clients_05.png" },
  { name: "Thomson Safaris",              logo: "/images/clients/clients_06.png" },
  { name: "JanSport",                     logo: "/images/clients/clients_07.png" },
  { name: "Hinckley Yachts",             logo: "/images/clients/clients_08.png" },
  { name: "Ben Hogan Golf",              logo: "/images/clients/clients_09.png" },
  { name: "TomTom Navigation",           logo: "/images/clients/clients_10.png" },
  { name: "Road Scholar",                logo: "/images/clients/clients_11.png" },
  { name: "MIT Sloan",                   logo: "/images/clients/clients_12.png" },
  { name: "Johnson & Johnson",           logo: "/images/clients/clients_13.png" },
  { name: "The Weather Channel",         logo: "/images/clients/clients_14.png" },
  { name: "Bombardier Aerospace",        logo: "/images/clients/clients_15.png" },
  { name: "W. L. Gore / Gore-Tex",       logo: "/images/clients/clients_16.png" },
  { name: "Citibank",                    logo: "/images/clients/clients_17.png" },
  { name: "The Salvation Army",          logo: "/images/clients/clients_18.png" },
  { name: "Teva",                        logo: "/images/clients/clients_19.png" },
  { name: "Best Western",               logo: "/images/clients/clients_20.png" },
  { name: "Top Flite Golf",             logo: "/images/clients/clients_21.png" },
  { name: "Alden Yachts",               logo: "/images/clients/clients_22.png" },
  { name: "Apollo Educational Group",   logo: "/images/clients/clients_23.png" },
  { name: "Chums",                       logo: "/images/clients/clients_24.png" },
  { name: "Samsonite",                   logo: "/images/clients/clients_25.png" },
  { name: "Doubletree Hotels",           logo: "/images/clients/clients_26.png" },
  { name: "Boyd Gaming",                logo: "/images/clients/clients_27.png" },
  { name: "Broadreach",                 logo: "/images/clients/clients_28.png" },
  { name: "Ranger Boats",               logo: "/images/clients/clients_29.png" },
  { name: "Del Webb",                   logo: "/images/clients/clients_30.png" },
  { name: "Degré 7 Skiwear",            logo: "/images/clients/clients_31.png" },
  { name: "Dial Company",               logo: "/images/clients/clients_32.png" },
  { name: "Troxel Cycling & Fitness",   logo: "/images/clients/clients_33.png" },
  { name: "California Artichoke Advisory Board", logo: "/images/clients/clients_34.png" },
  { name: "Earth Shoes",                logo: "/images/clients/clients_35.png" },
  { name: "Grand Banks Yachts",         logo: "/images/clients/clients_36.png" },
  { name: "Hodgdon Yachts",             logo: "/images/clients/clients_37.png" },
  { name: "Qwest Communications",       logo: "/images/clients/clients_38.png" },
  { name: "Motorola",                   logo: "/images/clients/clients_39.png" },
  { name: "Rockford Fosgate",           logo: "/images/clients/clients_40.png" },
  { name: "Starwood Hotels",            logo: "/images/clients/clients_41.png" },
  { name: "Tauck World Discovery",      logo: "/images/clients/clients_42.png" },
  { name: "Simon & Schuster",           logo: "/images/clients/clients_43.png" },
  { name: "Winston Flowers",            logo: "/images/clients/clients_44.png" },
  { name: "Weyerhaeuser",               logo: "/images/clients/clients_45.png" },
  { name: "TIAA",                       logo: "/images/clients/clients_46.png" },
  { name: "DuPont",                     logo: "/images/clients/clients_47.png" },
  { name: "Wells Fargo",                logo: "/images/clients/clients_48.png" },
];

const INITIAL_COUNT = 18;

export default function Clients() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? clients : clients.slice(0, INITIAL_COUNT);

  return (
    <section className="py-16 md:py-20 bg-black" id="clients" aria-labelledby="clients-heading">
      <div className="section-inner">
        <p className="section-label mb-2">Clients</p>
        <p className="text-muted text-sm font-light mb-12">
          Enthusiast brands come in all industries and sizes.
        </p>
        <h2 id="clients-heading" className="sr-only">Our Clients</h2>

        <ul
          className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-6 gap-y-8"
          role="list"
        >
          {visible.map(({ name, logo }) => (
            <li key={name} className="flex items-center justify-center min-h-[100px] group">
              <Image
                src={logo}
                alt={name}
                width={240}
                height={150}
                className="client-logo w-full h-auto max-h-[120px] object-contain transition-opacity duration-200"
              />
            </li>
          ))}
        </ul>

        {clients.length > INITIAL_COUNT && (
          <div className="mt-12 flex items-center gap-6">
            <div className="flex-1 h-px bg-olive/15" />
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="text-muted/60 hover:text-olive text-xs uppercase tracking-[0.18em] font-normal transition-colors whitespace-nowrap"
            >
              {expanded ? "Fewer Clients" : `All Clients`}
            </button>
            <div className="flex-1 h-px bg-olive/15" />
          </div>
        )}
      </div>
    </section>
  );
}
