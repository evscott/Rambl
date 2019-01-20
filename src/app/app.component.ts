import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message;
  private input = '';

  constructor(public http: HttpClient) {}

  private onKey(event: any) {
    this.input = event.target.value;
  }

  private async post() {

    //Input should be == 'SELECT * FROM Persons'
      if(this.input !== 'SELECT * FROM Persons') return;
    const response = this.http.post('http://localhost:4201/users', {query: this.input}).subscribe(res => {
      console.log('Response', res);
      this.message = res.valueOf();
    });

    console.log(this.message);
    this.input = '';
  }
}
