import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { FooterComponent } from './footer/footer.component';
import { FilmoviPretrazivanjeComponent } from './filmovi-pretrazivanje/filmovi-pretrazivanje.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { ProfilComponent } from './profil/profil.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { FilmComponent } from './film/film.component';
import { GalerijaSlikaComponent } from './galerija-slika/galerija-slika.component';
import { SlikaComponent } from './slika/slika.component';
import { PrijedloziFilmovaComponent } from './prijedlozi-filmova/prijedlozi-filmova.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { OdjavaComponent } from './odjava/odjava.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    NavigacijaComponent,
    FooterComponent,
    FilmoviPretrazivanjeComponent,
    DokumentacijaComponent,
    ProfilComponent,
    FilmoviPregledComponent,
    FilmComponent,
    GalerijaSlikaComponent,
    SlikaComponent,
    PrijedloziFilmovaComponent,
    ZanroviComponent,
    PrijavaComponent,
    RegistracijaComponent,
    OdjavaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
