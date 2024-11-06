import { Component, ContentChild, ElementRef, HostBinding, HostListener, inject, Inject, Input , input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation:ViewEncapsulation.None,
  host:{
    class:'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
label =  input.required<string>();

// @HostBinding('class') className = 'control';

// @HostListener('click') onClick(){
//   console.log("clicked")
// }

private el = inject(ElementRef);

@ContentChild('input') private control?:ElementRef<HTMLInputElement | HTMLTextAreaElement>

onClick(){
  // console.log("Clicked")
  // console.log(this.el)
  console.log(this.control);
  
}

}
