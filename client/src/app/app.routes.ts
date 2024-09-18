import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: HomepageComponent
    },
    {
        path: '**', component: LoginPageComponent
    }
];
