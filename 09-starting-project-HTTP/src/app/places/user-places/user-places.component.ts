import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {

  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = this.placesService.loadedUserPlaces;


  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription =  
    this.placesService.loadUserPlaces().subscribe({
       error:(error : Error)=>{
         console.log(error)
         this.error.set(error.message);
       }
       ,
       complete: () => {
         this.isFetching.set(false)
       }
     });
 
     this.destroyRef.onDestroy(()=>{
       subscription.unsubscribe();
     })
   }
 
   onSelectPlace(selectedPlace: Place) {
     this.httpClient.put('http://localhost:3000/user-places' , {
       placeId : selectedPlace.id
     }).subscribe({
       next: (resData)=>console.log(resData)
     });
   }

   onRemovePlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe();


    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
   }
} 
