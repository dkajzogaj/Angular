const sqlite3 = require('sqlite3').verbose();
let db;

class Baza {

    constructor() {
        db = new sqlite3.Database('../baza.sqlite', sqlite3.OPEN_READWRITE ,(err) =>{
            if(err){
                console.log("Greška: ", err);
                db.close();
            }
            console.log("Connected to the sqlite3 database.")
        })
    }

    spojiSeNaBazu(){
        db = new sqlite3.Database('../baza.sqlite', sqlite3.OPEN_READWRITE ,(err) =>{
            if(err){
                console.log("Greška: ", err);
                db.close();
            }
            console.log("Connected to the sqlite3 database.")
        })
    }

    izvrsiUpit(sql, podaciZaSQL, povratnaFunkcija) {
        db.all(sql, podaciZaSQL, povratnaFunkcija);
    }

    izvrsiUpit(sql, podaciZaSQL){
        return new Promise((uspjeh, neuspjeh)=>{
            db.all(sql,podaciZaSQL, (greska, rezultat) =>{
                if(greska)
                    neuspjeh(greska);
                else
                    uspjeh(rezultat);
            })
        })
    }

    zatvoriVezu() {
        db.close();
    }
}

module.exports = Baza;