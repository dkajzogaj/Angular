import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})

export class RegistracijaComponent {

    constructor(private titleService: Title) {
        titleService.setTitle("Prijava");
      }
  
    async registrirajME(){
        let imee = (document.getElementById("ime") as HTMLInputElement).value;
        let prezimee = (document.getElementById("prezime") as HTMLInputElement).value;
        let korimee = (document.getElementById("korime") as HTMLInputElement).value;
        let lozinkaa = (document.getElementById("lozinka") as HTMLInputElement).value;
        let emaill = (document.getElementById("email") as HTMLInputElement).value;

    if(korimee && lozinkaa && imee && prezimee && emaill){
      let zaglavlje = new Headers();
      zaglavlje.set("Content-Type", "application/json");
      let parametri = {
          method: 'POST',
          body: JSON.stringify({ime: imee, prezime: prezimee, lozinka: lozinkaa, email: emaill, korime: korimee}),
          headers: zaglavlje
      }
      let odgovor = await fetch(environment.appServer + "/registracija", parametri)
      
      if (odgovor.status == 200) {
          return await odgovor.text();
      } else {
          return false;
      }
  }
  return true;
    }

}
