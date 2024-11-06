import { NgModule } from "@angular/core";
import { CardsComponent } from "./cards/cards.component";

@NgModule({
    declarations : [CardsComponent],
    exports : [CardsComponent]
})
export class SharedModule{}