import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '@environment/environment';
import { MenuItems } from './MenuItems';
import { iSideMenuItem } from '@shared/interfaces/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { SessionService } from '@core/services';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuItems: Array<iSideMenuItem> = [];
  version = environment.appVersion;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sessionService: SessionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loadMenu();
  }
  loadMenu(): void {
    const user = this.sessionService.getSessionUser();
    this.menuItems = MenuItems.filter((f) => {
      return user!.administrator ? f : f.forAdmin == false;
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  trackByMenuItems(index: number): number {
    return index;
  }
  selectMenu(sideNav: MatDrawer) {
    if (this.mobileQuery.matches) {
      sideNav.toggle();
    }
  }
}
