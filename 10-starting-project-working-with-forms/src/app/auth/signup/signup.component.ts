import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { ConsoleReporter } from 'jasmine';
import { debounceTime, first } from 'rxjs';

function equalValue(control:AbstractControl){
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if(password===confirmPassword){
    return null;

  }else {
    return {passwordNotEqual:true}
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports:[ReactiveFormsModule ]
})
export class SignupComponent implements OnInit {

  private destroyRef = inject(DestroyRef)

   form = new FormGroup({
    email: new FormControl('',{validators:[Validators.required , Validators.email]}),

    passwordS: new FormGroup({
      password: new FormControl('',{validators:[Validators.required , Validators.maxLength(6)]}),
      confirmPassword: new FormControl('',{validators:[Validators.required , Validators.maxLength(6)]}),
    }, {
      validators:[equalValue]
    }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    addressGroup:new FormGroup({
      street: new FormControl(''),
      number: new FormControl(''),
      postalcode: new FormControl(''),
      city: new FormControl('')
    }),
    role : new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student'),
    source:new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree : new FormControl(false)
  } )


  ngOnInit(): void {


    const savedForm = window.localStorage.getItem('saved-signup-form-email');
    const savedfN = window.localStorage.getItem('saved-signup-form-firstName');

    console.log(savedForm)
    console.log(savedfN)

    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({
        email:loadedForm.email,
        
      })
    }

    if(savedfN){
      const loadFn = JSON.parse(savedfN);
      this.form.patchValue({
        firstName:loadFn.firstName
      })
    }

    const subscriiption = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next:value=>{
        window.localStorage.setItem('saved-signup-form-email',JSON.stringify({email:value.email}));
        window.localStorage.setItem('saved-signup-form-fN',JSON.stringify({firstName:value.firstName}));
        window.localStorage.setItem('saved-signup-form-lN',JSON.stringify({lastName:value.lastName}));
        window.localStorage.setItem('saved-signup-form-s',JSON.stringify({street:value.addressGroup?.street}));
        window.localStorage.setItem('saved-signup-form-n',JSON.stringify({number:value.addressGroup?.number}));
        window.localStorage.setItem('saved-signup-form-pC',JSON.stringify({postalcode:value.addressGroup?.postalcode}))
        window.localStorage.setItem('saved-signup-form-',JSON.stringify({city:value.addressGroup?.city}))
      }
    })

    this.destroyRef.onDestroy(()=>subscriiption.unsubscribe());
  }

     get emailIsValid() {
      return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
     }
    
     get passwordIsInValid() {
      return this.form.controls.passwordS.controls.password.touched && this.form.controls.passwordS.controls.password.dirty && this.form.controls.passwordS.controls.password.invalid
       }


  onSubmit() {
    // if(this.form.invalid){
    //   console.log("Invalid Form")
    //   return
    // }
    console.log(this.form)
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.passwordS?.password;
    console.log(enteredEmail,enteredPassword)
    }


  onReset(){
    this.form.reset();
  }


}
