import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";
import Navbar from "./routes/_index/components/nav-bar";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "/indo_moris_logo.png?v=2", sizes: "192x192", type: "image/png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Indo Moris Holidays",
            "url": "https://indomorisholidays.com",
            "logo": "https://indomorisholidays.com/indo_moris_logo.png"
          })
        }}/>

        {/* SEO & Meta */}
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Indo Moris Holidays"/>
        <meta property="og:description" content="Discover the world with Indo Moris Holidays – Tailor-made tours and unforgettable experiences."/>
        <meta property="og:url" content="https://indomorisholidays.com"/>
        <meta property="og:image" content="https://indomorisholidays.com/indo_moris_logo.png"/>
        <meta name="twitter:image" content="https://indomorisholidays.com/indo_moris_logo.png"/>

        {/* Remix and additional tags */}
        <Meta/>
        <link rel="icon" href="/favicon.ico?v=2"/>
        <Links/>

        {/* Page title (change or set dynamically) */}
        <title>Indo Moris Holidays</title>
      </head>
      <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
  );
}

export default function App() {
  return <Outlet />;
}
