'use client';

import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Section, Card, Primary, Secondary } from "@/components/ui";
import ModalSheet from "@/components/ModalSheet";
import MiniChart from "@/components/MiniChart";
import { buildLink } from "@/components/deeplink";

const instruments = {
  EURUSD: {
    name: "Euro / US Dollar",
    price: 1.0834,
    lot: 0.1,
    sl: 1.0785,
    tp: 1.0885,
    lotStep: 0.05,
    levelStep: 0.0005,
    series: [1.08, 1.082, 1.081, 1.085, 1.083, 1.086],
  },
  XAUUSD: {
    name: "Gold Spot",
    price: 2347,
    lot: 0.2,
    sl: 2330,
    tp: 2368,
    lotStep: 0.1,
    levelStep: 1,
    series: [2332, 2338, 2335, 2345, 2341, 2347],
  },
  BTCUSD: {
    name: "Bitcoin CFD",
    price: 63200,
    lot: 0.05,
    sl: 61800,
    tp: 65500,
    lotStep: 0.01,
    levelStep: 200,
    series: [62000, 62500, 63000, 62700, 63500, 63200],
  },
};

const quickPlays = [
  { label: "Set alert", desc: "แจ้งเมื่อทะลุแนวต้าน", action: "ตั้งแจ้งเตือน" },
  { label: "Share idea", desc: "ส่งเซตอัปให้เพื่อน", action: "สร้างภาพ" },
  { label: "Risk check", desc: "ตรวจสอบการใช้งานมาร์จิน", action: "ดู report" },
];

const tickets = [
  { title: "BUY limit 1.0790", status: "waiting" },
  { title: "SELL stop 1.0720", status: "armed" },
];

export default function Page() {
  const [symbol, setSymbol] = useState<keyof typeof instruments>("EURUSD");
  const [trade, setTrade] = useState(() => ({ ...instruments["EURUSD"] }));
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const link = useMemo(
    () => buildLink("mt5", { symbol, lot: trade.lot, sl: trade.sl, tp: trade.tp }),
    [symbol, trade.lot, trade.sl, trade.tp]
  );

  const handleSelectSymbol = (nextSymbol: keyof typeof instruments) => {
    setSymbol(nextSymbol);
    setTrade({ ...instruments[nextSymbol] });
  };

  const adjustField = (field: "lot" | "sl" | "tp", delta: number) => {
    setTrade((prev) => {
      const step = field === "lot" ? prev.lotStep : prev.levelStep;
      const nextValue = parseFloat((prev[field] + step * delta).toFixed(field === "lot" ? 2 : 4));
      return { ...prev, [field]: nextValue };
    });
  };

  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  const handleOrder = (side: "BUY" | "SELL") => {
    openModal(
      `${side} ${symbol}`,
      `Lot ${trade.lot} • SL ${trade.sl} • TP ${trade.tp}\nลิงก์ MT5:\n${link}`
    );
  };

  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Trade
      </div>

      <Card className="bg-slate-900/40">
        <div className="flex justify-between text-sm opacity-80">
          <span>Balance</span>
          <span>Equity</span>
        </div>
        <div className="flex justify-between text-jade text-lg font-bold">
          <span>$12,450.00</span>
          <span>$12,680.50</span>
        </div>
        <div className="text-[12px] opacity-70">Free margin $8,320 • Margin level 156%</div>
      </Card>

      <div className="flex gap-2 overflow-x-auto py-3 mx-1">
        {Object.keys(instruments).map((sym) => (
          <button
            key={sym}
            className={`px-4 py-1.5 rounded-full text-[12px] border ${
              symbol === sym ? "border-emerald-400 text-emerald-300" : "border-slate-700 text-slate-400"
            }`}
            onClick={() => handleSelectSymbol(sym as keyof typeof instruments)}
          >
            {sym}
          </button>
        ))}
      </div>

      <Section title={`${symbol} setup`} right={trade.name}>
        <MiniChart series={trade.series} />
        <div className="grid grid-cols-3 gap-3 mt-3">
          {(["lot", "sl", "tp"] as const).map((field) => (
            <div key={field} className="border border-line rounded-xl p-2 text-center bg-slate-900/40">
              <div className="text-[11px] uppercase opacity-60">{field.toUpperCase()}</div>
              <div className="text-[14px] font-semibold">{trade[field]}</div>
              <div className="flex justify-between mt-1">
                <button className="w-6 h-6 rounded-full border border-line" onClick={() => adjustField(field, -1)}>
                  -
                </button>
                <button className="w-6 h-6 rounded-full border border-line" onClick={() => adjustField(field, 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-2 gap-3 my-3">
        <button className="py-3 rounded-xl bg-jade text-black font-bold" onClick={() => handleOrder("BUY")}>
          Buy
        </button>
        <button className="py-3 rounded-xl bg-red-500 text-white font-bold" onClick={() => handleOrder("SELL")}>
          Sell
        </button>
      </div>

      <Primary onClick={() => openModal("Open in MT5", link)}>Open in MT5</Primary>
      <Card className="text-[12px] break-all" onClick={() => openModal("Link copied", link)}>
        {link}
      </Card>

      <Section title="Automation tickets" right="2 pending">
        {tickets.map((ticket) => (
          <Card key={ticket.title} className="bg-slate-900/40 border border-slate-800/80 mb-2" onClick={() => openModal(ticket.title, ticket.status)}>
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold">{ticket.title}</div>
              <span className="text-[11px] text-emerald-300">{ticket.status}</span>
            </div>
          </Card>
        ))}
        <Secondary onClick={() => openModal("สร้างคำสั่ง", "จะเปิดหน้าตั้ง automation")}>New ticket</Secondary>
      </Section>

      <Section title="Quick plays">
        <div className="grid gap-3">
          {quickPlays.map((item) => (
            <button
              key={item.label}
              className="flex items-center justify-between border border-line rounded-2xl p-3 bg-slate-900/30 text-left"
              onClick={() => openModal(item.label, item.desc)}
            >
              <div>
                <div className="font-semibold text-[13px]">{item.label}</div>
                <div className="text-[12px] opacity-70">{item.desc}</div>
              </div>
              <span className="text-[11px] text-emerald-300">{item.action}</span>
            </button>
          ))}
        </div>
      </Section>

      <BottomNav />

      <ModalSheet open={!!modal} title={modal?.title ?? ""} body={modal?.body} onClose={closeModal} />
    </>
  );
}
