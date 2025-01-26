import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  imports: [CommonModule, FormsModule  ],
  templateUrl: './pizza-item.component.html',
  styleUrl: './pizza-item.component.css'
})
export class PizzaItemComponent {
  @Input() pizza: any;
  ingredients: string = '';
  selectedSize = 30;
  selectedType = "тонкое"; //традиционное
  availablePizzas: any[] = [];
  selectedIngredients: number[] = [];
  showIngredients: boolean = false;

  constructor() {
    console.log(this.pizza);
    
  }

  ngOnInit() {
    console.log("🎁🎁🎁",this.pizza);
    console.log("🎀", this.pizza.ingredients.length);
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
    console.log("SELECTEDTYPE", this.selectedType);
    
    this.availablePizzas = this.pizza.variations.filter((item: any) => {
      return (item.crust_type === this.selectedType)});

    console.log("AVAILABLEPIZZAS", this.availablePizzas);
      console.log("00this.pizza.variations", this.pizza.variations);
      
    const availableSize =   this.availablePizzas.find((item: any) => {
      return item.is_available;}
    )
    if (availableSize) {
      console.log("yeahhhhhhhhhhh");
      console.log("🥶🦄🥶", availableSize);
      this.selectedSize = availableSize.size_cm;
    }
    console.log("🪇",this.selectedSize);
    console.log(45545);
    
  }
  changeSize(size: number){
    this.selectedSize = size;
    console.log(size);
  }

  changeSelectedType(){
    console.log(this.selectedType);
    this.findAvailablePizzas();
  }

  onIngredientChange(ingredientId: number): void {
    console.log(ingredientId);
    console.log(this.selectedIngredients.includes(ingredientId));
    
    if (!this.selectedIngredients.includes(ingredientId)) {
      this.selectedIngredients.push(ingredientId);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(id => id !== ingredientId);
    }
    console.log("🧪this.selectedIngredients🧪", this.selectedIngredients);
  }
  mouseover(){
    console.log("mouseover");
    // this.showIngredients = false;
  }
}
 