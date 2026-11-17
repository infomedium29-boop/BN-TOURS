# BN TOURS · Web stranica HR / EN / DE

Statički HTML/CSS/JavaScript projekt za GitHub i Cloudflare Pages, s 63 sadržajne HTML stranice + novi dizajn i katalog.

## Deploy

1. Sadržaj ove mape prenijeti u **root** GitHub repozitorija (ne prenositi mapu kao jedan poddirektorij).
2. Cloudflare Pages → Connect to Git → repo → **Framework preset: None**.
3. **Build command:** prazno; **Build output directory:** `.` (root). Functions direktorij mora ostati u rootu.
4. Nakon deploya otvoriti `https://IME-PROJEKTA.pages.dev/`, `/en/`, `/de/`, `/izleti/`.
5. Funkcija `functions/sitemap.xml.js` na `/sitemap.xml` izlistava 63 URL-a. `functions/_middleware.js` postavlja canonical i apsolutne hreflang veze za domenu koja se koristi.

## Obrazac za upit

`assets/js/config.js`:

```js
window.BN_CONFIG = {
  web3formsAccessKey: '', // upisati važeći Web3Forms ključ
  enquiryEmail: 'bntoursbn@hotmail.com'
};
```

Dok ključ nije dodan, obrazac **otvara mailto** s popunjenim podacima; to nije automatsko slanje. Nakon povezivanja provjeriti dostavu e-pošte i zaštitu od spama. Kontakt koji će primati upite te poslovne podatke mora potvrditi vlasnik.

Iz izleta se može otvoriti obrazac s unaprijed odabranim odredištem.

## Navigacija i jezici

- Glavni izbornik ima desktop dropdown (hover, fokus i klik na strelicu) te mobilni proširivi popis.
- Jezični prekidač HR / EN / DE zadržava **istu stranicu** na prijevodu, uključujući svih deset izleta.
- Intro na početnoj pojavljuje se samo jednom tijekom sesije i poštuje `prefers-reduced-motion`.

## Fotografije

Fotografije su **prave fotografije destinacija** s Wikimedia Commons, a učitavaju se putem vanjskih HTTPS URL-ova. **Nisu lokalno spremljene u ZIP-u**. Prikaz ovisi o dostupnosti Wikimedia poslužitelja i korisničkoj internetskoj vezi. Krediti su u podnožju, na stranici `Izvori fotografija` / `Photo credits` / `Bildnachweise`.

Za potpuno samostalan web treba s originalnih izvora preuzeti fotografije u skladu s pojedinačnim licencijama, optimizirati u AVIF/WebP i zamijeniti udaljene URL-ove lokalnim putanjama. Prije objave obvezno provjeriti da su svi izvori i licence točni i fotografije dostupne.

## Prije javne objave

- Potvrditi službeni logotip (trenutno dizajniran novi prijedlog), e-mail, adresu i popis usluga.
- Provjeriti da su destinacije koje žele javno promovirati dio stvarne ponude; **ne oglašavati izlete kao potvrđene termine**.
- Povezati i testirati obrazac, odabrati domenu, verificirati Search Console, poslati sitemap.
- Pravno provjeriti dokumente i obvezne informacije turističke agencije, prema stvarnom statusu djelatnosti.
- Provjeriti fotografije u pravom browseru nakon objave; offline browser pregled neće ih učitati.

## Struktura

- `/`: hrvatski (početni jezik)
- `/en/`: engleski
- `/de/`: njemački
- `/izleti/{slug}/`, `/en/trips/{slug}/`, `/de/ausfluege/{slug}/`: 10 odredišta na 3 jezika
- `/assets/`: stilovi, JavaScript, SVG logotipi
- `/functions/`: Cloudflare Pages sitemap i SEO HTML middleware

Bez WordPressa, bez baze i bez instalacijskog koraka.


## Redizajn V3

- Novi hero s tri stvarne fotografije (izmjena samo na naslovnici), centriran naslov i jasan CTA.
- Katalog s pretraživanjem i filtrom po temama; 10 samostalnih stranica s detaljima obilaska.
- HR / EN / DE sa zadržavanjem iste podstranice pri promjeni jezika.
- Izleti su **prijedlozi odredišta**, nisu raspisani termini ni objavljeni aranžmani.
- Fotografije su vanjski izvori Wikimedia Commons; nisu uključene lokalno zbog ograničenja izravnog preuzimanja. Prava i poveznice vidljive su na stranici izvora fotografija. Pri deployu provjeriti učitavanje izvora.
- `assets/css/redesign.css` i `assets/js/redesign.js` sadrže novi vizualni sustav, filtre, hero slider i dodatne interakcije.
- Fotografije nisu slike BN Tours vozila ni osoblja. Za objavljivanje na konačnoj domeni tražiti vlasnikove fotografije/odobrene izvore.
