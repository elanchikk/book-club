import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  @Input() book: book = {
    id: '',
    title: '',
    author: '',
    category: '',
    status: '',
    date: ''
  };
  @Output() idToDelete: EventEmitter<any> = new EventEmitter();
  @Output() idToEdit: EventEmitter<any> = new EventEmitter();
  @Output() idToToggle: EventEmitter<any> = new EventEmitter();

  onDelete(id: string) {
    this.idToDelete.emit(id);
  }

  onEdit(id: string) {
    this.router.navigate([`./edit-book/${id}`], {
      relativeTo: this.route,
    });
  }

  gotoBookInfo(id: string) {
    this.router.navigate([`./info/${id}`], {
      relativeTo: this.route,
    });
  }
}
