import { Component, signal } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [],
  templateUrl: './product-search.html',
  styleUrl: './product-search.scss',
})
export class ProductSearch {
  readonly query = signal('');

  readonly search = outputFromObservable(
    toObservable(this.query).pipe(
      map((q) => q.trim()),
      debounceTime(300),
      distinctUntilChanged(),
    ),
  );

  handleTextSearch(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
