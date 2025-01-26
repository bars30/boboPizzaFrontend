import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { PopupInfoComponent } from '../../components/popup-info/popup-info.component';
import { CommonModule, NgIf } from '@angular/common';
import { PizzasService } from '../../services/pizzas/pizzas.service';
import { PizzaItemComponent } from '../../components/pizza-item/pizza-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopupInfoComponent, NgIf, PizzaItemComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showInfoPopup: boolean = false;
  pizzas: any[] = [];

  constructor(private pizzasService: PizzasService) {}

  ngOnInit(): void {
    this.pizzasService.getPizzas().subscribe(
      (data) => {
        this.pizzas = data;
        console.log("👏🏻👏🏻👏🏻", this.pizzas);
        
      },
      (error) => {
        console.error('Ошибка при загрузке пицц:', error);
      }
    );
  }
  logout(){
    // console.log(56);


  }
}
