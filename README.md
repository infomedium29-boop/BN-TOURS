# BN TOURS — premium višestranični demo

Statički HTML/CSS/JavaScript, bez npm ovisnosti i bez build procesa. Spremno za GitHub → Cloudflare Pages.

## Sadržaj

- Početna (`/`), školska putovanja, grupna putovanja, izleti, o nama, zatražite ponudu, kontakt
- Politika privatnosti, kolačići, uvjeti korištenja web stranice, atribucije fotografija
- Premium intro na prvom otvaranju u sesiji, pristupačna mobilna navigacija, animacije uz `prefers-reduced-motion`
- Interaktivni kontaktni obrazac s validacijom, lokalnom zaštitom od spama i podrškom za Web3Forms
- Google Maps iframe koji se učitava tek na izričit klik
- Meta opis za svaku stranicu, Organization JSON-LD, robots, automatski sitemap na Cloudflare Pages
- Prilagođena 404 stranica, osnovna Cloudflare zaglavlja

## GitHub + Cloudflare Pages

1. Otvori novi GitHub repository i postavi **sav sadržaj ovog ZIP-a u korijen repozitorija** (ne samo ZIP kao datoteku).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: **None**; Build command: **prazno**; Build output directory: **.** (točka, korijen projekta).
4. Deploy. Cloudflare automatski poslužuje `index.html` i podstranice iz pojedinih direktorija.
5. Cloudflare Pages Function generira `/sitemap.xml` s trenutnom domenom i ne traži ručnu zamjenu URL-a.
6. Nakon povezivanja prave domene dodaj je u Google Search Console i pošalji sitemap: `https://TVOJA-DOMENA/sitemap.xml`.

## Obrazac: prije objave postaviti slanje!

U `assets/js/config.js` upiši **Web3Forms access key** u `web3formsAccessKey` i potvrđeni primateljski e-mail u `enquiryEmail`.

Ako je ključ prazan, klik na slanje samo otvara e-mail aplikaciju i priprema poruku; stranica ne tvrdi da ju je poslala. Za prvo demonstracijsko postavljanje to je namjerno transparentan fallback. Prije stvarne kampanje poveži Web3Forms, testiraj slanje, omogući dodatnu spam zaštitu u postavkama usluge i po potrebi ukloni demonstracijsku napomenu iz obrasca.

## Fotografije — važna napomena

Fotografije su **stvarne fotografije destinacija, s javnih izvora**, ali su izvorno na vanjskim CDN-ovima (Pexels i Wikimedia). Ovaj ZIP ne sadrži kopije izvornih slika jer je preuzimanje u radnom okruženju bilo onemogućeno.

Poveznice su u generatoru koji je izradio HTML i unutar `src` atributa HTML datoteka. Stranica zahtijeva internet za slike i Google Fonts. Ako želiš potpuno lokalnu dostavu, preuzmi odgovarajuće fotografije od autora/poslužitelja, pretvori ih u AVIF, zamijeni `src` putanje i ažuriraj atribucije. Nemoj uklanjati licence.

Atribucije: `izvori-fotografija/index.html`.

## Što je obavezno potvrditi s BN Toursom prije službene objave

- Jesu li trenutno ponuđene sve navedene vrste putovanja; prava struktura proizvoda i ponuda
- Službeni logo, e-mail za web i telefon
- Jesu li obvezne informacije agencije, voditelj poslova, pravila putovanja i prigovora, jamčevine/osiguranja primjenjivi i gdje se objavljuju
- Točnost svih poslovnih podataka, kontakt adrese i režima rada
- Pravni tekstovi od nadležnih osoba, poslije aktiviranja vanjskih alata
- Stvarne fotografije ponude, vozila, reference i eventualne recenzije

**Odredišta prikazana na stranici služe kao inspiracija, a ne kao potvrđeni aktivni aranžmani.**

## Tehničke napomene

- Mobilna širina i navigacija testirane su za 375px, 390px, 768px, 1440px; produkcijski QA treba završiti na live hostingu, posebno učitavanje udaljenih slika.
- Nisam ugradio GA4 jer nema klijentske privole; naknadno dodati samo uz odgovarajući consent mode i ažuriranje politika.
- Nema lažnih recenzija, obećanja o vlastitom voznom parku, nepodržanih cijena ni automatiziranih rezervacija.
