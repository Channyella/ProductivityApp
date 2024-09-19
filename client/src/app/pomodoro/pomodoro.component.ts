import { formatNumber, NgClass } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent implements AfterViewInit {
  public pomCount: number = 0;
  public pomodoroUntilLongBreak: number = 4;
  public pomodoroTimer: number = 1500; // 25 minutes
  public shortBreakTimer: number = 300; // 5 minutes
  public longBreakTimer: number = 900; // 15 minutes
  public timerValue: number = this.pomodoroTimer;
  public multiplierValue: number = 360 / this.timerValue;
  public progressInterval: any;
  public pomodoroType: string = 'POMODORO';
  
  @ViewChild('pomodoroCount') pomodoroCount!: ElementRef<HTMLDivElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLHeadingElement>;
  @ViewChild('progressBarNumber') progressBarNumber!: ElementRef<HTMLParagraphElement>;
  @ViewChild('longBreakBtn') longBreakBtn!: ElementRef<HTMLButtonElement>;

  // Audio files
  private pomodoroSound = new Audio('assets/pomodoro_sounds/pomodoro_over.m4a');
  private shortBreakSound = new Audio('assets/pomodoro_sounds/short_break.m4a');
  private longBreakSound = new Audio('assets/pomodoro_sounds/long_break.m4a');

  ngAfterViewInit() {
  }

  startTimer() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progressInterval = setInterval(() => {
      this.timerValue--;
      console.log(this.timerValue);
      this.setProgressInfo();

      if (this.timerValue === 0) {
        clearInterval(this.progressInterval);
        this.pomodoroSound.play();
        this.pomCount++;
        this.updatePomCount();
        if (this.pomCount % this.pomodoroUntilLongBreak === 0) {
          this.showLongBreakBtn();
          this.longBreakSound.play();
        } else {
          this.shortBreakSound.play();
        }
        this.setTimeType(this.pomodoroType);
      }
    }, 1000);
  }

  updatePomCount() {
    this.pomodoroCount.nativeElement.style.display = 'block';
    this.pomodoroCount.nativeElement.style.color = 'white';
    this.pomodoroCount.nativeElement.style.fontSize = '30px';
    this.pomodoroCount.nativeElement.textContent = `Pomodoro Count ${this.pomCount}`;
  }

  showLongBreakBtn() {
    this.longBreakBtn.nativeElement.style.display = "flex";
  }

  setProgressInfo() {
    this.progressBarNumber.nativeElement.textContent = `${this.NumberToString(this.timerValue)}`
    const progressValue = this.timerValue * this.multiplierValue;
    this.progressBar.nativeElement.style.background = `conic-gradient(#61946f ${progressValue}deg, #3f6644 0deg)`;
  }

  NumberToString(numberStr : number) {
    const minutes = Math.trunc(numberStr / 60).toString().padStart(2, "0");
    const seconds = Math.trunc(numberStr % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  } 

  pauseTimer() {
    clearInterval(this.progressInterval);
  }

  setTimeType(type: string) {
    this.pomodoroType = type;
    this.resetTimer();
  }

  resetTimer() {
    clearInterval(this.progressInterval);
    this.timerValue =
      this.pomodoroType === "POMODORO"
        ? this.pomodoroTimer
        : this.pomodoroType === "SHORTBREAK"
        ? this.shortBreakTimer
        : this.longBreakTimer;
    this.multiplierValue = 360 / this.timerValue;
    this.setProgressInfo();
  }

}