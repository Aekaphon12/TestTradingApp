import Image from "next/image";
import "./globals.css";
import Logo from "./images/[...slug]/Logo.png";

export const metadata = { title: "FISG Companion v2" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container pb-24">
          <header className="flex items-center gap-3 py-4">
            <Image
              src={Logo}
              alt="FISG logo"
              className="h-10 w-10 rounded-lg border border-line bg-card"
              priority
            />
            <div className="leading-tight">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-400">FISG</div>
              <div className="text-base font-semibold text-emerald-300">Companion</div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
