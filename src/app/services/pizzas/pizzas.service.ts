import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environmen';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  constructor(private http: HttpClient) { }

  getPizzas(): Observable<any[]> {
    return this.http.get<any[]>(environment.getPizzas.get);
  }
  getDrinks(): Observable<any[]> {
    return this.http.get<any[]>(environment.drinks.get);
  }

  getDesserts(): Observable<any[]> {
    return this.http.get<any[]>(environment.desserts.get);
  }
  getBreakfasts(): Observable<any[]> {
    return this.http.get<any[]>(environment.breakfasts.get);
  }
  getSnacks(): Observable<any[]> {
    return this.http.get<any[]>(environment.snacks.get);
  }
  // addToCart(cartItem: any): Observable<any> {
  //   return this.http.post(environment.addToCart.get, cartItem);
  // }
  addToCart(cartItem: any): Observable<any> {
    return this.http.post(environment.addToCart.get, cartItem);
  }
}
