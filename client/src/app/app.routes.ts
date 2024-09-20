import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GuestComponent } from './guest/guest.component';
import { authGuard } from './_guards/auth.guard';
import { noAuthGuard } from './_guards/no-auth.guard';

export const routes: Routes = [
    {
        path: 'guest', component: GuestComponent, canActivate: [authGuard],
    },
    {
        path: 'login', component: LoginPageComponent, canActivate: [authGuard],
    },
    {
        path: 'register', component: RegisterComponent, canActivate: [authGuard],
    },
    {
        path: 'home', component: HomepageComponent, canActivate: [noAuthGuard],
    },
    {
        path: '**', component: LoginPageComponent, canActivate: [authGuard],
    }
];
