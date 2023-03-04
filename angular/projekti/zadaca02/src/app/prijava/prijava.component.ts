import { Component } from '@angular/core';
import { mergeMapTo } from 'rxjs';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})

export class PrijavaComponent {


  constructor(private titleService: Title) {
    titleService.setTitle("Prijava");
  }

   async POKRENI(){
    let korimee = (document.getElementById("korime") as HTMLInputElement).value;
    let lozinkaa = (document.getElementById("lozinka") as HTMLInputElement).value;

    if(korimee && lozinkaa){
      let zaglavlje = new Headers();
      zaglavlje.set("Content-Type", "application/json");
      let parametri = {
          method: 'POST',
          body: JSON.stringify({korime: korimee, lozinka: lozinkaa}),
          headers: zaglavlje
      }
      let odgovor = await fetch(environment.appServer + "/prijava", parametri)
      
      if (odgovor.status == 200) {
          return await odgovor.text();
      } else {
          return false;
      }
  }
  return true;
  }
}


