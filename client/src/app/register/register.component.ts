import { Component, inject } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PasswordStrengthDirective } from '../_directives/password-strength.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, PasswordStrengthDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  public model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: ''
  };

  register(form: NgForm) {
    if (form.valid && this.model.password === this.model.verifyPassword){ 
      this.accountService.register(this.model)?.subscribe({
        next: response => {
          console.log(response);
          this.router.navigate(['todolist', 'all']);
        },
        error: error => alert('Email is already taken. Please login or register a new email.'),
      })
    }
  }

}
