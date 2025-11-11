import BottomNav from "@/components/BottomNav";
import { Card, Primary, Secondary, Section } from "@/components/ui";
import Link from "next/link";

const quickStats = [
  { label: "Balance", value: "$12,450.00" },
  { label: "Equity", value: "$12,680.50" },
  { label: "Free Margin", value: "$8,320.10" },
  { label: "Open P/L", value: "+$132.80" },
];

const shortcuts = [
  { href: "/trade", label: "Trade" },
  { href: "/orders", label: "Orders" },
  { href: "/notifications", label: "Alerts" },
  { href: "/missions", label: "Missions" },
];

export default function Page() {
  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Dashboard
      </div>

      <Section title="Quick Snapshot" right="Updated just now">
        <div className="grid grid-cols-2 gap-3 text-[13px]">
          {quickStats.map((item) => (
            <div key={item.label} className="border border-line rounded-lg p-3">
              <div className="opacity-70">{item.label}</div>
              <div className="text-[15px] font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Today's Focus">
        <div className="text-[12px] opacity-80">
          Review EUR/USD playbook and complete 1 lesson to keep your streak.
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Primary>Resume lesson</Primary>
          <Secondary>View watchlist</Secondary>
        </div>
      </Section>

      <Card>
        <div className="text-[13px] font-semibold mb-2">Shortcuts</div>
        <div className="grid grid-cols-2 gap-2">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 text-center rounded-lg border border-line text-[13px] opacity-80 hover:border-jade/70 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Card>

      <BottomNav />
    </>
  );
}
