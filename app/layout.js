import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:['latin']})

export const metadata = {
  title: "Finance Tracker",
  description: "Finance Tracker App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        {/* header */}
        <Header></Header>
        <main className="min-h-screen">{children}</main>
        {/* footer */}
        <footer className="bg-secondary-bg border-t">
          <div className="container mx-auto p-4 flex items-center justify-center text-center text-secondary-text px-5">
            <p>developed by SAM</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
