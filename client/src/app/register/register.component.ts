import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);
  model: any = {};

  register() {
    this.accountService.register(this.model)?.subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['home']);
      },
      error: error => console.log(error),
    })
  }

}
