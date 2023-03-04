import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { FilmI } from '../servisi/filmI';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-filmovi-pregled',
  templateUrl: './filmovi-pregled.component.html',
  styleUrls: ['./filmovi-pregled.component.scss']
})
export class FilmoviPregledComponent {
  filmovi : Array<FilmI> = []
  posterUrl: string = "";
  url = "'/film?id=";


  constructor(private titleService: Title) {
    titleService.setTitle("Filmovi pregled");
  }

  async ngOnInit(){
    this.filmovi = await this.dohvatiFilmove();
    this.posterUrl = environment.posteriPutanja
  }

  async  dohvatiFilmove(){
    let odgovor = await fetch(environment.appServer+"/dajSveFilmove");
    let podaci = await odgovor.text();
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}
}
