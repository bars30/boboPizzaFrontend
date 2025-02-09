import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() drink: any;
  @Input() category : any;
  @Output() showToast = new EventEmitter<any>();
  totalPrice = 0 ;
  imgUrl = "";
  selectedVolume: any;

  constructor(private http: HttpClient) {
    console.log(this.drink);
    
  }

  ngOnInit() {
    // console.log("🥗🥗🥗",this.drink);
    // console.log("🪇", this.drink);
    // console.log(this.drink.variations.find((item: any) => {
    //   return item.is_available
    // }));
    this.imgUrl = this.drink?.variations?.find((item: any) => {
      return item.is_available
    }).image_url;
    this.totalPrice = this.drink?.variations?.find((item: any) => {
      return item.is_available
    }).price;
    this.selectedVolume = this.drink?.variations?.find((item: any) => {
      return item.is_available
    }).volume_ml;

    // console.log("🍧🍧🍧", this.drink.variations);
    // console.log("🍧🍧🍧", this.drink.variations.length);

  }
  logAnything(){
    // console.log("this.availablePizzas", this.availablePizzas);


    
  }



  changeSize(size: number){
    this.selectedVolume = size;
    // console.log(size);
    this.totalPrice = this.drink?.variations?.find((item: any) => {
      return item.volume_ml == size
    }).price;
  }

  changeSelectedType(){
    // console.log(this.selectedType);
  }


  mouseover(){
    // console.log("mouseover");
    // this.showIngredients = false;
  }
  addToCart(){
    console.log(this.drink);
    let itemId;
    console.log("🥐!!this.drink.variations", this.drink.variations);
    let cartItem: any = {};
    if (!!this.drink.variations) {
      console.log(this.drink.variations.length);
      console.log(this.drink.variations.length == 1);
      
      if (this.drink.variations.length == 1) {
        console.log(this.drink.variations[0]["id"]);
        itemId = this.drink.variations[0]["id"];
      } else {
        this.drink.variations.find((item: any) => {
          if (item.volume_ml == this.selectedVolume) {
            console.log(item["id"]);
            console.log("🪇",item);
            itemId = item["id"];
            
          }
        })
      }
      console.log(this.category);
      
       cartItem = {
        // cart_id: 1,  // ID корзины (замени на актуальный)
        category: this.category,
        item_id: itemId, // ID вариации пиццы
        quantity: 1,
        price: this.totalPrice, // Цена за 1 шт
        subtotal: this.totalPrice * 1, // Итоговая сумма
      };
      
    } else {
      console.log('elseee');
      console.log("🥗🥗🥗🥗🥗",this.drink);
      
       cartItem = {
        // cart_id: 1,  // ID корзины (замени на актуальный)
        category: this.category,
        item_id: this.drink.id,
        quantity: 1,
        price: this.drink.price, // Цена за 1 шт
        subtotal: this.totalPrice * 1, // Итоговая сумма
      };
    }

    console.log("🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇",cartItem);
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
      this.http.post("http://localhost:8000/cart/add-to-cart", cartItem,  {
        headers: headers,
        withCredentials: true // Убедитесь, что куки отправляются
      }).subscribe(
        response => {
          console.log(this.drink.name);
          console.log("🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇🪇",cartItem);
          console.log("Товар добавлен в корзину:", response);
          this.showToast.emit({message: true, title: this.drink.name});
        },
        error => {
          this.showToast.emit({message: false, title: this.drink.name});
          console.error("Ошибка при добавлении в корзину:", error);
        }
      );
    
    
  }
}
