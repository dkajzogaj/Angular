const kodovi = require("./moduli/kodovi.js")
const Konfiguracija = require("../konfiguracija.js");
let konfiguracija = new Konfiguracija();

konfiguracija.ucitajKonfiguraciju();

class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec +"&korime=" +konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"];
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }
    
    async dohvatiSveZanrove() {
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let odgovor = await fetch(url + "/zanr?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dohvatiSveFilmove() {
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let odgovor = await fetch(url + "/filmovi?stranica=1&brojFilmova=100&korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dohvatiNasumceFilm(zanr) {
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let odgovor = await fetch(url + "/filmovi?stranica=1&brojFilmova=20&korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let BrojFilmovaPoZanru = Object.keys(filmovi).length;
        let rez = [filmovi[kodovi.dajNasumceBroj(0,BrojFilmovaPoZanru)],
                    filmovi[kodovi.dajNasumceBroj(0,BrojFilmovaPoZanru)]];
        return rez;
    }

    async dohvatiKorisnika(id){
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let odgovor = await fetch(url + "/korisnici/" + id + "?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci);
        return korisnik;
    }

    async sviTMDBZanrovi(){
        const portRest = konfiguracija.dajKonf()["rest.port"];
        const url = "http://localhost:" + portRest + "/api";
        let odgovor = await fetch(url + "/tmdb/zanr?korime="+konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }
}



module.exports = FilmoviZanroviPretrazivanje;