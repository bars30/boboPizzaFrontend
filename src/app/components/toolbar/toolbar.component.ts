import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule], // ✅ Ավելացրեք RouterModule
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() changedProductCategory = new EventEmitter<string>();

  constructor(private router: Router) {}

  changeCategory(value: string) {
    console.log("🥐", value);
    this.router.navigate(['/', value]).then(success => {
      if (success) {
        console.log("✅ URL SUCCESS:", value);
      } else {
        console.error("❌ URL CHANGE FAILED");
      }
    });
    console.log(3);
    
    this.changedProductCategory.emit(value);
    console.log(4);
    
    this.router.navigate(['/', value]).then(success => {
      if (success) {
        console.log("✅ URL SUCCESS:", value);
      } else {
        console.error("❌ URL CHANGE FAILED");
      }
    });
  }
}
