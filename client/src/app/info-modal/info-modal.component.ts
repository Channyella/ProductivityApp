import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent {
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
