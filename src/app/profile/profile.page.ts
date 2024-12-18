import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service'; // Adjust the path as necessary
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any; // Store user data
  loading: boolean = true; // To handle loading state

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    localStorage.removeItem('user'); // Adjust the key name as necessary
    this.authService.logout(); // Handle logout
    this.router.navigate(['/login']); // Redirect to login page
  }
}
