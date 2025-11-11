'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Section, Primary, Secondary, Card } from "@/components/ui";
import ModalSheet from "@/components/ModalSheet";
import { Sparkles, PlayCircle, Radio, Podcast } from "lucide-react";

const promotionTiles = [
  { label: "Trading Contest", sub: "Up to $100,000 prize pool", badge: "5 days left" },
  { label: "Swap-Free Week", sub: "Zero overnight fees on majors", badge: "New" },
];

const educationTracks = [
  { label: "Technical Analysis Basics", meta: "6 lessons • 45 min", cta: "Continue" },
  { label: "Risk Management 101", meta: "4 lessons • 30 min", cta: "Start" },
];

const pointsItems = [
  { label: "Trading Signals", value: "500 pts" },
  { label: "Market Analysis", value: "300 pts" },
  { label: "VIP Support", value: "800 pts" },
  { label: "Copy Masterclass", value: "1,200 pts" },
];

const streams = [
  { title: "Live London Session", host: "Desk team", starts: "เริ่มใน 15 นาที" },
  { title: "Macro Pulse", host: "Weekly radio", starts: "19:30 วันนี้" },
];

const tabs = ["Research", "Signals", "Podcast"];

export default function Page() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Discover
      </div>

      <Card className="bg-gradient-to-r from-emerald-900/40 via-teal-800/30 to-slate-900/40 border-emerald-700/40">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-400/20 p-2">
            <Sparkles className="text-emerald-300" size={18} />
          </div>
          <div className="flex-1">
            <div className="text-[12px] uppercase tracking-wide opacity-70">Spotlight</div>
            <div className="text-[15px] font-semibold">Welcome to FISG Trading</div>
            <div className="text-[12px] opacity-70">Advanced tools curated for professional traders.</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Primary onClick={() => openModal("Live tour", "กำลังเปิดวิดีโอแนะนำฟีเจอร์หลักของ FISG")}>Watch tour</Primary>
          <Secondary onClick={() => openModal("Book onboarding", "ทีม Customer Success จะนัดเวลาคุยกับคุณ")}>Book onboarding</Secondary>
        </div>
      </Card>

      <Section title="Current Promotions">
        <div className="space-y-3 text-[12px]">
          {promotionTiles.map((promo) => (
            <button
              key={promo.label}
              className="w-full border border-line rounded-xl p-3 bg-slate-900/40 flex items-center justify-between gap-3 text-left"
              onClick={() => openModal(promo.label, promo.sub)}
            >
              <div>
                <div className="font-semibold text-[13px]">{promo.label}</div>
                <div className="opacity-70">{promo.sub}</div>
              </div>
              <span className="text-[11px] text-emerald-300 px-2 py-1 rounded-md border border-emerald-500/40">
                {promo.badge}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <div className="flex gap-3 border-b border-slate-800/70 mx-1 py-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-semibold ${
              activeTab === tab ? "text-emerald-300 border-b-2 border-emerald-400" : "text-slate-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Section title={`${activeTab} stream`} right="แจ้งเตือน">
        {streams.map((stream) => (
          <Card key={stream.title} className="flex items-center gap-3 bg-slate-900/40 border-line" onClick={() => openModal(stream.title, stream.starts)}>
            <div className="rounded-2xl bg-emerald-400/15 p-3">
              {activeTab === "Podcast" ? <Podcast className="text-emerald-300" size={20} /> : <Radio className="text-emerald-300" size={20} />}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold">{stream.title}</div>
              <div className="text-[12px] opacity-70">{stream.host}</div>
            </div>
            <div className="text-[11px] text-emerald-300">{stream.starts}</div>
          </Card>
        ))}
        <Primary onClick={() => openModal("Subscribe", `ติดตาม ${activeTab} feed`)}>Subscribe</Primary>
      </Section>

      <Section title="Education Hub" right="View all">
        <div className="space-y-3">
          {educationTracks.map((track) => (
            <Card key={track.label} className="bg-slate-900/40 border-line" onClick={() => openModal(track.label, track.meta)}>
              <div className="text-[13px] font-semibold">{track.label}</div>
              <div className="text-[12px] opacity-70 mb-3">{track.meta}</div>
              <Primary onClick={(e) => { e.stopPropagation(); openModal(track.cta, `เปิด ${track.label}`); }}>
                {track.cta}
              </Primary>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Points Mall" right="2,450 pts">
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          {pointsItems.map((item) => (
            <button
              key={item.label}
              className="border border-line rounded-lg p-3 bg-slate-900/40 text-left"
              onClick={() => openModal(item.label, `ต้องใช้ ${item.value}`)}
            >
              <div>{item.label}</div>
              <div className="text-[11px] text-emerald-300">{item.value}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Primary onClick={() => openModal("Redeem", "เลือกของรางวัลจาก Mall")} >Redeem</Primary>
          <Secondary onClick={() => openModal("View history", "แสดงรายการแลกล่าสุด")}>View history</Secondary>
        </div>
      </Section>

      <Section title="On-demand clips">
        <div className="grid gap-3">
          {["Asia open playbook", "US CPI prep", "Prop desk recap"].map((clip) => (
            <button
              key={clip}
              className="flex items-center gap-3 border border-line rounded-2xl p-3 bg-slate-900/30 text-left"
              onClick={() => openModal(clip, "เปิดวิดีโอทันที")}
            >
              <PlayCircle className="text-emerald-300" size={20} />
              <div>
                <div className="font-semibold text-[13px]">{clip}</div>
                <div className="text-[12px] opacity-70">5 นาที highlight</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <BottomNav />

      <ModalSheet open={!!modal} title={modal?.title ?? ""} body={modal?.body} onClose={closeModal} />
    </>
  );
}
