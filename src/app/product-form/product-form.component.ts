import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../models/product";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  // @ts-ignore
  product: Product = {};
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (typeof this.id === "string") {
      let productId = parseInt(this.id, 10);
      console.log(productId)
      if (productId) this.productService.getOne(productId).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  save(product: any) {
    if (this.id) {
      this.productService.updateProduct(this.id, this.product).subscribe();
    } else {
      console.log(JSON.stringify(product));
      this.productService.create(product).subscribe();
    }

    this.router.navigate(['/admin/product']).then(() => {
      // Reload the current page
      setTimeout(() => {

        window.location.reload()
      },800)
    });
  }

  deleteProduct() {
    if (confirm('Are you sure to delete this product ?')) {
      this.productService.delete(this.id).subscribe();
      this.router.navigate(['/admin/product']).then(() => {
        // Reload the current page
        setTimeout(() => {

          window.location.reload()
        },800)
      });
    }
  }

}
