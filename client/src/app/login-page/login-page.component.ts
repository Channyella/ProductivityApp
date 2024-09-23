import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  model: any = {};

  login(form: NgForm) {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigate(['todolist', 'all']);
      },
      error: error => alert('Email or password is incorrect.')
      }
    )
  }
}
