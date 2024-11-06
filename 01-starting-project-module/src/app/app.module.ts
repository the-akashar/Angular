import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { TaskComponent } from "./tasks/task/task.component";
import { BrowserModule } from "@angular/platform-browser";
import { TasksComponent } from "./tasks/tasks.component";
import { CardsComponent } from "./shared/cards/cards.component";
import { FormsModule } from "@angular/forms";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { SharedModule } from "./shared/shared.module";
import { TasksModule } from "./tasks/tasks.module";

@NgModule({
declarations: [AppComponent, HeaderComponent , UserComponent   ],
bootstrap: [AppComponent],
imports: [BrowserModule , TasksModule ] 
}) 
export class AppModule{

}