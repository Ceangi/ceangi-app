import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    // Method to get the user from localStorage
    getUser(): any {
        const userData = localStorage.getItem('user');
        if (userData) {
            return JSON.parse(userData); // Parse and return the user data
        }
        return null; // Return null if no user data is found
    }

    // Method to get the roles from the user
    getRoles(): string[] {
        const user = this.getUser();
        if (user && user.roles) {
            return user.roles; // Return the roles array
        }
        return []; // Return an empty array if no roles are found
    }

    isModeratorOrAdmin(): boolean {
        const roles = this.getRoles();
        return roles.includes('ROLE_MODERATOR') || roles.includes('ROLE_ADMIN'); // Check if the roles contain either "ROLE_MODERATOR" or "ROLE_ADMIN"
    }

    // Optionally, you can also add a method to save the user to localStorage
    saveUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user)); // Save user data as a string
    }

    // Optionally, you can add a method to remove the user from localStorage
    removeUser(): void {
        localStorage.removeItem('user'); // Remove the user data from localStorage
    }
}
