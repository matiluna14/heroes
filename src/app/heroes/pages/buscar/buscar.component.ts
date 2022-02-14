import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;

  ngOnInit(): void {
  }


  buscando() {
    this.heroesService.getSugerencias(this.termino)
      .subscribe(heroes => this.heroes = heroes)
  }


  opcionSeleccionada( event: any) {
    if (event.option.value != "") {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
  
      this.heroesService.getHeroePorId(heroe.id!)
        .subscribe(heroe => this.heroeSeleccionado = heroe )
    } else{
      console.log("no hay ningun valor")
    }



  }
}
