import { NgModule } from "@angular/core";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations : [ TasksComponent ,  TaskComponent , NewTaskComponent],
    exports : [TaskComponent , FormsModule , SharedModule ],
    imports : [ FormsModule , SharedModule ]
})
export  class TasksModule{}