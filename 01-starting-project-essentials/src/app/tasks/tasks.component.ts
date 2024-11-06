import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { NewTask } from './task/task.model';
import { CardsComponent } from "../shared/cards/cards.component";
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent, CardsComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent {
  @Input({required:true}) name ! : string;
  @Input({required:true}) userId ! : string;

  constructor(private taskService:TasksService){}
  
  isAddingTask = false;

  
   

  get selectedUserTasks(){
    return this.taskService.getUserTask(this.userId);
  }


  onStartAddTask(){
    this.isAddingTask = true

  }

  onClickClose(){
    this.isAddingTask = false;
  }

  

}
