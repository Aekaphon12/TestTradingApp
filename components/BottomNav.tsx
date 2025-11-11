"use client";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, Compass, Activity, ListOrdered, User } from "lucide-react";

const Tab = ({ href, label, icon, center=false }: any) => {
  const router = useRouter(); const pathname = usePathname();
  const active = pathname === href;
  return (
    <button onClick={()=>router.push(href)}
      className={`flex flex-col items-center min-w-16 text-[11px] ${center?'px-3 py-2 rounded-xl border border-jade/60':''} ${active? 'text-jade font-semibold':'text-slate-300'}`}>
      <span className="text-base">{icon}</span><span>{label}</span>
    </button>
  );
}

export default function BottomNav(){
  return (<div className="fixed inset-x-0 bottom-0 h-16 bg-[#0D1216] border-t border-[#1F2A32] flex justify-center">
    <div className="container flex items-center justify-between px-2">
      <Tab href="/learn" label="Learn" icon={<BookOpen size={16}/>}/>
      <Tab href="/discover" label="Discover" icon={<Compass size={16}/>}/>
      <Tab href="/trade" label="Trade" icon={<Activity size={16}/>} center/>
      <Tab href="/orders" label="Orders" icon={<ListOrdered size={16}/>}/>
      <Tab href="/center" label="Center" icon={<User size={16}/>}/>
    </div>
  </div>);
}
