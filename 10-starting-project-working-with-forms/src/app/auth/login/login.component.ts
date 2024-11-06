
                              // Template Form

// import { Conditional } from '@angular/compiler';
// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [FormsModule]
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor(){
//     afterNextRender(()=>{
    
//       const savedForm = window.localStorage.getItem('saved-login-form')

//       if(savedForm){
//         const loadFormData = JSON.parse(savedForm);
//         const savedEmail = loadFormData.email;
//         setTimeout(
//           ()=>{this.form().controls['email'].setValue(savedEmail)} , 1
//         );
//       }


//      const subscriiption =  this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next:(value)=>
//           window.localStorage.setItem(
//             'saved-login-form',
//             JSON.stringify({email:value.email})
//           ),
//       });
//       this.destroyRef.onDestroy(()=> subscriiption?.unsubscribe());
//     });
//   }


//                                        //Methods

// onSubmit(formData: NgForm) {

// if(formData.form.invalid){
//   return
// }
// console.log(formData);

// const enteredEmail = formData.value.email;
// const enteredPassword = formData.value.password;

// console.log(formData.form);

// console.log(enteredEmail , enteredPassword);

// formData.form.reset();
// }
// }

                                   // Reactive Form


import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, subscribeOn, Subscription } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){

  if(control.value.includes('?')){
    return null;
  }

  return { doesNotContainQuestionMark: true }

}

function emailIsUnique(control:AbstractControl){
if(control.value !== 'test@example.com'){
  return of(null);
}
return of({notUnique:true})
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  private destroyRef = inject(DestroyRef)

  
  

    form = new FormGroup({
    email : new FormControl('' , {validators:[Validators.required , Validators.email] , asyncValidators:[emailIsUnique]}),
    password : new FormControl('' , {validators:[Validators.required , Validators.minLength(6),mustContainQuestionMark]})
    });

  ngOnInit(): void {
    
    const savedForm = window.localStorage.getItem('saved-login-form');

    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedForm.email
      })
    }


   const subscription =  this.form.valueChanges.pipe(

    ).subscribe(
      {
        next: value=>{
          window.localStorage.setItem('saved-login-form',JSON.stringify({email: value.email}))
        }
      }
    );

    this.destroyRef.onDestroy(()=>subscription.unsubscribe());
  }

                      //Methods

get emailIsValid() {
return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
 }

 get passwordIsInValid() {
  return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
   }

    onSubmit() {
    console.log(this.form)
    const enteredEmail = this.form.value.email;
    const enteredPass = this.form.value.password;
    console.log(enteredEmail , enteredPass)
   }

   
}
