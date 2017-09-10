import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CookieService } from 'ngx-cookie';
import { Book, NewBook, Catalog, NewCatalog, AutoData } from './'
import { Copy } from './../../ejemplares';

@Injectable()
export class LibrosService {
  baseUrl: string;
  headers: Headers;

  constructor(private http: Http, private cookieService: CookieService) {
    this.baseUrl = "https://bibliotecafiaues.herokuapp.com";
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.get('token') });
  }

  create(newBook: NewBook): Observable<Book> {
    let url = this.baseUrl + '/books';
    let q = JSON.stringify({
      book: {
        isbn: newBook.isbn,
        title: newBook.title,
        authorName: newBook.authorName,
        edition: newBook.edition,
        year: newBook.year,
        country: newBook.country
      },
      authors: newBook.authors,
      newAuthors: newBook.newAuthors,
      publisher: newBook.publisher
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        let book = new Book();

        book.id = r['id'];
        book.isbn = newBook.isbn;
        book.title = newBook.title;
        book.edition = newBook.edition;
        book.author = newBook.authorName;
        book.publisher = newBook.publisher.name;
        book.catalogued = false;

        return book;
      }
    );
  }

  setCatalog(id: number, newCatalog: NewCatalog): Observable<string> {
    let url = this.baseUrl + '/books/' + id + '/setcatalog';
    let q = JSON.stringify({
      subjects: newCatalog.subjects,
      newSubjects: newCatalog.newSubjects,
      category: newCatalog.category,
      authorCode: newCatalog.authorCode,
      image: newCatalog.image
    });

    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        return r['message'];
      }
    );
  }

  finishCatalog(id: number): Observable<string> {
    let url = this.baseUrl + '/books/' + id + '/finishcatalog';
    let q = {};

    return this.http.post(url, q, { headers: this.headers }).map(
      (r: Response) => {
        return r['message'];
      }
    );
  }

  getAll(): Observable<Book[]> {
    let url = this.baseUrl + '/books';

    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        let books = new Array<Book>();

        r.json().forEach(function(item){
          let book = new Book;

          book.id = item['id'];
          book.isbn = item['isbn'];
          book.title = item['title'];
          book.edition = item['edition'];
          book.author = item['authorName'];
          book.publisher = item['publisherName'];
          book.catalogued = item['catalogued'];

          books.push(book);
        });

        return books;
      }
    );
  }

  get(id: number): Observable<Book> {
    let url = this.baseUrl + '/books/' + id;

    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        let book = new Book;
        let rb = r['book'];
        let rc = r['Copies'];

        book.id = rb['id'];
        book.isbn = rb['isbn'];
        book.title = rb['title'];
        book.edition = rb['edition'];
        book.publisher = rb['publisherName'];
        book.country = rb['country'];
        book.year = rb['year'];
        book.catalogued = rb['catalogued'];
        book.authors = [];
        rb['Authors'].json().forEach(function(author){
          book.authors.push(author['name']);
        });

        let catalog = new Catalog;
        catalog.subjects = rb['Subjects'];
        catalog.category = rb['category'];
        catalog.authorCode = rb['authorCode'];
        catalog.image = rb['image'];
        book.catalog = catalog;

        let copies = new Array<Copy>();
        rc.json().forEach(function(item){
          let copy = new Copy;
          copy.id = item['id'];
          copy.barcode = item['barcode'];
          copy.state = item['state'];
          copies.push(copy);
        });
        book.copies = copies;

        return book;
      }
    );
  }

  getAutoBook(): Observable<any> {
    let url = this.baseUrl + '/books/authorspublishers';

    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        let authors = new Array<AutoData>();
        let publishers = new Array<AutoData>();
        let ra = r['authors'];
        let rp = r['publishers'];

        ra.json().forEach(function(item){
          let author = new AutoData;

          author.id = item['id'];
          author.name = item['name'];

          authors.push(author);
        });

        rp.json().forEach(function(item){
          let publisher = new AutoData;

          publisher.id = item['id'];
          publisher.name = item['name'];

          publishers.push(publisher);
        });

        return {authors: authors, publishers: publishers};
      }
    );
  }

  getAutoCatalog(): Observable<AutoData[]> {
    let url = this.baseUrl + '/books/subjects';

    return this.http.get(url, { headers: this.headers }).map(
      (r: Response) => {
        let subjects = new Array<AutoData>();
        let rs = r['subjects'];

        rs.json().forEach(function(item){
          let subject = new AutoData;

          subject.id = item['id'];
          subject.name = item['name'];

          subjects.push(subject);
        });

        return subjects;
      }
    );
  }
}
