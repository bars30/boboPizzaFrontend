import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent {
  @Input() isOpen: boolean = false; 
  @Output() closeSheet = new EventEmitter<void>(); 
  cartData: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private http: HttpClient) {
    console.log("constructor");
    
   }
  close() {
    this.closeSheet.emit(); 
  }
 

  ngOnInit() {
    console.log("ngoninit");
    this.fetchCartData();
    this.cartData.map((item: any) => console.log(item));
  }
  ngOnChanges() {
    console.log("🦧ngonchanges🦧");
    this.fetchCartData();
    this.cartData.map((item: any) => console.log(item));
  }
  fetchCartData() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<CartItem[]>("http://localhost:8000/cart", {  // Specify the type here
      headers: headers,
      withCredentials: true  // Ensure cookies are sent with the request
    }).subscribe(
      (response: CartItem[]) => {  // Type the response here as well
        console.log("Cart data received:", response);
        this.cartData = response;  // Now cartData will have the correct type
        this.totalPrice = 0;
        this.cartData.map((item: any) => this.totalPrice += parseInt(item.price));
        console.log(this.cartData.length);
        
      },
      error => {
        console.error("Error fetching cart data:", error);
      }
    );
  }
  
}
