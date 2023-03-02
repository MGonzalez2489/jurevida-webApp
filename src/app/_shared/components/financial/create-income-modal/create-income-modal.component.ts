import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel, UserModel } from '@core/models/database';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { MovementsService, SponsorsService } from '@core/services';
import { GLOBAL } from '@global/globals';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income-modal.component.html',
  styleUrls: ['./create-income-modal.component.scss']
})
export class CreateIncomeModalComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  sponsorSubscription: Subscription;
  postSubscription: Subscription;
  sponsors: UserModel[] = [];
  global = GLOBAL;
  form: FormGroup = new FormGroup({
    sponsor: new FormControl(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    concept: new FormControl(null, [Validators.required]),
    existingSponsor: new FormControl(true, [Validators.required])
  });
  get cForm() {
    return this.form.controls;
  }

  formSubmited: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<CreateIncomeModalComponent>,
    private movementService: MovementsService,
    private sponsorsService: SponsorsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.sponsorsService.initialize();

    this.assistant = this.data;
    this.sponsorSubscription = this.sponsorsService.connect$().subscribe((data) => {
      this.sponsors = data.model;
    });
  }
  ngOnDestroy(): void {
    this.sponsorSubscription.unsubscribe();
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
  submit(): void {
    this.formSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const formValue = {
      amount: this.form.value.amount,
      concept: this.form.value.concept,
      sponsor: null,
      existingSponsor: this.form.value.existingSponsor,
      name: null
    };

    if (this.form.value.existingSponsor) {
      const publicId = this.form.value.sponsor.publicId;
      if (!publicId) {
        this.form.controls['sponsor'].setErrors({ invalid: true });
        return;
      } else {
        formValue.sponsor = publicId;
      }
    } else {
      formValue.name = this.form.value.sponsor;
    }
    if (this.assistant.isPettyCash) {
      this.postSubscription = this.movementService.createPettyIncome(this.assistant.publicId, formValue).subscribe(() => {
        this.sponsorsService.initialize();
        this.dialogRef.close();
      });
    } else {
      this.postSubscription = this.movementService.createBankIncome(this.assistant.publicId, formValue).subscribe(() => {
        this.sponsorsService.initialize();
        this.dialogRef.close();
      });
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }
  search() {
    const search = new BaseSearchCriteria();
    search.keyword = this.form.value.sponsor;
    this.sponsorsService.search(search);
  }
  displayFn(user: UserModel): string {
    return user && user.fullName ? user.fullName : '';
  }
  changeSponsorType() {
    this.form.patchValue({ sponsor: null });
  }
}
