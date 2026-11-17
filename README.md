# BN TOURS – web stranica prema briefu (V9)

## Pokretanje
Statički HTML/CSS/JS bez build komande. Prenesite **sadržaj** ove mape u korijen GitHub repozitorija; Cloudflare Pages: Framework `None`, Build command prazan, Output directory `.`.

Lokalni test: `python -m http.server 8080` iz korijena projekta, zatim otvorite http://localhost:8080/. Nemojte otvarati HTML direktno preko `file://` jer preglednik blokira fetch `/data/offers.json`.

## Kako dodati izlet
Uredite `data/offers.json` i `data/destinations.json`. Svi listingi, kartice i filteri čitaju podatke iz JSON-a. SEO statičke podstranice za novi izlet potrebno je generirati/izraditi posebno ili ponuditi preko `putovanje.html?id=<slug>`; 12 postojećih već je generirano.

## Fotografije
Sve slike su **lokalne**. U `/assets/img/destinacije/` su ilustrativni generirani vizuali, a ne dokumentarne fotografije navedenih destinacija, vozila ili realiziranih putovanja BN Toursa. Za konačnu javnu verziju preporučuje se zamjena stvarnim fotografijama s odgovarajućom licencijom i točnim atribucijama. Brzina i vanjski URL problemi riješeni su lokalizacijom materijala. Galerija koristi isti motiv po pojedinom izletu.

## Upiti
U `assets/js/config.json` dodajte vlastiti `web3forms_access_key` nakon potvrde adrese primatelja. Do tada obrazac **otvara e-mail program korisnika** i jasno kaže da poruka nije automatski poslana. Ne postoji fikcijska potvrda rezervacije. Honeypot je uključen.

## Važno prije objave
Potvrditi s vlasnikom aktivne programe, polazne gradove, cijene, datume i usluge. Trenutno se ništa od toga ne predstavlja kao potvrđeno. Potvrditi email, pravne informacije te podatke turističke agencije. Nema oglasa ni analitike pa nema kolačića koji zahtijevaju privolu.

## Dizajn i pravila
HTML5, originalni CSS tokeni, ES moduli, bez frameworka, vanjskih skripti i CDN-a. Sistemski fontovi su korišteni umjesto redistribucije font datoteka. Intro je samo jednom po sesiji i isključuje se uz `prefers-reduced-motion`.

## Odstupanja od PDF brifa zbog nedostajućih činjenica
Brief opisuje prikaz cijena, garancija, ponude za besplatnu djecu i konkretnih datuma. To je namjerno zamijenjeno „Cijena na upit”, razdobljima interesa i sadržajem prema dogovoru. Ne prikazivati nepodržane popuste, termine ni recenzije. Zadržana su tri jezika HR/EN/DE iz postojećeg projekta.
