import { createInjectableType, ReturnStatement } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { TMDBFilmI } from '../servisi/filmI';
import { Title } from '@angular/platform-browser';



interface PodaciI {
   results: Array<TMDBFilmI>;
}

@Component({
  selector: 'app-filmovi-pretrazivanje',
  templateUrl: './filmovi-pretrazivanje.component.html',
  styleUrls: ['./filmovi-pretrazivanje.component.scss']
})

export class FilmoviPretrazivanjeComponent {
  title = 'Filmovi Pretraživanje';
  upisano:string = "";
  filmovi: Array<TMDBFilmI> = new Array<TMDBFilmI>();
  posterUrl: string = "";
  min = 1;
  sadasnji = 1;
  max = 500;

  constructor(private titleService: Title) {
    titleService.setTitle("Filmovi pretraživanje");
  }
    ngOnInit(){
    this.dohvatiFilmove(1);
    this.posterUrl = environment.posteriPutanja;
  }


  async dohvatiFilmove(str: number) {
      let parametri= { method: 'GET'}
      let odgovor = await fetch(environment.restServis + "/api/tmdb/filmovi?stranica=" + str + "&kljucnaRijec=" + this.upisano, parametri);
      if (odgovor.status == 200) {
        let podaci: PodaciI = JSON.parse(await odgovor.text()) as unknown as PodaciI;
        this.filmovi = podaci.results;
        console.log(this.filmovi);
      }
  }

  prikaziStranicenje(){
        this.sadasnji = this.min;
        this.dohvatiFilmove(this.min);
  };

  prikaziStranicenje2(){
    if(this.min == this.sadasnji){
        return;
    }else{
        this.sadasnji--;
        this.dohvatiFilmove(this.sadasnji);
    }
  }

  prikaziStranicenje3(){
    if(this.sadasnji == this.max){
        return;
    }else{
        this.sadasnji++;
        this.dohvatiFilmove(this.sadasnji);
    }
  }

  prikaziStranicenje4(){
    this.sadasnji = this.max;
    this.dohvatiFilmove(this.max);
  }
  
  dajFilter(event: any) {
    this.upisano = event?.target.value;
    this.sadasnji=1;
  }
}
