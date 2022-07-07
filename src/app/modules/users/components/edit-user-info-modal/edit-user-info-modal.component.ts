import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssociateProfileModel, SponsorProfileModel, UserModel } from '@core/models/database';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-info-modal',
  templateUrl: './edit-user-info-modal.component.html',
  styleUrls: ['./edit-user-info-modal.component.scss']
})
export class EditUserInfoModalComponent implements OnInit {
  user: UserModel = new UserModel();
  form: FormGroup = new FormGroup({});
  constructor(
    private dialogRef: MatDialogRef<EditUserInfoModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = this.data['user'];
    this.generateForm();
  }

  generateForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      gender: new FormControl({ value: this.user.gender, disabled: true }),
      email: new FormControl({ value: this.user.email, disabled: true }),
      phone: new FormControl(this.user.phone, [Validators.required]),
      address: new FormControl(this.user.address)
    });

    if (this.user.sponsor) {
      this.form.addControl('useNickName', new FormControl(this.user.sponsor.useNickName));
      this.form.addControl('nickName', new FormControl(this.user.sponsor.nickName));
    }

    if (this.user.associated) {
      this.form.addControl('maritalStatus', new FormControl(this.user.associated.maritalStatus));
    }
  }
  requiredNickname(event: MatCheckboxChange): void {
    if (event.checked) {
      this.form.controls['nickName'].addValidators(Validators.required);
    } else {
      this.form.controls['nickName'].clearValidators();
    }
    this.form.controls['nickName'].updateValueAndValidity();
  }

  dimiss(): void {
    this.dialogRef.close(false);
  }
  submit(): void {
    const userUpdated = new UserModel();
    userUpdated.firstName = this.form.value.firstName;
    userUpdated.lastName = this.form.value.lastName;
    userUpdated.phone = this.form.value.phone;
    userUpdated.address = this.form.value.address;
    if (this.user.sponsor) {
      const sponsorProfile = new SponsorProfileModel();
      sponsorProfile.publicId = this.user.sponsor.publicId;
      sponsorProfile.useNickName = this.form.value.useNickName;
      sponsorProfile.nickName = this.form.value.nickName;
      userUpdated.sponsor = sponsorProfile;
    }
    if (this.user.associated) {
      const associatedProfile = new AssociateProfileModel();
      associatedProfile.maritalStatus = this.form.value.maritalStatus;
      associatedProfile.publicId = this.user.associated.publicId;
      userUpdated.associated = associatedProfile;
    }

    this.userService.putUser(this.user.publicId, userUpdated).subscribe(
      (data) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.log('error update', error);
      }
    );
  }
}
