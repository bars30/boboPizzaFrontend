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
    return this.http.get<any[]>(environment.getPizzas);
  }
  getDrinks(): Observable<any[]> {
    return this.http.get<any[]>(environment.drinks);
  }

  getDesserts(): Observable<any[]> {
    return this.http.get<any[]>(environment.desserts);
  }
  getBreakfasts(): Observable<any[]> {
    return this.http.get<any[]>(environment.breakfasts);
  }
  getSnacks(): Observable<any[]> {
    return this.http.get<any[]>(environment.snacks);
  }
  // addToCart(cartItem: any): Observable<any> {
  //   return this.http.post(environment.addToCart.get, cartItem);
  // }
  // addToCart(cartItem: any): Observable<any> {
  //   return this.http.post(environment.addToCart, cartItem);
  // }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(environment.addToCart, cartItem, { withCredentials: true });
  }
  
}
