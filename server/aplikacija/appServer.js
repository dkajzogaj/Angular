const konst= require("../konstante.js");
const express = require('express');
const sesija = require('express-session')
const kolacici = require('cookie-parser')
const Konfiguracija = require("../konfiguracija");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");
const provjera = require("../servis/provjera.js");
const server = express();
const cors = require('cors')

let konf = new Konfiguracija();

konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

let portRest = 0;

function pokreniServer() {
    const port = konf.dajKonf()["app.port"];
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));

    server.use(cors());
    server.use('/',express.static(__dirname + "/angular"));
    
    portRest = konf.dajKonf()["rest.port"];

    provjeriRest();
    provjera.provjeriIme();
    provjera.provjeriLozinku();
    provjera.provjeriBroj();
    cssislike();

    pripremiPutanjePocetna();
    pripremiputanjeDokumentacija();
    pripremiputanjeOdjava();
    pripremiputanjeProfil();
    pripremiputanjePregledFilmova();
    pripremiputanjeFilm();
    pripremiputanjeGalerija();
    pripremiputanjeSlika();
    pripremiputanjePrijedlogFilmova();
    pripremiputanjeZanrovi();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();

    server.use("/js", express.static(__dirname + "/js"));
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function cssislike(){
    server.use("/css", express.static(__dirname + "/css"));
    server.use("/aplikacija", express.static(__dirname + "/aplikacija"));
    server.use("/materijali", express.static(__dirname + "/materijali"));
    server.use("/dokumentacija", express.static(__dirname + "/dokumentacija"));
}

function pripremiPutanjePocetna() {
    server.get("/", htmlUpravitelj.pocetna);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}

function pripremiputanjeDokumentacija(){
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
}

function pripremiputanjeOdjava(){
    server.get("/odjava", htmlUpravitelj.odjava);
}

function pripremiputanjeProfil(){
    server.get("/korisnik", fetchUpravitelj.korisnik);
    server.get("/profil", htmlUpravitelj.profil);
    server.put("/profil", htmlUpravitelj.profil);
    server.post("/profil", htmlUpravitelj.profil);
}

function pripremiputanjePregledFilmova(){
    server.get("/filmoviPregled", htmlUpravitelj.pregledFilmova);
    server.get("/dajSveFilmove", fetchUpravitelj.dajSveFilmove);
}

function pripremiputanjeFilm(){
    server.get("/film", htmlUpravitelj.film);
}

function pripremiputanjeGalerija(){
    server.get("/galerijaSlika", htmlUpravitelj.galerijaSlika);
}

function pripremiputanjeSlika(){
    server.get("/slika", htmlUpravitelj.slika);
}

function pripremiputanjePrijedlogFilmova(){
    server.get("/prijedloziFilmova", htmlUpravitelj.prijedloziFilmova);
}

function pripremiputanjeZanrovi(){
    server.get("/zanrovi", htmlUpravitelj.zanrovi);
    server.get("/tmdbZanrovi", fetchUpravitelj.tmdbZanrovi);
    server.post("/zanrovi", htmlUpravitelj.zanrovi);
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
    server.get("/registracija", htmlUpravitelj.registracija);
    server.post("/registracija", htmlUpravitelj.registracija);
    server.get("/odjava", htmlUpravitelj.odjava);
    server.get("/prijava", htmlUpravitelj.prijava);
    server.post("/prijava", htmlUpravitelj.prijava);
    server.get("/getJWT", fetchUpravitelj.getJWT);
    server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
}

async function provjeriRest(){
    let odgovor = await fetch("http://localhost:" + portRest + "/api/korisnici?korime=" + konf.dajKonf()["rest.korime"]+ "&lozinka=" + konf.dajKonf()["rest.lozinka"])
    if(odgovor.status == 400 || odgovor.status == 401){
        console.log("Zahtjev za REST servis nije uspješan!");
        process.exit();
    }
    else if(odgovor.status == 200)
        console.log("Uspješna veza sa REST servisom")
}   
