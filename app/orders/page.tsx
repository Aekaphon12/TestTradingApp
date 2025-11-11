'use client';

import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Card, Primary, Secondary, Section } from "@/components/ui";
import ModalSheet from "@/components/ModalSheet";

const filters = ["All", "Running", "Automation"];

const orders = [
  { symbol: "EURUSD", side: "BUY", lot: 0.1, pl: 113, status: "Running", entry: "1.0820", sl: "1.0780", tp: "1.0890" },
  { symbol: "GBPUSD", side: "SELL", lot: 0.05, pl: -21, status: "Running", entry: "1.2640", sl: "1.2690", tp: "1.2550" },
  { symbol: "XAUUSD", side: "BUY", lot: 0.2, pl: 88, status: "Automation", entry: "2341.00", sl: "2328.00", tp: "2367.00" },
];

const history = [
  { title: "Closed BUY USDJPY", time: "1 ชม. ที่แล้ว", pl: "+$64" },
  { title: "Triggered trailing stop BTCUSD", time: "เมื่อวาน", pl: "+$180" },
];

export default function Page() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") return orders;
    return orders.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Orders
      </div>

      <div className="flex gap-2 mx-1 py-3 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-1.5 rounded-full text-[12px] border ${
              activeFilter === filter ? "border-emerald-400 text-emerald-300" : "border-slate-700 text-slate-400"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <Section title="Open orders" right={`${filteredOrders.length} รายการ`}>
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card key={`${order.symbol}-${order.side}`} className="bg-slate-900/40 border border-slate-800/70">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{order.symbol}</div>
                  <div className="text-[12px] opacity-70">
                    {order.side} {order.lot} lot • entry {order.entry}
                  </div>
                </div>
                <div className={order.pl >= 0 ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                  {order.pl >= 0 ? "+" : "-"}${Math.abs(order.pl).toFixed(0)}
                </div>
              </div>
              <div className="flex justify-between text-[11px] opacity-70 mt-2">
                <span>SL {order.sl}</span>
                <span>TP {order.tp}</span>
                <span>{order.status}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Secondary onClick={() => openModal("Modify order", `${order.symbol} • ${order.side} ${order.lot} lot`)}>Modify</Secondary>
                <button
                  className="flex-1 py-3 rounded-lg bg-red-500 text-white"
                  onClick={() => openModal("Confirm close", `ปิด ${order.symbol} ตอนนี้เลยหรือไม่`)}
                >
                  Close
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Bulk actions">
        <div className="grid grid-cols-2 gap-2">
          <Primary onClick={() => openModal("Close all profits", "จะปิดออเดอร์ที่กำไรทั้งหมด")}>Close winners</Primary>
          <Secondary onClick={() => openModal("Hedge basket", "สร้าง order hedge ตามตะกร้าที่เลือก")}>Hedge</Secondary>
        </div>
        <button
          className="mt-2 w-full border border-line rounded-xl py-3 text-[13px]"
          onClick={() => openModal("Trailing stop", "ปรับ SL ของทั้งหมดให้ตามราคา")}
        >
          Trail stop all
        </button>
      </Section>

      <Section title="Recent executions">
        {history.map((item) => (
          <Card key={item.title} className="bg-slate-900/40 border border-slate-800/70 mb-2" onClick={() => openModal(item.title, item.time)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold">{item.title}</div>
                <div className="text-[12px] opacity-70">{item.time}</div>
              </div>
              <div className={item.pl.startsWith("+") ? "text-emerald-400" : "text-red-400"}>{item.pl}</div>
            </div>
          </Card>
        ))}
        <button className="text-[12px] text-emerald-300" onClick={() => openModal("ดูทั้งหมด", "เปิดประวัติคำสั่งทั้งหมด")}>
          View full log
        </button>
      </Section>

      <BottomNav />

      <ModalSheet open={!!modal} title={modal?.title ?? ""} body={modal?.body} onClose={closeModal} />
    </>
  );
}
