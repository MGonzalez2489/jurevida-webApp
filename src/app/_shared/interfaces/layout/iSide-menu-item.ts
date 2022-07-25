export interface iSideMenuItem {
  isTitle: boolean;
  text: string;
  icon: string;
  routerLink: string;
  children?: Array<iSideMenuItem>;
  disabled: boolean;
  forAdmin: boolean;
}
