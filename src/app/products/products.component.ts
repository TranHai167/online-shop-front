import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {map, Observable} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import {ShoppingCart} from "../models/shopping-cart";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  // @ts-ignore
  category: string;
  // @ts-ignore
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(
      (cart) => {
        for (let item of cart.items) {
          this.products.push(item.products);
        }
      }
    )

    this.populateProducts();
  }

  private populateProducts() {
    this.route.queryParams
      .subscribe(
        params => {
          // @ts-ignore
          this.category = params.category;
          this.applyFilter();
        })
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
