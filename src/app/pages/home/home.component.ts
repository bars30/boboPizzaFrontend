import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { environment } from '../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupInfoComponent } from '../../components/popup-info/popup-info.component';
import { CommonModule, NgIf } from '@angular/common';
import { PizzasService } from '../../services/pizzas/pizzas.service';
import { PizzaItemComponent } from '../../components/pizza-item/pizza-item.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopupInfoComponent, NgIf, PizzaItemComponent,
     CommonModule, ProductItemComponent, ToolbarComponent,
     NgxSkeletonLoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showInfoPopup: boolean = false;
  pizzas: any[] = [];
  drinks: any[] = [];
  showLoader: boolean = true;

  showCategory: { pizza: boolean; drinks: boolean } = {
    pizza: true,
    drinks: false
  };

  constructor(private pizzasService: PizzasService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // this.category = params['id'] || 'default'; // default - եթե id չկա
      console.log("📌 Ընտրված կատեգորիա:", params['id']);
      this.changeCategory(params['id']);
    });
  }
  ngOnInit(): void {
    this.pizzasService.getPizzas().subscribe(
      (data) => {
        this.pizzas = data;
        console.log("👏🏻👏🏻👏🏻", this.pizzas);
        this.showLoader = false;
      },
      (error) => {
        console.error('Ошибка при загрузке пицц:', error);
      }
    );
    this.pizzasService.getDrinks().subscribe(
      (data) => {
        this.drinks = data;
        console.log("👏🏻👏🏻👏🏻", data);
        
      },
      (error) => {
        console.error('Ошибка при загрузке drinks:', error);
      }
    );
  }
  logout(){
    // console.log(56);


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
