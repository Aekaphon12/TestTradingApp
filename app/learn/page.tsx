'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Section, Primary, Secondary, Card } from "@/components/ui";
import ModalSheet from "@/components/ModalSheet";

const categories = ["Beginner", "Pro", "Macro", "Crypto"];
const journeys = [
  { title: "Technical Analysis Basics", meta: "Lesson 3 • Candles & Momentum", progress: 65, action: "Resume" },
  { title: "Smart Risk Playbook", meta: "Lesson 1 • Exposure planning", progress: 20, action: "Start" },
];

const boosters = [
  { title: "Beginner Path", desc: "Candlestick • Support/Resistance • Risk 101", action: "Open path" },
  { title: "Pro Edge", desc: "Market structure • Liquidity traps", action: "Preview" },
];

const quizzes = [
  { title: "Price Action Quiz", meta: "10 questions • 8 min", reward: "+80 pts" },
  { title: "Risk Control Challenge", meta: "12 questions • 10 min", reward: "+120 pts" },
];

const timeline = [
  { title: "Watched “Momentum Burst”", time: "2 ชม. ที่แล้ว" },
  { title: "ทำแบบฝึกหัด Fibonacci", time: "เมื่อคืน" },
  { title: "ปลดล็อก Beginner badge", time: "เมื่อวาน" },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Learn
      </div>

      <Card className="bg-gradient-to-r from-emerald-900/30 via-slate-900 to-slate-900">
        <div className="text-[12px] uppercase text-emerald-300">Learning streak</div>
        <div className="text-2xl font-semibold">4 วันต่อเนื่อง</div>
        <div className="text-[12px] opacity-70">รักษาอีก 3 วัน รับโบนัส 200 pts</div>
        <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full" style={{ width: "60%" }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Primary onClick={() => openModal("Resume streak", "กำลังเปิดบทเรียนล่าสุด Technical Analysis Basics — Lesson 3")}>
            Resume lesson
          </Primary>
          <Secondary onClick={() => openModal("กำหนดเตือน", "เราจะเตือนคุณทุกเที่ยงวันเพื่อเรียน 15 นาที")}>Set reminder</Secondary>
        </div>
      </Card>

      <div className="flex gap-2 overflow-x-auto py-3 mx-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-[12px] border ${
              selectedCategory === cat ? "border-emerald-400 text-emerald-300" : "border-slate-700 text-slate-400"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <Section title="Continue Learning" right={`โฟกัส: ${selectedCategory}`}>
        <div className="space-y-3">
          {journeys.map((journey) => (
            <Card
              key={journey.title}
              className="bg-slate-900/40 border-line"
              onClick={() => openModal(journey.title, journey.meta)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold">{journey.title}</div>
                  <div className="text-[12px] opacity-70">{journey.meta}</div>
                </div>
                <span className="text-[11px] text-emerald-300">{journey.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${journey.progress}%` }} />
              </div>
              <Primary onClick={(e) => { e.stopPropagation(); openModal(journey.action, `เริ่ม ${journey.title}`); }}>
                {journey.action}
              </Primary>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Skill boosters">
        <div className="grid gap-3">
          {boosters.map((item) => (
            <button
              key={item.title}
              className="border border-line rounded-2xl p-3 text-left bg-slate-900/30 hover:border-emerald-500/40 transition"
              onClick={() => openModal(item.title, item.desc)}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-[12px] opacity-70">{item.desc}</div>
              <div className="text-[11px] text-emerald-300 mt-1">{item.action}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Quizzes & Certificates" right="+200 pts bonus">
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.title} className="bg-slate-900/40 border border-slate-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[13px]">{quiz.title}</div>
                  <div className="text-[12px] opacity-70">{quiz.meta}</div>
                </div>
                <span className="text-[12px] text-emerald-300">{quiz.reward}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <Primary onClick={() => openModal("เริ่ม Quiz", `เตรียมเริ่ม ${quiz.title}`)}>Start</Primary>
                <Secondary onClick={() => openModal("อ่านสรุป", `ดาวน์โหลด cheat sheet สำหรับ ${quiz.title}`)}>Cheat sheet</Secondary>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Learning log">
        {timeline.map((item) => (
          <Card key={item.title} className="bg-slate-900/30 border border-slate-800/80 mb-3" onClick={() => openModal(item.title, item.time)}>
            <div className="text-[13px] font-semibold">{item.title}</div>
            <div className="text-[12px] opacity-70">{item.time}</div>
          </Card>
        ))}
      </Section>

      <BottomNav />

      <ModalSheet open={!!modal} title={modal?.title ?? ""} body={modal?.body} onClose={closeModal} />
    </>
  );
}
