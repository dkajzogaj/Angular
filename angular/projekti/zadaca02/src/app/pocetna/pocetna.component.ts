import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ZanrI } from '../servisi/zanrI';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pocetna',
  templateUrl:'./pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})

export class PocetnaComponent {
  zanr: Array<ZanrI> = [];

  constructor(private titleService: Title) {
    titleService.setTitle("Početna");
  }

  async ngOnInit(){
    this.zanr = await this.dohvatiZanrove();
  }

  async dohvatiZanrove(){
    let odgovor = await fetch(environment.appServer + "/dajSveZanrove");
    let podaci = await odgovor.text();
    let dobiveniZanr = JSON.parse(podaci);
    for (let i = 0; i < dobiveniZanr.length; i++) {
        dobiveniZanr[i].pripadajuciFilm = await this.dohvatiFilmove(dobiveniZanr[i].naziv);
    }
    return dobiveniZanr;
}

async dohvatiFilmove(zanr: string) {
    let odgovor = await fetch(environment.appServer + "/dajDvaFilma?zanr=" + zanr);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
}
}
