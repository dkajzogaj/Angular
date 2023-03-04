import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { ZanrI } from '../servisi/zanrI';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-zanrovi',
  templateUrl:'./zanrovi.component.html' ,
  styleUrls: ['./zanrovi.component.scss']
})

export class ZanroviComponent {

  constructor(private titleService: Title) {
    titleService.setTitle("Žanrovi");
  }

  zanr: Array<ZanrI> = [];
  tmdbZanr: Array<ZanrI> = [];

  async ngOnInit(){
    this.zanr = await this.dohvatiZanrove();
    this.tmdbZanr = await this.dohvatiTMDBZanrove();
  }

  async dohvatiZanrove(){
    let odgovor = await fetch(environment.appServer + "/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

  async dohvatiTMDBZanrove(){
    let odgovor = await fetch(environment.appServer + "/tmdbZanrovi");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
  }
}
