import { Component, DestroyRef, effect, inject , OnInit, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  clickCount = signal(0);

  



  customInterval$ = new Observable((subscriber)=>{
    let timesExicuted = 0;

    const interval = setInterval(()=>{

      if(timesExicuted>3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({message:'New Value'});
      timesExicuted++

    } , 2000)
  })

  private destroyRef = inject(DestroyRef);

  constructor(){
    // effect(()=>{
    //   console.log(`Clicked button ${this.clickCount()} times`)
    // });
  }


  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //  next : (val) => console.log(val)
    // });

    // this.destroyRef.onDestroy(()=>{
    //   subscription.unsubscribe();
    // })

    this.customInterval$.subscribe({
      next:(val)=>console.log(val),
      complete: () => console.log('COMPLETED!')
    });
  }

  onClick(){

    this.clickCount.update(prevCount => prevCount+1)

  }

  

}
