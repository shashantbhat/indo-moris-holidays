/**
 * app/routes/itineraries.tsx
 *
 * Itineraries landing page for Indo Moris Holidays — Remix route, Tailwind.
 * Same monochrome system as app/routes/about.tsx: black / charcoal / grey /
 * off-white (#F7F6F3), font-serif for display type, font-sans for body,
 * rounded-lg photo frames, dark (bg-neutral-900) bands for emphasis.
 *
 * Images pull from the same CDN convention used on the About page:
 * `${CDN}/<filename>`. Swap the filenames in the ITINERARIES array below
 * for your real photos.
 */

import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import CountUp from "~/components/CountUp";

const CDN = import.meta.env.VITE_CDN_URL;

export const meta: MetaFunction = () => {
  return [
    { title: "Itineraries — Indo Moris Holidays" },
    {
      name: "description",
      content:
        "Handpicked, fully-planned India itineraries from Indo Moris Holidays — Golden Triangle, Rajasthan, Kerala, Kashmir and beyond.",
    },
  ];
};

type Itinerary = {
  slug: string;
  title: string;
  region: string;
  days: number;
  priceFrom: string;
  image: string;
  blurb: string;
  highlights: string[];
};

const REGIONS = [
  "All",
  "Golden Triangle",
  "Rajasthan",
  "Kerala",
  "Kashmir",
  "Himalayas",
] as const;

const ITINERARIES: Itinerary[] = [
  {
    slug: "golden-triangle-classic",
    title: "The Classic Golden Triangle",
    region: "Golden Triangle",
    days: 6,
    priceFrom: "₹32,000",
    image: "itinerary-golden-triangle.jpg",
    blurb:
      "Delhi, Agra, and Jaipur, the essential first India journey, paced so you actually enjoy it.",
    highlights: ["Taj Mahal at sunrise", "Amber Fort by jeep", "Old Delhi food walk"],
  },
  {
    slug: "kerala-backwaters",
    title: "Kerala Backwaters & Hills",
    region: "Kerala",
    days: 7,
    priceFrom: "₹45,000",
    image: "itinerary-kerala.jpg",
    blurb:
      "Houseboats, tea hills, and quiet coastline, the slow-travel side of South India.",
    highlights: ["Private houseboat night", "Munnar tea estates", "Fort Kochi sunset"],
  },
  {
    slug: "kashmir-valley",
    title: "Kashmir Valley Escape",
    region: "Kashmir",
    days: 6,
    priceFrom: "₹49,000",
    image: "itinerary-kashmir.jpg",
    blurb:
      "Houseboats on Dal Lake, pine-covered Gulmarg, and the Mughal gardens of Srinagar.",
    highlights: ["Dal Lake houseboat stay", "Gulmarg gondola ride", "Shikara sunrise"],
  },
];

const FEATURED_DAYS = [
  {
    day: "Day 1",
    title: "Arrive in Delhi",
    text: "Airport pickup, orientation, and a relaxed evening to settle in before the trip begins.",
  },
  {
    day: "Day 2",
    title: "Old & New Delhi",
    text: "Jama Masjid, a rickshaw ride through Chandni Chowk, then Humayun's Tomb and India Gate.",
  },
  {
    day: "Day 3",
    title: "Drive to Agra",
    text: "Morning drive via expressway, afternoon at Agra Fort, evening free to rest before sunrise.",
  },
  {
    day: "Day 4",
    title: "Taj Mahal at Sunrise",
    text: "Early entry to beat the crowds, followed by a slow drive on to Jaipur through rural Rajasthan.",
  },
  {
    day: "Day 5",
    title: "Jaipur, the Pink City",
    text: "Amber Fort by jeep, City Palace, Hawa Mahal, and an evening in the old bazaars.",
  },
  {
    day: "Day 6",
    title: "Departure",
    text: "A final morning at leisure, then transfer to the airport or your next destination.",
  },
];

export default function Itineraries() {
  const [activeRegion, setActiveRegion] =
    useState<(typeof REGIONS)[number]>("All");

  const visible =
    activeRegion === "All"
      ? ITINERARIES
      : ITINERARIES.filter((it) => it.region === activeRegion);

  return (
    <main className="bg-[#F7F6F3] text-neutral-900">
      {/* ---------- Hero ---------- */}
      <header className="pt-20 pb-14 px-6 text-center">
        <div className="mx-auto max-w-xl">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span className="h-px w-7 bg-neutral-400" />
            Since 2008 · New Delhi, India
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold leading-tight text-neutral-900">
            Itineraries, planned properly
          </h1>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg">
            No copy-pasted routes. Every itinerary below is a starting point,
            each one built around real driving times, honest pacing, and
            places worth the stop.
          </p>
        </div>
      </header>

      {/* ---------- Region filter ---------- */}
      <div className="px-6 pb-10">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                activeRegion === region
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Itinerary grid ---------- */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((it) => (
            <article
              key={it.slug}
              className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <img
                  src={`${CDN}/${it.image}`}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-700">
                  {it.days} Days
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                  {it.region}
                </span>
                <h3 className="mt-1.5 font-serif text-xl font-semibold text-neutral-900">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {it.blurb}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {it.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-neutral-400">
                      From
                    </p>
                    <p className="font-serif text-lg font-semibold text-neutral-900">
                      {it.priceFrom}
                    </p>
                  </div>
                  <a
                    href={`/itineraries/${it.slug}`}
                    className="rounded-full border border-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                  >
                    View Itinerary
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Featured day-by-day ---------- */}
      <section className="bg-neutral-900 px-6 py-20 text-white" data-nav-theme="dark">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-lg text-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-px w-7 bg-neutral-500" />
              Featured itinerary
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-white">
              The Classic Golden Triangle, day by day
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              6 days, from ₹32,000 per person. Here's exactly how the trip
              unfolds.
            </p>
          </div>

          <ol className="mt-12 space-y-8">
            {FEATURED_DAYS.map((d, i) => (
              <li key={d.day} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-600 font-serif text-sm text-white">
                    {i + 1}
                  </span>
                  {i < FEATURED_DAYS.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-neutral-700" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                    {d.day}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-white">
                    {d.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    {d.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Stats strip ---------- */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <div>
            <CountUp
                from={1971}
                to={2008}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl text-neutral-900"
                delay={0}
            />
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-500">
              Year Founded
            </p>
          </div>
          <div>
            <CountUp
                from={0}
                to={10}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl text-neutral-900"
                delay={0}
            />
            <span className="text-3xl text-neutral-900">+</span>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-500">
              Curated Itineraries
            </p>
          </div>
          <div>
            <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl text-neutral-900"
                delay={0}
            />
            <span className="text-3xl text-neutral-900">+</span>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-500">
              Happy Travellers
            </p>
          </div>
          <div>
            <CountUp
                from={0}
                to={4.6}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl text-neutral-900"
                delay={0}
            />
            <span className="text-2xl text-neutral-900">★</span>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-500">
              Guest Rating
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-neutral-900 px-6 py-16 text-center" data-nav-theme="dark">
        <div className="mx-auto max-w-lg">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
            Don't see the trip you're picturing?
          </h2>
          <p className="mt-3 text-neutral-400">
            Every itinerary here can be adjusted, or built from scratch.
            Tell us where you'd like to go and we'll take it from there.
          </p>
          <a
            href="/#book"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Plan a Custom Trip
          </a>
        </div>
      </section>
    </main>
  );
}