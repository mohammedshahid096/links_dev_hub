import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AiChatBubble } from "@/components/chat/AiChatBubble";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevHub — Your Ultimate Developer Watchlist",
    template: "%s | DevHub",
  },
  description:
    "Discover, save, and organise essential developer websites and top-tier GitHub repositories. Create your personalised developer toolkit and never lose an important dev link again.",
  keywords: ["developer tools", "dev watchlist", "github repos", "programming resources", "links hub"],
  authors: [{ name: "DevHub Team" }],
  creator: "DevHub",
  metadataBase: new URL("https://devhub.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devhub.app",
    siteName: "DevHub",
    title: "DevHub — Your Ultimate Developer Watchlist",
    description:
      "Discover, save, and organise essential developer websites and top GitHub repositories. Your personalised dev toolkit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHub — Your Ultimate Developer Watchlist",
    description:
      "Discover, save, and organise essential developer websites and top GitHub repositories.",
    creator: "@devhub",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          {/* <AiChatBubble /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
