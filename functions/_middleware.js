// Complete hreflang/canonical URLs using the domain that serves the request.
// No domain value needs to be hard-coded during development or Cloudflare preview.
export async function onRequest(context) {
  const response = await context.next();
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html') || response.status !== 200) return response;
  const address = new URL(context.request.url);
  const canonical = address.origin + address.pathname;
  const escapeAttr = text => text.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  return new HTMLRewriter()
    .on('link[rel="alternate"][hreflang]', {
      element(element) {
        const href = element.getAttribute('href');
        if (href && href.startsWith('/')) element.setAttribute('href', address.origin + href);
      }
    })
    .on('head', {
      element(element) {
        element.append(`<link rel="canonical" href="${escapeAttr(canonical)}">`,{html:true});
      }
    })
    .transform(response);
}
