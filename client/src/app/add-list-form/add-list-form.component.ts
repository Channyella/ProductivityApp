import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListService } from '../_services/to-do-list.service';
import { Tag } from '../_models/toDoList';
import { EndDateValidatorDirective } from '../_directives/end-date-validator.directive';
import { getTodaysDateString } from '../_helpers/date';

@Component({
  selector: 'app-add-list-form',
  standalone: true,
  imports: [FormsModule, CommonModule, EndDateValidatorDirective],
  templateUrl: './add-list-form.component.html',
  styleUrl: './add-list-form.component.css'
})
export class AddListFormComponent {
  private toDoListService = inject(ToDoListService);
  tags = Object.keys(Tag).filter(tag => isNaN(Number(tag))); // Convert num to str
  selectedTag: Tag | undefined;
  public today = getTodaysDateString();

  onSelectTag(tag: string) {
    this.selectedTag = Tag[tag as keyof typeof Tag];  // Convert string to enum
  }

  public model = {
    title: '',
    description: '',
    tag: undefined,
    endDate: undefined,
  }

}
