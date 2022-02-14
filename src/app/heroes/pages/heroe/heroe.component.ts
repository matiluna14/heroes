import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `mat-card {
      margin-top: 20px;
    }
    img{
      width: 100%;
    }`

  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activateRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .pipe (
        switchMap( ({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe );
  }



  regresar(){
    this.router.navigate(["/heroes/listado"]);
  }
}
