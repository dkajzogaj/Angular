import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { KorisnikI } from '../servisi/korisnikI';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html' ,
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent {
  korisnik: KorisnikI|null = null;
  ime?: string;
  prezime?: string;
  email?: string;
  korime?: string;
  Uloge_korisnika_id?: number;

  constructor(private titleService: Title) {
    titleService.setTitle("Profil");
  }

  ngOnInit(){
     this.Korisnik();
  }

  async Korisnik(){
    let parametri = {method: 'GET'}
    let odgovor = await fetch(environment.appServer + "/korisnik", parametri);
    console.log(odgovor);
    if(odgovor.status == 200){
      let podaci = JSON.parse(await odgovor.text());
      this.korisnik = podaci;
      this.ime = this.korisnik?.ime;
      this.prezime = this.korisnik?.prezime;
      this.email = this.korisnik?.email;
      this.korime = this.korisnik?.korime;
      this.Uloge_korisnika_id = this.korisnik?.Uloge_korisnika_id;

      console.log(podaci);
      console.log(this.korisnik)
    }
}
  async promjeniPodatke(){
    let imee = (document.getElementById("ime") as HTMLInputElement).value;
    let prezimee = (document.getElementById("prezime") as HTMLInputElement).value;

    if(imee && prezimee){
      let zaglavlje = new Headers();
      zaglavlje.set("Content-Type", "application/json");
      let parametri = {
          method: 'POST',
          body: JSON.stringify({ime: imee, prezime: prezimee}),
          headers: zaglavlje
      }
      let odgovor = await fetch(environment.appServer + "/profil", parametri)
      
      if (odgovor.status == 200) {
          return await odgovor.text();
      } else {
          return false;
      }
    }
    return true;
  }
}
