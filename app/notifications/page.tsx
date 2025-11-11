import BottomNav from "@/components/BottomNav"; import { Card } from "@/components/ui";
const groups = [
  {label:'Trade', items:[{t:'Trade Executed', b:'EUR/USD BUY filled at 1.0845', read:false},{t:'SL/TP Update', b:'XAUUSD TP moved to 2368', read:true}]},
  {label:'Market', items:[{t:'Price Alert', b:'USD/JPY hit 150.00', read:false}]},
  {label:'Promotion', items:[{t:'Contest', b:'New contest starts tomorrow', read:true}]}
];
export default function Page(){ return (<>
  <div className="h-10 flex items-center border-b border-slate-800 text-emerald-300 font-semibold">Notifications</div>
  {groups.map(g=> (
    <div key={g.label} className="mt-2">
      <div className="text-[12px] uppercase opacity-60 px-1">{g.label}</div>
      {g.items.map((n,i)=> (<Card key={i} className={n.read? 'opacity-70':''}><div className="font-semibold">{n.t}</div><div className="text-[12px] opacity-80">{n.b}</div></Card>))}
    </div>
  ))}
  <BottomNav/>
</>);}
