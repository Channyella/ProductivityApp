import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ok-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ok-modal.component.html',
  styleUrl: './ok-modal.component.css'
})
export class OkModalComponent {
  @Input() title: string = 'Default Title';
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Input() formModal: boolean = false;

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if(this.formModal) {
      this.submit.emit();
    } else {
      this.closeModal();
    }
  }

}
