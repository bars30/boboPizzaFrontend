import { Component } from '@angular/core';
import { PizzasService } from '../../services/pizzas/pizzas.service';
import { ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from '../../compoenents/toolbar/toolbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { PizzaItemComponent } from '../../compoenents/pizza-item/pizza-item.component';
import { ProductItemComponent } from '../../compoenents/product-item/product-item.component';
import { SheetComponent } from '../../compoenents/sheet/sheet.component';
import { ToastComponent } from '../../compoenents/toast/toast.component';
@Component({
  selector: 'app-home',
  imports: [ToolbarComponent, NgxSkeletonLoaderModule, CommonModule,
    PizzaItemComponent, ProductItemComponent, SheetComponent, ToastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showInfoPopup: boolean = false;
  pizzas: any[] = [];
  drinks: any[] = [];
  desserts: any[] = [];
  breakfasts: any[] = [];
  snacks: any[] = [];
  showLoader: boolean = true;
  showToast: boolean = false;
  toasts: { id: number; message: string; type: string }[] = [];

  showCategory: { pizza: boolean; drinks: boolean, desserts: boolean, breakfasts: boolean, snacks: boolean } = {
    pizza: true,
    drinks: false,
    desserts: false,
    breakfasts: false,
    snacks: false
  };
  isSheetOpen = false;

  constructor(private pizzasService: PizzasService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // this.category = params['id'] || 'default'; // default - եթե id չկա
      console.log("📌 Ընտրված կատեգորիա:", params['id']);
      if (params['id'] === undefined) {
        console.log("UNDEFINEEEEEEEEEEEED");
        this.changeCategory('pizza');  
      } else {
        this.changeCategory(params['id']);
      }
    });
  }
  
  ngOnInit(): void {
    this.pizzasService.getPizzas().subscribe(
      (data) => {
        this.pizzas = data;
        console.log("👏🏻👏🏻👏🏻", this.pizzas);
        if (this.showCategory.pizza) {
          this.showLoader = false; 
        }
      },
      (error) => {
        console.error('Ошибка при загрузке пицц:', error);
      }
    );
    this.pizzasService.getDrinks().subscribe(
      (data) => {
        this.drinks = data;
        console.log("👏🏻👏🏻👏🏻", data);
        if (this.showCategory.drinks) {
          this.showLoader = false; 
        }
      },
      (error) => {
        console.error('Ошибка при загрузке drinks:', error);
      }
    );
    this.pizzasService.getDesserts().subscribe(
      (data) => {
        this.desserts = data;
        console.log("👏🏻👏🏻👏🏻🥐🥐🥐", data);
        if (this.showCategory.desserts) {
          this.showLoader = false; 
        }
      },
      (error) => {
        console.error('Ошибка при загрузке desserts:', error);
      }
    );
    this.pizzasService.getBreakfasts().subscribe(
      (data) => {
        this.breakfasts = data;
        console.log("👏🏻👏🏻👏🏻🥐🥐🥐", data);
        if (this.showCategory.breakfasts) {
          this.showLoader = false; 
        }
      },
      (error) => {
        console.error('Ошибка при загрузке desserts:', error);
      }
    );
    this.pizzasService.getSnacks().subscribe(
      (data) => {
        this.snacks = data;
        console.log("👏🏻👏🏻👏🏻🥐🥐🥐", data);
        if (this.showCategory.snacks) {
          this.showLoader = false; 
        }
      },
      (error) => {
        console.error('Ошибка при загрузке desserts:', error);
      }
    );
  }


  openSheet() {
    this.isSheetOpen = true;
    console.log('open');
    
  }
  showToastMessage() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  closeSheet() {
    this.isSheetOpen = false;
  }
  changeCategory(value: any){
    console.log(value);
  
    for (let key in this.showCategory) {
      if (this.showCategory.hasOwnProperty(key)) {
        this.showCategory[key as keyof typeof this.showCategory] = false;
      }
    }
    this.showCategory[value as keyof typeof this.showCategory] = true;
    console.log("🍄‍🟫", this.showCategory);
    
  }
}
