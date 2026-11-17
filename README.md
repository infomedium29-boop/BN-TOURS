# BN Tours · Travel catalogue V4

Professional multilingual static presentation of BN Tours, inspired by the usability of Global Travel's catalogue (not a copy of their assets or design).

## Deploy to GitHub / Cloudflare Pages
Upload the contents of **this folder** (not the enclosing folder) to the repository root. In Cloudflare Pages: framework `None`, build command left empty, output directory `.`. The `/en/` and `/de/` folders are direct static routes.

## Structure
- `/`, `/en/`, `/de/` – home page
- `/izleti/`, `/en/trips/`, `/de/ausfluege/` – searchable/filterable trip lists
- Ten trip detail URLs in each language, plus informational, enquiry, contact and legal pages
- `assets/css/v4.css` – site redesign layer
- `assets/icons/bn-logo.svg` – vector mark

## Important before presenting / launching
- **Images:** real destination photographs are hotlinked from Unsplash / Wikimedia Commons. They are **not included locally in the ZIP** because source-media download was not available in this environment. Confirm each image loads on your deployed site and obtain permission/appropriate credit before relying on these URLs in production. Source details listed on the photo-credits page. If an image fails, the site uses an unobtrusive plain-color fallback rather than claiming to display a photo. Replace with locally hosted authorized/optimized AVIF/WebP copies when available.
- **Trip pages:** destination *ideas*, not confirmed BN Tours departures, bookings, prices or itineraries. All trip arrangements need verification with the client.
- **Forms:** add the Web3Forms key in `assets/js/config.js` to enable auto-submission. Without it, the fallback opens the visitor's mail app; this is **not** a live booking engine.
- **Business/legal:** client should approve contact info, services, legal notices, agency licensing/contract terms before public production.
- Browser QA in a restricted offline renderer verified layout, navigation and filter logic but **could not verify the actual third-party image loads**.


## V6 – novi logo i intro
- Novi BN Tours logotip: `assets/icons/bn-wordmark-v6.png` i `bn-wordmark-light-v6.png`.
- Novi favicon: `assets/icons/favicon-v6.png`.
- Intro se prikazuje pri svakom svježem otvaranju ili osvježavanju početne stranice (HR, EN, DE). Na unutarnjim stranicama nema intruzivnog ponavljanja.
- Ispravljena kolizija CSS pravila zbog koje je logo u introu bio nevidljiv.
- Uvedeno vremenski ograničeno automatsko zatvaranje intro sloja, čak i ako JavaScript ne radi.


### Intro animacija
Intro se prikazuje samo pri prvom posjetu u otvorenoj sesiji preglednika. Navigacija između stranica, promjena jezika i osvježavanje ne pokreću intro ponovno. Za novu sesiju (novi privatni prozor ili zatvaranje kartice i ponovno otvaranje) animacija je ponovno dostupna.
