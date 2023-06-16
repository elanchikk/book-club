import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})



export class BookServiceService {

  constructor(private http: HttpClient) {}

  addbook(data: any) {
    return this.http.post(
      'https://648a951317f1536d65e94e70.mockapi.io/book',
      data
    );
  }

  getBookDetail(id: string) {
    return this.http.get(
      `https://648a951317f1536d65e94e70.mockapi.io/book/${id}`
    );
  }

  updateBook(id: string, data: any) {
    return this.http.put(
      `https://648a951317f1536d65e94e70.mockapi.io/book/${id}`,
      data
    );
  }
}
