import { Component, computed, signal } from '@angular/core';
import { ProductSearch } from './product-search/product-search';
import { ProductItem } from './components/product-item/product-item';

@Component({
  selector: 'app-products',
  imports: [ProductSearch, ProductItem],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly products = signal<{ name: string }[]>([{ name: 'tejföl' }, { name: 'répa' }]);
  readonly searchTerm = signal('');

  readonly filteredProducts = computed(() => {
    console.log('ran');
    const term = normalize(this.searchTerm());
    if (!term) return this.products();
    return this.products().filter((p) => normalize(p.name).includes(term));
  });
  addProduct() {
    const products = this.products();
    this.products.set([...products, { name: 'teszt' }]);
  }
}

function normalize(s: string): string {
  return s
    .toLocaleLowerCase('hu')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}
