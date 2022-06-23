import { Component, OnInit } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { SocietyService } from '../../services/society.service';

@Component({
  selector: 'app-council',
  templateUrl: './council.component.html',
  styleUrls: ['./council.component.scss']
})
export class CouncilComponent implements OnInit {
  search: BaseSearchCriteria = new BaseSearchCriteria();
  councilMembers: ResultListModel<UserModel> = new ResultListModel<UserModel>();
  constructor(private societyService: SocietyService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.societyService.getCouncilMembers(this.search).subscribe(
      (data) => {
        this.councilMembers = data;
        console.log(data)
      },
      (errpr) => {}
    );
  }
}
