import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // ✅ Ավելացրեք RouterModule
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() changedProductCategory = new EventEmitter<string>();
  selectedCategory: string = 'pizza';

  // constructor(private router: Router) {}
  constructor(private router: Router,
      private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        // this.category = params['id'] || 'default'; // default - եթե id չկա
        console.log("📌2 Ընտրված կատեգորիա:", params['id']);
        if (params['id'] === undefined) {
          this.selectedCategory = 'pizza';
        } else {
          this.selectedCategory = params['id'];
        }
      });
    }

  changeCategory(value: string) {
    console.log("🥐", value);
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
