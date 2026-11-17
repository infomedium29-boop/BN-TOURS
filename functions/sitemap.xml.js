// Cloudflare Pages Function: automatski sitemap za aktivnu domenu.
export function onRequest({ request }) {
  const origin = new URL(request.url).origin;
  const paths = ['/', '/skolska-putovanja/', '/grupna-putovanja/', '/izleti/', '/o-nama/', '/zatrazi-ponudu/', '/kontakt/', '/privatnost/', '/kolacici/', '/uvjeti-koristenja/', '/izvori-fotografija/'];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    paths.map(path => '<url><loc>' + origin + path + '</loc></url>').join('') +
    '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
