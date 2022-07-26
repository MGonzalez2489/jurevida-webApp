import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { SponsorProfileModel, UserModel } from '@core/models/database';
import { SponsorService } from '../../services/sponsor.service';

@Component({
  selector: 'app-create-sponsor',
  templateUrl: './create-sponsor.component.html',
  styleUrls: ['./create-sponsor.component.scss']
})
export class CreateSponsorComponent {
  sponsorForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    gender: new FormControl('femenino', [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    nickName: new FormControl(null),
    useNickName: new FormControl(false)
  });

  formSubmited: boolean = false;
  get cForm() {
    return this.sponsorForm.controls;
  }
  constructor(private sponsorService: SponsorService, private router: Router) {}

  submit(): void {
    this.formSubmited = true;
    if (!this.sponsorForm.valid) {
      return;
    }

    const newSponsor = new UserModel();
    newSponsor.firstName = this.sponsorForm.value.firstName;
    newSponsor.lastName = this.sponsorForm.value.lastName;
    newSponsor.email = this.sponsorForm.value.email;
    newSponsor.phone = this.sponsorForm.value.phone;
    newSponsor.gender = this.sponsorForm.value.gender;
    newSponsor.address = this.sponsorForm.value.address;

    const newSponsorProfile = new SponsorProfileModel();
    newSponsorProfile.nickName = this.sponsorForm.value.nickName;
    newSponsorProfile.useNickName = this.sponsorForm.value.useNickName;
    newSponsor.sponsor = newSponsorProfile;

    this.sponsorService.post(newSponsor).subscribe(
      (data) => {
        this.router.navigate(['./users']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  requiredNickname(event: MatCheckboxChange): void {
    if (event.checked) {
      this.sponsorForm.controls['nickName'].addValidators(Validators.required);
    } else {
      this.sponsorForm.controls['nickName'].clearValidators();
    }
    this.sponsorForm.controls['nickName'].updateValueAndValidity();
  }
}
