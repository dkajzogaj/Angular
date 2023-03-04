const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")
const Konfiguracija = require("../konfiguracija.js")
let auth = new Autentifikacija();
let fp = new FilmoviPretrazivanje();
let konf = new Konfiguracija();

exports.aktvacijaRacuna = async function (zahtjev, odgovor) {
    console.log(zahtjev.query);
    let korime = zahtjev.query.korime;
    let kod = zahtjev.query.kod;

    let poruka = await auth.aktivirajKorisnickiRacun(korime, kod);
    console.log(poruka)

    if (poruka.status == 200) {
        odgovor.send(await poruka.text());
    } else {
        odgovor.send(await poruka.text());
    }
}

exports.dajSveZanrove = async function (zahtjev, odgovor) {
        odgovor.json(await fp.dohvatiSveZanrove());
}

exports.dajSveFilmove = async function (zahtjev, odgovor) {
    if (zahtjev.session.jwt != null) {
        odgovor.json(await fp.dohvatiSveFilmove());
    }
}

exports.tmdbZanrovi = async function (zahtjev, odgovor){
    if(zahtjev.session.jwt != null){
        odgovor.json(await fp.sviTMDBZanrovi());
    }
}

exports.dajDvaFilma = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr))
}
exports.korisnik = async function (zahtjev, odgovor){
    odgovor.json(await fp.dohvatiKorisnika(zahtjev.session.korime));
}

exports.getJWT = async function (zahtjev, odgovor) {
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ ok: noviToken });
        return
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
        if (zahtjev.session.jwt == null) {
            odgovor.status(401);
            odgovor.json({ greska: "neautorizirani pristup" });
        } else {
            let str = zahtjev.query.stranica;
            let filter = zahtjev.query.filter;
            console.log(zahtjev.query)
            odgovor.json(await fp.dohvatiFilmove(str,filter))
        }
}

exports.dodajFilm = async function (zahtjev, odgovor) {
    console.log(zahtjev.body);
    if (!jwt.provjeriToken(zahtjev)) {
        odgovor.status(401);
        odgovor.json({ greska: "neautorizirani pristup" });
     } else {
        //TODO obradi zahtjev
        odgovor.json({ok: "OK"});
     }
}