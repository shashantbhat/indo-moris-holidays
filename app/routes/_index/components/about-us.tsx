/**
 * app/routes/about.tsx
 *
 * About Us page for Indo Moris Holidays — Remix route, styled with Tailwind.
 * Palette is intentionally monochrome (black / charcoal / grey / off-white)
 * to match the rest of indomorisholidays.com.
 *
 * Optional but recommended: pair a serif display face with a clean sans body,
 * the same way the rest of the site likely does. If you add Fraunces (or any
 * serif) via Google Fonts in app/root.tsx and register it in tailwind.config
 * as `fontFamily.serif`, the `font-serif` classes below will pick it up
 * automatically. Until then it'll just fall back to the system serif stack.
 */

import type { MetaFunction } from "@remix-run/node";
import StatsStrip from './stats-strip';
const CDN = import.meta.env.VITE_CDN_URL;
export const meta: MetaFunction = () => {
  return [
    { title: "About Us — Indo Moris Holidays" },
    {
      name: "description",
      content:
        "Meet the founder behind Indo Moris Holidays and the story of building a family-run travel company in New Delhi since 2008.",
    },
  ];
};

export default function AboutUs() {
  return (
    <main className="bg-[#F7F6F3] text-neutral-900">
      {/* ---------- Header ---------- */}
      <header className="pt-32 pb-12 px-6 text-center">
        <div className="mx-auto max-w-xl">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span className="h-px w-7 bg-neutral-400" />
            Since 2008 · New Delhi, India
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold leading-tight text-neutral-900">
            The story behind Indo Moris Holidays
          </h1>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg">
            A family-run travel company built one welcomed guest, one
            well-planned journey, and one returning traveller at a time.
          </p>
        </div>
      </header>

      {/* ---------- Founder section ---------- */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          {/* Photo */}
          <div>
            <div className="mx-auto max-w-[340px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.35)]">
                <img
                  src={`${CDN}/sandeep-bhat.jpg`}
                  alt="Sandeep Bhat, Founder of Indo Moris Holidays"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <p className="font-serif text-lg font-semibold text-neutral-900">
                Sandeep Bhat
              </p>
              <p className="text-xs uppercase tracking-[0.1em] text-neutral-500">
                Founder &amp; Director
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-px w-7 bg-neutral-400" />
              Our founder
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
              Hospitality that starts with a handshake, not a checklist
            </h2>

            <p className="mt-5 text-neutral-600 leading-relaxed">
              Indo Moris Holidays began in 2008, when Sandeep Bhat set out to
              change how visitors experienced India. He had spent years
              watching travellers arrive uncertain and overwhelmed, unsure
              who to trust with their itinerary, their transport, or their
              time. He believed a trip to India could feel personal instead
              of transactional, and started building the kind of agency he
              wished existed: one that treated every guest like family from
              the moment they landed.
            </p>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              What began as a one-man operation, personally meeting guests at
              the airport and planning routes late into the night, has grown
              into a trusted name for inbound tours across the Golden
              Triangle, Kerala, Rajasthan, Kashmir, and beyond. The company
              has grown; the way Sandeep runs it hasn&apos;t. He still
              reviews itineraries himself, still keeps in touch with drivers
              and guides on the ground, and still believes the small
              details, a comfortable car, a well-chosen hotel, a guide who
              actually knows the history, are what turn a holiday into a
              memory.
            </p>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              Nearly two decades and thousands of journeys later, that same
              philosophy guides every trip Indo Moris plans: show up, follow
              through, and treat every traveller&apos;s trip like it&apos;s
              the only one that matters.
            </p>

            <blockquote className="mt-6 border-l-2 border-neutral-900 pl-5 font-serif text-lg italic text-neutral-800">
              &quot;Guest experience is our highest priority, it&apos;s what
              turns a first-time visitor into someone who calls India home
              away from home.&quot;
              <footer className="mt-2 font-sans not-italic text-xs uppercase tracking-[0.1em] text-neutral-500">
                — Sandeep Bhat, Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ---------- Stats strip ---------- */}
      <section className="bg-neutral-900" data-nav-theme="dark">
        <StatsStrip/>
      </section>
      

      {/* ---------- Values ---------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-lg text-center">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-px w-7 bg-neutral-400" />
              What we stand for
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
              The principles behind every itinerary
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 font-serif text-neutral-900">
                1
              </div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900">
                Personal, not packaged
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Every trip is planned around the traveller, not pulled from a
                template. Sandeep and the team get to know your pace before
                they get to work on your route.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 font-serif text-neutral-900">
                2
              </div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900">
                On the ground, always
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                From airport pickup to the last farewell, a real point of
                contact is reachable throughout the trip, not just at the
                time of booking.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 font-serif text-neutral-900">
                3
              </div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900">
                Trusted partners only
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Hotels, drivers, and guides are chosen the same way
                we&apos;d choose them for our own family, and reviewed after
                every single trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-neutral-900 px-6 py-16 text-center" data-nav-theme="dark">
        <div className="mx-auto max-w-lg">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
            Plan your own Indo Moris story
          </h2>
          <p className="mt-3 text-neutral-400">
            Tell us where you&apos;d like to go, and we&apos;ll take care of
            the rest, the way we have for thousands of travellers since 2008.
          </p>
          <a
            href="/#book"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start Planning
          </a>
        </div>
      </section>
    </main>
  );
}