import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message;

  constructor(public http: HttpClient) {}

  async post() {
    const response = this.http.post('http://localhost:4201/users', {query: 'SELECT * FROM Persons'}).subscribe(res => {
      console.log('Response', res);
      this.message = res.valueOf();
    });
    console.log(this.message);
  }
}
