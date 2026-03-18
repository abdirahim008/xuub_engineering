import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xuubengineering.com"),
  title: {
    default:
      "XUUB Engineering Limited | Civil Engineering Consultancy in Somalia & Kenya",
    template: "%s | XUUB Engineering Limited",
  },
  description:
    "XUUB Engineering Limited is a leading multi-disciplinary civil engineering consultancy in Somalia and Kenya. We specialise in road design, water supply, drainage, irrigation, structural engineering, and feasibility studies across the Horn of Africa. Registered in Mogadishu, Kismayo, and Nairobi with World Bank and UNOPS project experience.",
  keywords: [
    "civil engineering consultancy Somalia",
    "engineering consultancy Mogadishu",
    "road design consultancy Somalia",
    "road design consultancy Kenya",
    "infrastructure consultancy Horn of Africa",
    "XUUB Engineering",
    "XUUB Engineering Limited",
    "feasibility study Somalia",
    "detailed engineering design Somalia",
    "water supply design Somalia",
    "drainage design Somalia",
    "irrigation engineering Somalia",
    "structural engineering Somalia",
    "bridge design Somalia",
    "geotechnical investigation Somalia",
    "environmental impact assessment Somalia",
    "road safety audit Somalia",
    "quantity surveying Somalia",
    "construction supervision Somalia",
    "World Bank project consultant Somalia",
    "UNOPS consultant Somalia",
    "engineering firm Mogadishu",
    "engineering firm Kismayo",
    "engineering company Nairobi Somalia",
    "civil engineering Kenya",
    "transport engineering Somalia",
    "hydrological study Somalia",
    "ESIA consultant Somalia",
    "resettlement action plan Somalia",
    "engineering consultancy Jubaland",
    "engineering consultancy Southwest State Somalia",
    "engineering consultancy Hirshabelle",
    "cross-border road design Ethiopia Somalia",
    "SHIIP Somalia infrastructure",
    "engineering consultant East Africa",
    "road feasibility study Horn of Africa",
  ],
  authors: [{ name: "XUUB Engineering Limited" }],
  creator: "XUUB Engineering Limited",
  publisher: "XUUB Engineering Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.xuubengineering.com",
    siteName: "XUUB Engineering Limited",
    title:
      "XUUB Engineering Limited | Civil Engineering Consultancy in Somalia & Kenya",
    description:
      "Multi-disciplinary civil engineering consultancy specialising in road design, water infrastructure, structural engineering, drainage, and irrigation across the Horn of Africa. Offices in Mogadishu, Kismayo, and Nairobi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "XUUB Engineering Limited - Civil Engineering Consultancy Somalia Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "XUUB Engineering Limited | Civil Engineering Consultancy Somalia & Kenya",
    description:
      "Leading civil engineering consultancy in Somalia & Kenya. Road design, water supply, drainage, irrigation, structural engineering. Offices in Mogadishu, Kismayo, Nairobi.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.xuubengineering.com",
    languages: {
      "en-US": "https://www.xuubengineering.com",
      "so-SO": "https://www.xuubengineering.com/so",
    },
  },
  category: "Engineering",
  other: {
    "geo.region": "SO",
    "geo.placename": "Mogadishu",
    "geo.position": "2.0469;45.3182",
    ICBM: "2.0469, 45.3182",
    "business:contact_data:street_address": "Hodan District",
    "business:contact_data:locality": "Mogadishu",
    "business:contact_data:country_name": "Somalia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
