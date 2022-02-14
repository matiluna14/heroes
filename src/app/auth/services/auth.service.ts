import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap,map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;




  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('token', auth.id))
      )
  }




  get auth(): Auth{
    return{...this._auth!}
  }

  verificarAutenticacion(): Observable<boolean>{

    if( !localStorage.getItem('token') ){
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      })
    )
    
    
  }

 
}
