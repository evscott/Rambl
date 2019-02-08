import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.logIn(this.user.username, this.user.password);
  }
}
