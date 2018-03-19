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
      this.order[chapter.id] = this.productService.getProducts(chapter.id).map(p=> ({id: p.id, count: null}));
    }
  }

  public onSelectChapter(chapter) {
    this.selectedChapter = chapter;
    this.selectedProducts = this.productService.getProducts(chapter.id);
  }

  public decreaseProduct(productId) {
    const orderedProduct = this.order[this.selectedChapter.id].find(op => op.id == productId);
    if (orderedProduct.count > 1) {
      orderedProduct.count--;
    } else {
      orderedProduct.count = null;
    }
  }

  public increaseProduct(productId) {
    const orderedProduct = this.order[this.selectedChapter.id].find(op => op.id == productId);
    if (orderedProduct.count) {
      orderedProduct.count++;
    } else {
      orderedProduct.count = 1;
    }
  }

  public showOrder(modal) {
    modal.style.display = "block";
  }

  public confirm(modal) {
    modal.style.display = "none";
  }

  public close(modal) {
    modal.style.display = "none";
  }

  public getKeys(object) {
   return Object.keys(object)
  }

  public getOrderedProducts(chapterId) {
    return this.order[chapterId].filter(orderedProduct => orderedProduct.count)
  }

  public getProduct(chapterId, productId) {
    return this.productService.getProducts(chapterId).find(p => p.id === productId);
  }
}
