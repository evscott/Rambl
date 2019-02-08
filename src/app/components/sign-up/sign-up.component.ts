import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(): void {
    this.authService.signUp(this.user.username, this.user.password);
  }
}
