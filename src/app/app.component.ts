import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { ImagesService } from './service/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Iron shop';

  selectedChapter: any;
  selectedProducts: any;
  public chapters;
  public order = {};

  constructor(private productService: ProductService, private imageService: ImagesService) {
  }


  ngOnInit(): void {
    this.chapters = this.productService.getChapters();
    for (let chapter of this.chapters) {
      this.order[chapter.id] = {};
    }
  }

  public onSelectChapter(chapter) {
    this.selectedChapter = chapter;
    this.selectedProducts = this.productService.getProducts(chapter.id);
  }

  public decreaseProduct(productId, index) {
    if (this.order[this.selectedChapter.id][productId] && this.order[this.selectedChapter.id][productId] > 1) {
      this.order[this.selectedChapter.id][productId]--;
    } else {
      this.order[this.selectedChapter.id][productId] = null;
    }
  }

  public increaseProduct(productId, index) {
    if (this.order[this.selectedChapter.id][productId]) {
      this.order[this.selectedChapter.id][productId]++;
    } else {
      this.order[this.selectedChapter.id][productId] = 1;
    }
  }
}
