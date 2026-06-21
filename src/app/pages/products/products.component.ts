import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { fadeIn, fadeInUp, staggerList } from '../../animations/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeIn, fadeInUp, staggerList],
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  allProducts: Product[] = [];
  filteredProducts = signal<Product[]>([]);
  searchQuery = '';
  selectedCategory = 'all';
  sortBy = 'featured';
  priceRange = signal<[number, number]>([0, 500]);
  maxPrice = 500;
  showFilters = false;
  viewMode: 'grid' | 'list' = 'grid';

  categories = this.productService.categories();
  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'discount', label: 'Biggest Discount' },
  ];

  currentPage = 1;
  pageSize = 12;
  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.pageSize));

  paginatedProducts = computed(() => {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.allProducts = this.productService.products();
    this.maxPrice = Math.max(...this.allProducts.map(p => p.originalPrice));
    this.priceRange.set([0, this.maxPrice]);

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    filtered = filtered.filter(
      p => p.price >= this.priceRange()[0] && p.price <= this.priceRange()[1]
    );

    switch (this.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
    }

    this.filteredProducts.set(filtered);
    this.currentPage = 1;
  }

  setCategory(cat: string): void {
    this.selectedCategory = cat;
    this.router.navigate([], {
      queryParams: { category: cat === 'all' ? null : cat },
      queryParamsHandling: 'merge',
    });
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.priceRange.set([0, this.maxPrice]);
    this.router.navigate([], { queryParams: {} });
    this.applyFilters();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
}