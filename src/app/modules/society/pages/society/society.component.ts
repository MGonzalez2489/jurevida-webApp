import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.scss']
})
export class SocietyComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  renderedComponent: string = 'asociado';
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterType($event: MatSelectionListChange, drawer: MatDrawer) {
    this.renderedComponent = $event.options[0].value;
    console.log('selected', this.renderedComponent);
    if (this.mobileQuery.matches) {
      drawer.toggle();
    }
  }
}
