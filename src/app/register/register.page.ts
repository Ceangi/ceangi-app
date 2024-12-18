import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { 
    console.log("Init register")
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Le password non coincidono. Riprova.';
      return;
    }

    if (this.name && this.surname && this.email && this.password) {
      const user = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
      };

      this.authService.register(user).subscribe(
        (response) => {
          console.log('Registrazione avvenuta con successo:', response);
          this.router.navigate(['/login']); // Reindirizza alla pagina di login
        },
        (error) => {
          console.error('Errore durante la registrazione:', error);
          this.errorMessage = 'Si è verificato un errore. Riprova più tardi.';
        }
      );
    } else {
      this.errorMessage = 'Compila tutti i campi obbligatori.';
    }
  }
}
