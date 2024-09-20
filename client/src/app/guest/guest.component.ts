import { Component } from '@angular/core';
import { PomodoroComponent } from '../pomodoro/pomodoro.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [PomodoroComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

}
