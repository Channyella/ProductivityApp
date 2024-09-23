import { Component, inject, OnInit } from '@angular/core';
import { ToDoListService } from '../_services/to-do-list.service';
import { tagMap, ToDoList } from '../_models/toDoList';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { AddListFormComponent } from '../add-list-form/add-list-form.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AddListFormComponent, BsDropdownModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  private toDoListService = inject(ToDoListService);
  protected toDoListsPromise: Promise<ToDoList[]> = this.toDoListService.getToDoLists();
  public isModalOpen = false;
  protected tagMap = tagMap;

  trackByToDoListId(index: number, toDoList: any): number {
    return toDoList.id;
}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.toDoListsPromise = this.toDoListService.getToDoLists();
  }

  async deleteToDoList(toDoListId: number){
    await this.toDoListService.deleteToDoList(toDoListId);
    this.toDoListsPromise = this.toDoListService.getToDoLists();
  }
}
