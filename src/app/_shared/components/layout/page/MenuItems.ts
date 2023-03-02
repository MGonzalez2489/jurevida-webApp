import { iSideMenuItem } from '@shared/interfaces/layout';

export const MenuItems: iSideMenuItem[] = [
  {
    isTitle: true,
    text: 'Opciones',
    icon: '',
    routerLink: '',
    disabled: false,
    forAdmin: false
  },
  {
    isTitle: false,
    text: 'Home',
    icon: 'home',
    routerLink: '/home',
    disabled: false,
    forAdmin: false
  },

  {
    isTitle: false,
    text: 'Sociedad',
    icon: 'group_work',
    routerLink: '/society',
    disabled: false,
    forAdmin: false
  },
  {
    isTitle: false,
    text: 'Finanzas',
    icon: 'show_chart',
    routerLink: '/finance',
    disabled: true,
    forAdmin: false
  },
  {
    isTitle: false,
    text: 'Documentos',
    icon: 'file_copy',
    routerLink: '/documents',
    disabled: true,
    forAdmin: false
  },
  { isTitle: true, text: 'Oficina', icon: '', routerLink: '', disabled: false, forAdmin: true },
  {
    isTitle: false,
    text: 'Usuarios',
    icon: 'supervisor_account',
    routerLink: '/users',
    disabled: false,
    forAdmin: true
  },
  {
    isTitle: false,
    text: 'Aux Bancario',
    icon: 'switch_camera',
    routerLink: '/assistant',
    disabled: false,
    forAdmin: true
  },

  {
    isTitle: false,
    text: 'Aux Caja',
    icon: 'swap_vertical_circle',
    routerLink: '/petty',
    disabled: false,
    forAdmin: true
  }
];
