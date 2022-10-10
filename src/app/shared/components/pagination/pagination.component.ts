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
  pages: number[] = [];
  currentPage!: number;

  @Output() changePageEvent = new EventEmitter<{ limit: number, offset: number }>();

  ngOnInit() {
    const pagesCount = Math.ceil(this.totalCount / this.limit);
    this.currentPage = 1 + this.offset / this.limit;

    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }
  };

  swapPage(direction: -1 | 1) {
    const offset = this.offset + this.limit * direction;
    this.changePageEvent.emit({limit: this.limit, offset});
  };

  changePage(page: number) {
    if (page === this.currentPage) {
      return;
    }
    const offset = this.limit * (page - 1);
    this.changePageEvent.emit({limit: this.limit, offset});
  };
}
