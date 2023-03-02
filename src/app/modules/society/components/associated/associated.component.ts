import { Component, OnInit } from '@angular/core';
import { UserModel } from '@core/models/database';
import { ResultListModel } from '@core/models/responses';
import { BaseSearchCriteria } from '@core/models/searchCriteria';
import { SocietyService } from '../../services/society.service';

@Component({
  selector: 'app-associated',
  templateUrl: './associated.component.html',
  styleUrls: ['./associated.component.scss']
})
export class AssociatedComponent implements OnInit {
  search: BaseSearchCriteria = new BaseSearchCriteria();
  associatesMembers: ResultListModel<UserModel> = new ResultListModel<UserModel>();
  panelOpenState: boolean = false;
  constructor(private societyService: SocietyService) {}

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(): void {
    this.societyService.getAssociatedMembers(this.search).subscribe(
      (data) => {
        this.associatesMembers = data;
        console.log(data);
      },
      (errpr) => {}
    );
  }
}
