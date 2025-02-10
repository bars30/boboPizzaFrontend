import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cartItem: CartItem = {} as CartItem;
  @Output() deleteItemEvent = new EventEmitter<void>();
  constructor(private http: HttpClient) { 
    console.log(this.cartItem);
  }
  ngOnInit() { 
    console.log(this.cartItem);
    
  }
  deleteItem(){
    console.log("Deleting item...");
    console.log(this.cartItem);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = { id: this.cartItem.id }; // Ensure this.cartItem is defined
    
    this.http.post("http://localhost:8000/cart/delete-cart-item", body, {
      headers: headers,
      withCredentials: true // Ensure cookies are sent with the request
    }).subscribe(
      (response) => {
        console.log("Cart item deleted successfully:", response);
        this.deleteItemEvent.emit();
      },
      (error) => {
        console.error("Error deleting cart item:", error);
      }
    );
    
  }
}
