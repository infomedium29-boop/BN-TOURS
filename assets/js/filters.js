export function readParams(){return new URLSearchParams(window.location.search)}
export function updateParams(fields){const url=new URL(location.href);Object.entries(fields).forEach(([k,v])=>v?url.searchParams.set(k,v):url.searchParams.delete(k));history.replaceState({},'',url.pathname+url.search);}
export function applyOffers(offers,{q='',region='',duration='',type='',season=''}={}){
 const needle=q.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 return offers.filter(o=>{
  const hay=Object.values(o.name).join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  if(needle&&!hay.includes(needle))return false;
  if(region&&o.region!==region)return false;
  if(duration&&(duration==='one'?o.days!==1:o.days<2))return false;
  if(type&&!o.tags.includes(type))return false;
  if(season&&!o.seasons.includes(season))return false;
  return true;
 })}
