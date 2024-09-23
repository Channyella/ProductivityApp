import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  accountService = inject(AccountService);
  private router = inject(Router);
  http = inject(HttpClient);
  title = 'Pomo-Doer';
  users: any;
  model: any = {};
  loggedIn = true;
  userName = this.getName();

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['login']);
  }

  private getName()
  {
    const user = this.accountService.currentUser();
    return user?.firstName;
  }

}
