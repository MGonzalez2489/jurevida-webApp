import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContributionModel, CouncilProfileModel, UserModel } from '@core/models/database';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-council',
  templateUrl: './create-council.component.html',
  styleUrls: ['./create-council.component.scss']
})
export class CreateCouncilComponent implements OnInit {
  councilForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl('femenino', [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    contribution: new FormControl(null, [Validators.required])
  });
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    if (!this.councilForm.valid) {
      return;
    }

    let newCouncil = new UserModel();
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

    this.userService.post(newCouncil).subscribe(
      (data) => {
        this.router.navigate(['/users']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
