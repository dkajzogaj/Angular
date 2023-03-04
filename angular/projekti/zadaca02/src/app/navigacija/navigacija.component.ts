import { Component, Inject } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { KorisnikI } from '../servisi/korisnikI';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss']
})


export class NavigacijaComponent {
  korisnik: KorisnikI|null = null;  
  Uloge_korisnika_id? : number;
  /**
   *
   */

  ngOnInit(){
    this.Korisnik();
 }

  public constructor(@Inject(AppComponent) private glavni: AppComponent) {
  }

  public novaNavigacija(navigacija: string): void{
    this.glavni.title = navigacija;
  }

 async Korisnik(){
   let parametri = {method: 'GET'}
   let odgovor = await fetch(environment.appServer + "/korisnik", parametri);
   console.log(odgovor);
   if(odgovor.status == 200){
     let podaci = JSON.parse(await odgovor.text());
     this.korisnik = podaci;
     this.Uloge_korisnika_id = this.korisnik?.Uloge_korisnika_id;
    }
  }
 
  async OdjaviMe(){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let parametri = {
        method: 'GET',
        headers: zaglavlje
    }
    let odgovor = await fetch(environment.appServer +"/odjava",parametri)
    console.log(odgovor.status);
    window.location.href='/';
  }

}
