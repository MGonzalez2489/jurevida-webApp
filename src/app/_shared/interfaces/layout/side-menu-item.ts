export interface SideMenuItem {
  isTitle: boolean;
  text: string;
  icon: string;
  routerLink: string;
  children?: Array<SideMenuItem>;
  disabled: boolean;
}
