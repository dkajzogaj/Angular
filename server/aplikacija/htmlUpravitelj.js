const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const totp = require("./moduli/totp.js")
const Autentifikacija = require("./autentifikacija.js")
const filmovi = require("./filmoviPretrazivanje.js")
const Konfiguracija = require("../konfiguracija.js")
let auth = new Autentifikacija();
fp = new filmovi();
let konf = new Konfiguracija();

exports.pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna", "" , zahtjev)
    odgovor.send(pocetna);
}

exports.dokumentacija = async function(zahtjev, odgovor){
    let dokumentacija = await ucitajStranicu("dokumentacija", "" , zahtjev)
    odgovor.send(dokumentacija);
}

exports.profil = async function (zahtjev, odgovor){
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        if(zahtjev.method == "POST"){
            var korisnik = await fp.dohvatiKorisnika(zahtjev.session.korime);
            var ime = zahtjev.body.ime;
            var prezime = zahtjev.body.prezime;
            auth.azurirajKorisnika(zahtjev.session.korime,korisnik,ime,prezime);
        }
        let profil = await ucitajStranicu("profil", "" , zahtjev)
        odgovor.send(profil);
    }
}

exports.pregledFilmova = async function(zahtjev, odgovor){
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        let pregled = await ucitajStranicu("filmovi_pregled", "" , zahtjev)
        odgovor.send(pregled);
    }
}

exports.film = async function (zahtjev, odgovor){
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        zahtjev.session.filmId = zahtjev.query.id;
        let film = await ucitajStranicu("film", "" , zahtjev)
        odgovor.send(film);
    }
}

exports.galerijaSlika = async function(zahtjev, odgovor){
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        let galerija = await ucitajStranicu("galerija_slika", "" , zahtjev)
        odgovor.send(galerija);
    }
}

exports.slika = async function(zahtjev, odgovor){
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        let slika = await ucitajStranicu("slika", "" , zahtjev)
        odgovor.send(slika);
    }
}

exports.prijedloziFilmova = async function(zahtjev,odgovor){
    if(!zahtjev.session.korime || zahtjev.session.uloga == 1)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        let prijedlog = await ucitajStranicu("filmovi_prijedlozi", "" , zahtjev)
        odgovor.send(prijedlog);
    }
}

exports.zanrovi = async function(zahtjev, odgovor){
    if(!zahtjev.session.korime || zahtjev.session.uloga == 1)
        return odgovor.redirect("/");
    if (zahtjev.session.jwt != null) {
        if(zahtjev.method == "POST" && !zahtjev.body.zanr && !zahtjev.body.novizanr){
            auth.obrisiSveZanrove();
            }
        let zanr = await ucitajStranicu("zanrovi","", zahtjev)
        odgovor.send(zanr);
    }
}

exports.registracija = async function (zahtjev, odgovor) {
    if(zahtjev.session.uloga)
        return odgovor.redirect("/");
    let re = new RegExp("([a-zA-Z0-9!€\.-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z\.]+)");
    console.log(zahtjev.body)
    let uspjeh;
    let greska = "";
    if (zahtjev.method == "POST") {
        if(zahtjev.body.ime && zahtjev.body.prezime && zahtjev.body.lozinka && zahtjev.body.korime && re.exec(zahtjev.body.email) !=null){
            uspjeh = await auth.dodajKorisnika(zahtjev.body);
        }
        if (uspjeh) {
            odgovor.redirect("/#prijava");
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
        }
    }
    let stranica = await ucitajStranicu("registracija", greska, zahtjev);
    odgovor.send(stranica);
}

exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.korisnik = null;
    zahtjev.session.destroy();
    odgovor.redirect("/");
};

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if(zahtjev.session.uloga)
        return odgovor.redirect("/");
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await auth.prijaviKorisnika(korime, lozinka);
        if (korisnik) {
            if(JSON.parse(korisnik)["Uloge_korisnika_id"]==1 || JSON.parse(korisnik)["Uloge_korisnika_id"] == 2){
            let totpKljuc = JSON.parse(korisnik)["totp_kljuc"];
            let totpKod = zahtjev.body.totp;
            zahtjev.session.jwt = jwt.kreirajToken(korisnik)
            zahtjev.session.korisnik = JSON.parse(korisnik)["ime"] + " " + JSON.parse(korisnik)["prezime"];
            zahtjev.session.korime = JSON.parse(korisnik)["korime"];
            zahtjev.session.email = JSON.parse(korisnik)["email"];
            zahtjev.session.uloga = JSON.parse(korisnik)["Uloge_korisnika_id"]; 
            odgovor.redirect("/");
            return;
        }
        return true;
        } else {
            greska = "Netocni podaci!";
        }
    }

    let stranica = await ucitajStranicu("prijava", greska, zahtjev);
    odgovor.send(stranica);
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    if(!zahtjev.session.korime)
        return odgovor.redirect("/");
    else if(!jwt.provjeriToken(zahtjev))
        return;
    let stranica = await ucitajStranicu("filmovi_pretrazivanje","",zahtjev);
    odgovor.send(stranica);
}

async function ucitajStranicu(nazivStranice, poruka = "",zahtjev) {
    let stranice = [ucitajHTML(nazivStranice),
    provjeranavigacije(zahtjev)];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

function provjeranavigacije(zahtjev){
    if(zahtjev.session.uloga == 1)
        return ucitajHTML("navigacijakorisnik");
    else if(zahtjev.session.uloga == 2)
        return ucitajHTML("navigacija");
    else if(!zahtjev.session.uloga)
        return ucitajHTML("navigacijagost");
}

async function provjeriRecaptchu(token){
    let parametri = {method: 'POST'}
    let o = await fetch("https://www.google.com/recaptcha/api/siteverify?secret="+konf.dajKonf()["tajniKljucCaptcha"]+"&response="+token,parametri);
    let recaptchaStatus = JSON.parse(await o.text());
    console.log(recaptchaStatus);
    if(recaptchaStatus.success && recaptchaStatus.score > 0.5)
        return true;
    return false;
}


