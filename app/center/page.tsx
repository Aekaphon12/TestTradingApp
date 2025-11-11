'use client';

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Card, Primary, Secondary, Section } from "@/components/ui";
import ModalSheet from "@/components/ModalSheet";
import { BellRing, Award, Wallet, ShieldCheck, Layers3 } from "lucide-react";

const tabs = ["Overview", "Badges", "Activity", "Settings"];
const quickLinks = [
  { title: "Funds", desc: "Deposits & Withdrawals", icon: Wallet },
  { title: "Trading Accounts", desc: "Manage Real/Demo/Copy", icon: Layers3 },
  { title: "Security", desc: "2FA • Login alerts", icon: ShieldCheck },
];
const activity = [
  { title: "Earned +50 pts (Daily mission)", time: "2 ชม. ที่แล้ว" },
  { title: "Reviewed watchlist", time: "5 ชม. ที่แล้ว" },
  { title: "อัปเดตเอกสาร KYC", time: "เมื่อวาน" },
];
const tabMessages: Record<string, { title: string; body: string }> = {
  Overview: {
    title: "ภาพรวมบัญชี",
    body: "ตรวจดูสถานะล่าสุด คะแนน และสตรีคที่ดำเนินอยู่ทั้งหมดได้จากแท็บนี้",
  },
  Badges: {
    title: "ป้ายสะสม",
    body: "ปลดล็อกแบดจ์โดยทำภารกิจและเรียนรู้บทเรียนต่าง ๆ ให้ครบ",
  },
  Activity: {
    title: "กิจกรรมล่าสุด",
    body: "บันทึกทุกการเคลื่อนไหว — ตั้งแต่การเรียน ไปจนถึงการฝากถอน",
  },
  Settings: {
    title: "ตั้งค่าความปลอดภัย",
    body: "จัดการข้อมูลส่วนตัว การแจ้งเตือน และการยืนยันตัวตนได้จากที่นี่",
  },
};

export default function Page() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const openModal = (title: string, body: string) => setModal({ title, body });
  const closeModal = () => setModal(null);

  return (
    <>
      <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">
        Center
      </div>

      <Card className="bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-emerald-700/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,194,157,0.25),_transparent_45%)] pointer-events-none" />
        <div className="relative flex justify-between">
          <div>
            <div className="text-sm text-emerald-300 uppercase">FISG ID</div>
            <div className="text-2xl font-semibold">John Doe</div>
            <div className="text-sm opacity-75">Premium Tier • KYC verified</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-full bg-emerald-400 text-black w-12 h-12 flex items-center justify-center font-semibold">
              JD
            </div>
            <button
              className="flex items-center gap-1 text-[12px] text-emerald-200"
              onClick={() => openModal("แจ้งเตือนใหม่", "คุณมี 3 การแจ้งเตือนที่ยังไม่ได้อ่าน")}
            >
              <BellRing size={14} /> 3 แจ้งเตือน
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <button
            className="rounded-xl bg-slate-900/60 py-2"
            onClick={() => openModal("แต้มสะสม", "คุณมี 1,250 คะแนน สามารถแลกรางวัลใน Points Mall ได้เลย")}
          >
            <div className="text-xs uppercase opacity-70">Points</div>
            <div className="text-lg font-semibold">1,250</div>
          </button>
          <button
            className="rounded-xl bg-slate-900/60 py-2"
            onClick={() => openModal("ระดับสมาชิก", "คุณอยู่ในระดับ Silver เหลืออีก 250 คะแนนเพื่อเลื่อนเป็น Gold")}
          >
            <div className="text-xs uppercase opacity-70">Tier</div>
            <div className="text-lg font-semibold text-emerald-300">Silver</div>
          </button>
          <button
            className="rounded-xl bg-slate-900/60 py-2"
            onClick={() => openModal("Streak", "รักษาสตรีค 4 วันติด — หากทำต่อเนื่องครบ 7 วันจะได้โบนัสพิเศษ")}
          >
            <div className="text-xs uppercase opacity-70">Streak</div>
            <div className="text-lg font-semibold">4🔥</div>
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Primary onClick={() => openModal("แก้ไขโปรไฟล์", "ฟอร์มแก้ไขโปรไฟล์จะเปิดในเวอร์ชันถัดไป")}>Edit Profile</Primary>
          <Secondary onClick={() => openModal("แชร์ลิงก์แนะนำเพื่อน", "คัดลอก referral link เพื่อเชิญเพื่อนได้เลย")}>
            Share referral
          </Secondary>
        </div>
      </Card>

      <div className="flex items-center gap-3 border-b border-slate-800/60 mx-1 mt-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 text-sm font-semibold transition ${
              activeTab === tab ? "text-emerald-300 border-b-2 border-emerald-400" : "text-slate-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="bg-slate-900/40 border border-emerald-500/10 mt-3">
        <div className="text-[12px] uppercase opacity-60 mb-1">{activeTab}</div>
        <div className="text-[15px] font-semibold">{tabMessages[activeTab].title}</div>
        <div className="text-[13px] opacity-70 mt-1">{tabMessages[activeTab].body}</div>
        <div className="mt-3 flex gap-2">
          <Primary onClick={() => openModal(activeTab, `เปิดหน้าต่าง ${activeTab} เต็มรูปแบบเร็วๆ นี้`)}>เปิด</Primary>
          <Secondary onClick={() => openModal("Pin to quick bar", `ตรึงแท็บ ${activeTab} ไว้บนหน้าจอหลัก`)}>Pin</Secondary>
        </div>
      </Card>

      <Section
        title="Quick Access"
        right={
          <button className="text-[12px] text-emerald-300" onClick={() => openModal("จัดการ Quick Access", "ตั้งค่าปุ่มลัดที่ต้องการได้ที่นี่")}>
            จัดการทั้งหมด
          </button>
        }
      >
        <div className="space-y-3 text-[13px]">
          {quickLinks.map(({ title, desc, icon: Icon }) => (
            <button
              key={title}
              className="w-full flex items-center justify-between border border-line rounded-2xl p-3 bg-slate-900/40 text-left"
              onClick={() => openModal(title, desc)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-400/15 text-emerald-300">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-[12px] opacity-70">{desc}</div>
                </div>
              </div>
              <span className="text-[11px] text-emerald-300">▸</span>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="Progress & Badges"
        right={
          <button className="text-[12px] text-emerald-300" onClick={() => openModal("Badges", "ดูก้าวหน้าของคุณและเงื่อนไขการปลดล็อกทั้งหมด")}>
            ดูทั้งหมด
          </button>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[12px] uppercase opacity-60">Weekly progress</div>
            <div className="text-sm font-semibold">70% complete</div>
            <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "70%" }} />
            </div>
            <button
              className="text-[11px] text-emerald-300 mt-2"
              onClick={() => openModal("แผนความก้าวหน้า", "คุณเหลืออีก 2 ภารกิจเพื่อรับโบนัสสัปดาห์นี้")}
            >
              ดูรายละเอียดแผน
            </button>
          </div>
          <button
            className="w-16 h-16 rounded-2xl border border-emerald-500/30 flex flex-col items-center justify-center"
            onClick={() => openModal("Badges Summary", "คุณสะสมแล้ว 5 ป้าย เก็บเพิ่มอีก 3 ป้ายเพื่อปลดล็อกชุด Iconic")}
          >
            <Award size={22} className="text-emerald-300" />
            <span className="text-[11px] mt-1">5 badges</span>
          </button>
        </div>
      </Section>

      <Section title="Activity">
        {activity.map((item) => (
          <Card
            key={item.title}
            className="bg-slate-900/40 border border-slate-800/80 mb-3"
            onClick={() => openModal(item.title, `รายละเอียดกิจกรรม: ${item.time}`)}
          >
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
