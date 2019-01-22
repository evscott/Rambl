import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) {}

  post() {
    console.log('URL is...' + this.baseUrl);
    const response = this.http.post(this.baseUrl, {username: 'Eliot', password: 'Scott'}).subscribe(next => console.log(next));
  }
}
