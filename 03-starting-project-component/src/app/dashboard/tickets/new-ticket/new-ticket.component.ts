import { AfterContentInit, AfterViewInit, Component, ElementRef, output, ViewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent ,ButtonComponent,FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit {


 

  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  add = output<{title:string ; text:string}>();


  ngAfterViewInit(): void {

    console.log('After View In It')
    console.log(this.form?.nativeElement);
    
  }

onSubmit(B : string , c : string ) {
this.add.emit({title : B , text : c});

// console.dir(B)

// console.log("Entered value is "+""+B+ " and "+c)

this.form?.nativeElement.reset();
}

}
