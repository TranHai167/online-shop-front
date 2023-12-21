import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products/getAll");
  }

  create(product: Product) {
    return this.httpClient.post("http://localhost:8080/api/products/create", product);
  }

  getOne(productId: number) {
    const params = new HttpParams()
      .set('productId', productId)

    return this.httpClient.get<Product>("http://localhost:8080/api/products/get", {params: params})
  }

  updateProduct(productId: number, product: Product) {
    let request = {
      productId: productId,
      product: product
    }

    return this.httpClient.put("http://localhost:8080/api/products/update", request);
  }

  delete(productId: number) {
    return this.httpClient.delete(`http://localhost:8080/api/products/delete/${productId}`);
  }
}
