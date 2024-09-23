import { Component } from '@angular/core';
import { PomodoroComponent } from '../pomodoro/pomodoro.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [PomodoroComponent, RouterLink],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

}
