import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [ 

  ]
})
export class AgregarComponent implements OnInit {

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar) { }


  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_image: ""
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },

    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe)
  }


  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if( this.heroe.id ){
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => console.log("actualizando", heroe))
        this.mostrarSnackBar('Heroe actualizado', 'Ok!');
    }else{
      //agregar nuevo
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => this.router.navigate([`/heroes/editar`, heroe.id]) )
      this.mostrarSnackBar('Heroe agregado', 'Ok!');
    }


  }


  borrar(){
    this.heroesService.borrarHeroe(this.heroe)
      .subscribe(resp => this.router.navigate(['/heroes']))
  }

  mostrarSnackBar(mensaje: string, accion: string){  
    this.snackBar.open(mensaje, accion, {duration: 3000});
    
  }
}
