export default function MiniChart({series}:{series:number[]}){
  const w=280,h=64,pad=6; const min=Math.min(...series), max=Math.max(...series);
  const norm=(v:number)=> h-((v-min)/(max-min||1))*(h-pad*2)-pad;
  const pts=series.map((v,i)=>`${(i*(w-pad*2)/(series.length-1))+pad},${norm(v)}`).join(' ');
  const up = series[series.length-1]-series[0] >= 0;
  return (<svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}><polyline points={pts} fill="none" stroke={up?'#2DC29D':'#ef4444'} strokeWidth="2"/></svg>);
}
