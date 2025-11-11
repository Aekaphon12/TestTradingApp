import BottomNav from "@/components/BottomNav"; import { Section, Primary, Secondary } from "@/components/ui";
export default function Page(){ return (<>
  <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">Missions & Rewards</div>
  <Section title="Daily Missions" right="Streak: 3 days">
    <div className="grid gap-2 text-[13px]">
      <div className="flex items-center justify-between"><span>• Complete 1 lesson</span><button className="px-3 py-1 rounded-md bg-jade text-black text-[12px]">Claim 50 pts</button></div>
      <div className="flex items-center justify-between"><span>• Review watchlist</span><button className="px-3 py-1 rounded-md border border-line text-[12px]">Mark done</button></div>
      <div className="flex items-center justify-between"><span>• Set 1 price alert</span><button className="px-3 py-1 rounded-md border border-line text-[12px]">Mark done</button></div>
    </div>
  </Section>
  <Section title="Weekly Bonus" right="+500 pts">
    <div className="text-[12px] opacity-80">Finish 5 lessons + 3 quizzes</div>
    <div className="grid grid-cols-2 gap-2 mt-2"><Primary>Start plan</Primary><Secondary>View rules</Secondary></div>
  </Section>
  <Section title="Points Balance" right="1,250 pts"><div className="text-[12px] opacity-80">Redeem in Points Mall</div></Section>
  <BottomNav/>
</>);}
