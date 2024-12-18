import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  user!: User;

  constructor(private userService: UserService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("ini");
    this.user = this.userService.getUser();
    if (this.user?.accessToken) {
      this.router.navigate(['/profile']);
    }
   }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password }).subscribe(
        (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response)); // Save user object as a string
          this.router.navigate(['/']); // Redirect to the home page after login
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Credenziali non valide. Riprova.';
        }
      );
    } else {
      this.errorMessage = 'Per favore, compila tutti i campi.';
    }
  }
}
