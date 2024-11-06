import { Component , computed, EventEmitter, Input, output, Output, signal} from '@angular/core';

import {type User} from '../user/user.model'
import { CardsComponent } from "../shared/cards/cards.component";

// type User = {
//   id:string;
//   avatar:string;
//   name:string
// }




@Component({
  selector: 'app-user',
  standalone: false,
  // imports: [CardsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required:true}) user!: User;
  @Input({required:true}) selected ! : boolean;
  @Output() select = new EventEmitter();

  // select = output<string>();
 


  get imagePath(){
    return  'assets/'+ this.user.avatar ;
  }

  onClick(){
  this.select.emit(this.user.id);
  }
}
