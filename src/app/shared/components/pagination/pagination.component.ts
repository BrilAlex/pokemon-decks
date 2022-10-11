import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "pd-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: [
    "./pagination.component.css",
  ],
})
export class PaginationComponent implements OnInit {
  @Input() totalCount!: number;
  @Input() limit!: number;
  @Input() offset!: number;

  @Output() changePageEvent = new EventEmitter<{ limit: number, offset: number }>();

  currentPage!: number;
  pagesCount!: number;
  pages: number[] = [];

  ngOnInit() {
    this.pagesCount = Math.ceil(this.totalCount / this.limit);
    this.currentPage = 1 + this.offset / this.limit;
    this.pages = this.getPages(this.currentPage, this.pagesCount);
  };

  getPages(currentPage: number, pagesCount: number): number[] {
    if (pagesCount <= 7) {
      return [...Array(pagesCount).keys()].map(p => ++p);
    }

    if (currentPage >= 5) {
      if (currentPage >= pagesCount - 4) {
        return [1, -1, pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
      } else {
        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, pagesCount];
      }
    }

    return [1, 2, 3, 4, 5, -1, pagesCount];
  };

  swapPage(direction: -1 | 1) {
    const offset = this.offset + this.limit * direction;
    this.changePageEvent.emit({limit: this.limit, offset});
  };

  changePage(page: number) {
    if (page === this.currentPage || page === -1) {
      return;
    }
    const offset = this.limit * (page - 1);
    this.changePageEvent.emit({limit: this.limit, offset});
  };
}
