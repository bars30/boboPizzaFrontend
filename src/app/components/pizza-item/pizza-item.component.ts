import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzasService } from '../../services/pizzas/pizzas.service';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule  ],
  templateUrl: './pizza-item.component.html',
  styleUrl: './pizza-item.component.css'
})
export class PizzaItemComponent {
  @Input() pizza: any;
  ingredients: string = '';
  selectedSize = 30;
  selectedType = "традиционное"; //традиционное
  availablePizzas: any[] = [];
  selectedIngredients: number[] = [];
  showIngredients: boolean = false;
  pizzaVariationPrice: number = 0;
  ingredientsPrice = 0;
  totalPrice = this.pizzaVariationPrice + this.ingredientsPrice;

  constructor(private pizzasService: PizzasService,) {
    console.log(this.pizza);
    
  }

  ngOnInit() {
    // console.log("🎁🎁🎁",this.pizza);
    // console.log("🎀", this.pizza.ingredients.length);
    if(this.pizza.ingredients.length == 0){
      this.ingredients = this.pizza.description;
    } else {
      this.pizza.ingredients.map((ingredient: any, index: number) => {
        if (index < 3) {
          this.ingredients += ingredient.name + ', ';
        } else if(index === this.pizza.ingredients.length - 1){
          this.ingredients +=  ingredient.name +" ..."
        } 
        else {
          // this.ingredients += ingredient.name;
        }
      });
    }

    

    this.findAvailablePizzas();

  }
  logAnything(){
    console.log("this.availablePizzas", this.availablePizzas);
    console.log("this.selectedSize ",this.selectedSize);
    console.log("this.selectedType ",this.selectedType);
    console.log(this.selectedIngredients);
    
  }
  findAvailablePizzas() {
    // console.log("SELECTEDTYPE", this.selectedType);
    
    this.availablePizzas = this.pizza.variations.filter((item: any) => {
      return (item.crust_type === this.selectedType)});

    // console.log("AVAILABLEPIZZAS", this.availablePizzas);
    //   console.log("00this.pizza.variations", this.pizza.variations);
      
    const availableSize =   this.availablePizzas.find((item: any) => {
      return item.is_available;}
    )
    if (availableSize) {
      // console.log("yeahhhhhhhhhhh");
      // console.log("🥶🦄🥶", availableSize);
      this.selectedSize = availableSize.size_cm;
    }
    // console.log("🪇",this.selectedSize);
    // console.log(45545);
    this.findVariationPrice()
  }

  findVariationPrice(){
    // console.log("this.selectedSize --> ",this.selectedSize);
    // console.log("this.selectedType --> ",this.selectedType);
    // console.log("this.availablePizzas --> ",this.availablePizzas);
    // console.log(this.availablePizzas.find((item: any) => item.size_cm == this.selectedSize).price);
    this.pizzaVariationPrice = parseFloat(this.availablePizzas.find((item: any) => item.size_cm == this.selectedSize).price);
    this.totalPrice = this.pizzaVariationPrice + this.ingredientsPrice;
  }

  changeSize(size: number){
    this.selectedSize = size;
    // console.log(size);
    this.findVariationPrice();
  }

  changeSelectedType(){
    // console.log(this.selectedType);
    this.findAvailablePizzas();
  }

  onIngredientChange(ingredientId: number): void {
    // console.log(ingredientId);
    // console.log(this.selectedIngredients.includes(ingredientId));
    
    if (!this.selectedIngredients.includes(ingredientId)) {
      this.selectedIngredients.push(ingredientId);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(id => id !== ingredientId);
    }
    // console.log("🧪this.selectedIngredients🧪", this.selectedIngredients);

    const ingredientPrice = this.selectedIngredients.reduce((total, id) => {
      // Находим ингредиент по id
      const ingredient = this.pizza.ingredients.find((item: any) => item.id === id);
      console.log(ingredient);
    
      // Если ингредиент найден, добавляем цену на основе выбранного размера
      if (ingredient) {
        if (this.selectedSize === 20) {
          return total + parseFloat(ingredient.price1);
        } else if (this.selectedSize === 30) {
          return total + parseFloat(ingredient.price2);
        } else {
          return total + parseFloat(ingredient.price3);
        }
      }
    
      return total;
    }, 0);
    
    // Логируем и сохраняем результаты
    // console.log("Общая цена выбранных ингредиентов:", ingredientPrice);
    this.ingredientsPrice = ingredientPrice;
    this.totalPrice = this.pizzaVariationPrice + this.ingredientsPrice;
    
  }
  mouseover(){
    // console.log("mouseover");
    this.showIngredients = false;
  }

  addToCart() {
    const selectedVariation = this.pizza.variations.find((v: { size_cm: number; crust_type: string; }) => 
      v.size_cm === this.selectedSize && v.crust_type === this.selectedType
    );
  
    if (!selectedVariation) {
      console.error("Variation not found!");
      return;
    }
  
    const cartItem = {
      // cart_id: 1,  // ID корзины (замени на актуальный)
      category: "pizzas",
      item_id: selectedVariation.id, // ID вариации пиццы
      quantity: 1,
      price: parseFloat(selectedVariation.price), // Цена за 1 шт
      subtotal: parseFloat(selectedVariation.price) * 1, // Итоговая сумма
      ingredients: this.selectedIngredients, // Выбранные ингредиенты
    };
  
    console.log("Cart Item:", cartItem);
    // Отправить cartItem в API
    this.pizzasService.addToCart(cartItem).subscribe(
      response => {
        console.log("Товар добавлен в корзину:", response);
      },
      error => {
        console.error("Ошибка при добавлении в корзину:", error);
      }
    );
  }
  
}
 