import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToDoListService } from '../_services/to-do-list.service';
import { Tag } from '../_models/toDoList';
import { EndDateValidatorDirective } from '../_directives/end-date-validator.directive';
import { getTodaysDateString } from '../_helpers/date';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-add-list-form',
  standalone: true,
  imports: [FormsModule, InfoModalComponent, CommonModule, EndDateValidatorDirective],
  templateUrl: './add-list-form.component.html',
  styleUrl: './add-list-form.component.css'
})
export class AddListFormComponent {
  @Output() close = new EventEmitter<void>();
  
  private toDoListService = inject(ToDoListService);
  tags: [Tag, string][] = Object.entries(Tag).filter(keyValue => !isNaN(Number(keyValue[0]))).map(rawKeyValue => [Number(rawKeyValue[0]), rawKeyValue[1] as string]);
  public today = getTodaysDateString();

  public model = {
    title: '',
    description: '',
    tag: undefined,
    endDate: undefined,
  }

  closeModal() {
    this.close.emit();
  }

  async submit(form: NgForm) {
    if(!form.valid) {
      form.control.markAllAsTouched();
      return;
    } 
    await this.toDoListService.addToDoList(this.model);
    this.closeModal();
  }

}
