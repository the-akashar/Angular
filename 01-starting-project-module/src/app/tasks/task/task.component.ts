import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';

import {Task} from '../task/task.model'
import { CardsComponent } from "../../shared/cards/cards.component";
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';



@Component({
  selector: 'app-task',
  standalone: false,
  // imports: [CardsComponent , DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  

  @Input({required:true}) task! : Task ;
  private taskService = inject( TasksService ) 


  onCompleteTask(){
    this.taskService.removeTask(this.task.id)
  }

}
