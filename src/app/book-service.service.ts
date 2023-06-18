import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private http: HttpClient) {}

  addbook(data: any) {
    return this.http.post(
      'https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub',
      data
    );
  }

  getBookDetails(id: string) {
    return this.http.get(
      `https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub/${id}`
    );
  }

  updateBook(id: string, data: any) {
    return this.http.put(
      `https://648c2b678620b8bae7ec5fab.mockapi.io/bookclub/${id}`,
      data
    );
  }
}
