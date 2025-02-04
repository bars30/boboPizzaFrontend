import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() drink: any;
  totalPrice = 0 ;
  imgUrl = "";
  selectedVolume: any;

  constructor() {
    console.log(this.drink);
    
  }

  ngOnInit() {
    // console.log("🥗🥗🥗",this.drink);
    // console.log("🪇", this.drink);
    // console.log(this.drink.variations.find((item: any) => {
    //   return item.is_available
    // }));
    this.imgUrl = this.drink.variations.find((item: any) => {
      return item.is_available
    }).image_url;
    this.totalPrice = this.drink.variations.find((item: any) => {
      return item.is_available
    }).price;
    this.selectedVolume = this.drink.variations.find((item: any) => {
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
    this.totalPrice = this.drink.variations.find((item: any) => {
      return item.volume_ml == size
    }).price;
  }

  changeSelectedType(){
    // console.log(this.selectedType);
  }


  mouseover(){
    console.log("mouseover");
    // this.showIngredients = false;
  }
}
