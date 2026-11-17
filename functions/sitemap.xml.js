// Cloudflare Pages Function – absolute URLs for the deployed domain.
const hr = ['/', '/skolska-putovanja/', '/grupna-putovanja/', '/izleti/', '/o-nama/', '/kontakt/', '/zatrazi-ponudu/', '/privatnost/', '/kolacici/', '/uvjeti-koristenja/', '/izvori-fotografija/'];
const en = ['/en/', '/en/school-trips/', '/en/group-travel/', '/en/trips/', '/en/about-us/', '/en/contact/', '/en/request-quote/', '/en/privacy-policy/', '/en/cookies/', '/en/terms/', '/en/photo-credits/'];
const de = ['/de/', '/de/schulreisen/', '/de/gruppenreisen/', '/de/ausfluege/', '/de/ueber-uns/', '/de/kontakt/', '/de/anfrage/', '/de/datenschutz/', '/de/cookies/', '/de/nutzungsbedingungen/', '/de/bildnachweise/'];
const tripIds = ['brijuni-pula','plitvicka-jezera','sibenik-krka','zadar-nin','rovinj-porec','dubrovnik','zagreb','trakoscan-varazdin','osijek-baranja','opatija-rijeka'];
tripIds.forEach(id => {hr.push('/izleti/'+id+'/');en.push('/en/trips/'+id+'/');de.push('/de/ausfluege/'+id+'/');});
function escapeXml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
export async function onRequestGet({request}){
 const origin = new URL(request.url).origin;
 const rows = hr.map((path,i)=> [path,en[i],de[i]]);
 const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + rows.map(paths=>paths.map(url=>{
  const links=paths.map((href,j)=>`<xhtml:link rel="alternate" hreflang="${['hr','en','de'][j]}" href="${escapeXml(origin+href)}"/>`).join('');
  return `<url><loc>${escapeXml(origin+url)}</loc>${links}</url>`;
 }).join('\n')).join('\n') + '\n</urlset>';
 return new Response(xml,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600'}});
}
