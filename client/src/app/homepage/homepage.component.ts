import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PomodoroComponent } from "../pomodoro/pomodoro.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavComponent, PomodoroComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
