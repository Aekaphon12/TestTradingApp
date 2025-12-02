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
        <div className="container px-6 pb-24">
          <header className="flex items-center gap-6 py-6">
            <Image
              src={Logo}
              alt="FISG logo"
              className="h-12 w-12 rounded-lg"
              priority
            />
            <div className="leading-tight space-y-1">
              <div className="text-[13px] uppercase tracking-[0.18em] text-slate-400">FISG</div>
              <div className="text-lg font-semibold text-emerald-300">Companion</div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
