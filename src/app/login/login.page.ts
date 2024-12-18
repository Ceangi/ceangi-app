import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private userService: UserService, private toastController: ToastController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("ini");
    this.user = this.userService.getUser();
    if (this.user?.accessToken) {
      this.router.navigate(['/profile']);
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }


  onSubmit() {
    if (this.email && this.password) {
      this.authService.login({ email: this.email, password: this.password }).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.presentToast('Login eseguito con successo', 'success');
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response)); // Save user object as a string
          this.router.navigate(['/']); // Redirect to the home page after login
        },
        (error) => {
          console.error('Login error:', error);
          this.presentToast('Errore ' + error, 'danger');
        }
      );
    } else {
      this.errorMessage = 'Per favore, compila tutti i campi.';
    }
  }
}
