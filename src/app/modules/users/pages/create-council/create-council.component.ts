import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContributionModel, CouncilProfileModel, UserModel } from '@core/models/database';
import { CouncilService } from '../../services/council.service';

@Component({
  selector: 'app-create-council',
  templateUrl: './create-council.component.html',
  styleUrls: ['./create-council.component.scss']
})
export class CreateCouncilComponent {
  formSubmited: boolean = false;
  councilForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl('femenino', [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    contribution: new FormControl(null, [Validators.required])
  });
  get cForm() {
    return this.councilForm.controls;
  }

  constructor(private councilService: CouncilService, private router: Router) {}

  submit(): void {
    this.formSubmited = true;
    if (!this.councilForm.valid) {
      return;
    }

    const newCouncil = new UserModel();
    newCouncil.firstName = this.councilForm.value.firstName;
    newCouncil.lastName = this.councilForm.value.lastName;
    newCouncil.email = this.councilForm.value.email;
    newCouncil.phone = this.councilForm.value.phone;
    newCouncil.gender = this.councilForm.value.gender;
    newCouncil.address = this.councilForm.value.address;
    newCouncil.council = new CouncilProfileModel();

    const newContribution = new ContributionModel();
    newContribution.contribution = this.councilForm.value.contribution;
    newCouncil.council.contributions.push(newContribution);

    this.councilService.post(newCouncil).subscribe(
      (data) => {
        this.router.navigate(['/users']);
      },
      (error) => {}
    );
  }
}
