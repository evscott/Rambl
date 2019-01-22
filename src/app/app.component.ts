import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public http: HttpClient) {}

  post() {
    const response = this.http.post('https://trippy123.herokuapp.com/', {username: 'Eliot', password: 'Scott'}).subscribe(next => console.log(next));
  }
}
