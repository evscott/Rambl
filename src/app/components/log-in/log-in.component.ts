import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();

  constructor() {}

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    console.log(payload);
  }
}
