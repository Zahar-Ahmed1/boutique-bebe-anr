import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from '../../services/products.service';
import { Observable } from 'rxjs';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-productdetailles',
  imports: [
    CurrencyPipe,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './productdetailles.component.html',
  styleUrl: './productdetailles.component.css'
})
export class ProductdetaillesComponent implements OnInit{
  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.product$ = new Observable();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product$ = this.productsService.getProductById(id);
  }

}
