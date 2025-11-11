export type OrderParams = { symbol:string; lot:number; sl:number; tp:number };
export const buildLink = (platform:'mt4'|'mt5', p:OrderParams) =>
  `${platform}://trade?symbol=${encodeURIComponent(p.symbol)}&lot=${p.lot}&sl=${p.sl}&tp=${p.tp}`;
