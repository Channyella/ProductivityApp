import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToDoListService } from '../_services/to-do-list.service';
import { CreateToDoListParams, Tag, tagPairs, ToDoList, UpdateToDoListParams } from '../_models/toDoList';
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
export class AddListFormComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() list: ToDoList | undefined;
  
  private toDoListService = inject(ToDoListService);
  tags: [Tag, string][] = tagPairs;
  public today = getTodaysDateString();

  // create and update are nearly the same; this will require the title to be
  // defined, but that is still ok for update.
  public model: CreateToDoListParams = {
    title: '',
    description: '',
    tag: undefined,
    endDate: undefined,
  }

  ngOnInit(): void {
    if(this.list) {
      this.model = {
        title: this.list.title,
        description: this.list.description,
        tag: this.list.tag,
        endDate: this.list.endDate,
      }
    }
  }

  closeModal() {
    this.close.emit();
  }

  async submit(form: NgForm) {
    if(!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    if(this.list) {
      await this.toDoListService.updateToDoList(this.list.id, this.model);
    } else {
      await this.toDoListService.addToDoList(this.model);
    }
    this.closeModal();
  }

}
