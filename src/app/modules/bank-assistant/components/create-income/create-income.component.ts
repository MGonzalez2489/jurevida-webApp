import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialAssistantModel, UserModel } from '@core/models/database';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { SponsorsService } from '@core/services';
import { GLOBAL } from '@global/globals';
import { Subscription } from 'rxjs';
import { MovementsService } from '../../services/movements.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss']
})
export class CreateIncomeComponent implements OnInit, OnDestroy {
  assistant: FinancialAssistantModel = new FinancialAssistantModel();
  sponsorSubscription: Subscription;
  sponsors: UserModel[] = [];
  global = GLOBAL;
  form: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    concept: new FormControl(null, [Validators.required]),
    sponsor: new FormControl(null, [Validators.required]),
    existingSponsor: new FormControl(true, [Validators.required])
  });
  constructor(
    private dialogRef: MatDialogRef<CreateIncomeComponent>,
    private movementService: MovementsService,
    private sponsorsService: SponsorsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sponsorsService.initialize();
  }

  ngOnInit(): void {
    this.assistant = this.data;
    this.sponsorSubscription = this.sponsorsService.connect$().subscribe((data) => {
      this.sponsors = data.model;
    });
  }
  ngOnDestroy(): void {
    this.sponsorSubscription.unsubscribe();
  }
  submit(): void {
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

    this.movementService.createIncome(this.assistant.publicId, formValue).subscribe((data) => {
      this.sponsorsService.initialize();
      this.dialogRef.close();
    });
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
