import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GuestComponent } from './guest/guest.component';
import { authGuard } from './_guards/auth.guard';
import { noAuthGuard } from './_guards/no-auth.guard';
import { ListViewComponent } from './list-view/list-view.component';
import { TodoListComponent } from './todo-list/todo-list.component';

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
        path: 'todolist', component: HomepageComponent, canActivate: [noAuthGuard],
        children: [
            {
                path: 'all', component: TodoListComponent
            },
            {
                path: ':id', component: ListViewComponent
            },
        ]
    },
    {
        path: '**', component: LoginPageComponent, canActivate: [authGuard],
    }
];
