import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '@environment/environment';
import { MenuItems } from './MenuItems';
import { iSideMenuItem } from '@shared/interfaces/layout';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuItems: Array<iSideMenuItem> = MenuItems;
  version = environment.appVersion;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  trackByMenuItems(index: number): number {
    return index;
  }
}
