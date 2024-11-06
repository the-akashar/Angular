import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  // @Output() calculate = new EventEmitter<
  // InvestmentInput
  // >();

  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '10';
  enteredDuration = '20';

  constructor(private investmentService:InvestmentService){}


onSubmit() {
// this.calculate.emit({
//     initialInvestment : +this.enteredInitialInvestment ,
//     duration : +this.enteredDuration ,
//     expectedReturn : +this.enteredExpectedReturn ,
//     annualInvestment : +this.enteredAnnualInvestment 
//   })

this.investmentService.onCalculateInvestmentResults({
  initialInvestment : +this.enteredInitialInvestment ,
    duration : +this.enteredDuration ,
    expectedReturn : +this.enteredExpectedReturn ,
    annualInvestment : +this.enteredAnnualInvestment 
}
  
)
}

}
