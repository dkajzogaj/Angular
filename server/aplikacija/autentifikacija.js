const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js")
const totp = require("./moduli/totp.js")
const Konfiguracija = require("../konfiguracija.js");
let konfiguracija = new Konfiguracija();

konfiguracija.ucitajKonfiguraciju();

class Autentifikacija {
    async dodajKorisnika(korisnik) {
        let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
        let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);

        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
            email: korisnik.email,
            korime: korisnik.korime,
            aktivacijski_kod: aktivacijskiKod,
            totp_kljuc: tajniTOTPkljuc
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/korisnici?korime=" + konfiguracija.dajKonf()["rest.korime"]+ "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"] , parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            let mailPoruka = await fetch("http://localhost:"+ konfiguracija.dajKonf()["app.port"] +"/aktivacijaRacuna?korime=" + korisnik.korime + "&kod=" + aktivacijskiKod)
            return true;
        } else {
            console.log(odgovor.status);
            console.log(await odgovor.text());
            return false;
        }
    }

    async aktivirajKorisnickiRacun(korime, kod) {
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ aktivacijskiKod: kod }),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/korisnici/" + korime + "/aktivacija?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"], parametri)
    }

    async prijaviKorisnika(korime, lozinka) {
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/korisnici/" + korime + "/prijava?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"], parametri)

        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }

    async azurirajKorisnika(korime,korisnik,ime,prezime){
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ ime: ime, prezime: prezime, Korime: korime }),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/korisnici/" + korime + "?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"], parametri)
    }

    async obrisiSveZanrove(){
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'PUT',
            body: JSON.stringify({ }),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/zanr?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"],parametri);
    }
    
    async DohvatiTMDBZanrove(){
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");
        let parametri = {
            method: 'GET',
            body: JSON.stringify({ }),
            headers: zaglavlje
        }
        return await fetch("http://localhost:" + konfiguracija.dajKonf()["rest.port"] + "/api/tmdb/zanr?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"],parametri)
    }
}

module.exports = Autentifikacija;