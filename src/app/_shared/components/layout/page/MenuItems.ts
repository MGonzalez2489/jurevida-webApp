import { iSideMenuItem } from '@shared/interfaces/layout';

export const MenuItems: iSideMenuItem[] = [
  {
    isTitle: true,
    text: 'Opciones',
    icon: '',
    routerLink: '',
    disabled: false
  },
  {
    isTitle: false,
    text: 'Sociedad',
    icon: 'group_work',
    routerLink: '/society',
    disabled: false
  },
  {
    isTitle: false,
    text: 'Finanzas',
    icon: 'show_chart',
    routerLink: '/finance',
    disabled: true
  },
  {
    isTitle: false,
    text: 'Documentos',
    icon: 'file_copy',
    routerLink: '/documents',
    disabled: true
  },
  { isTitle: true, text: 'Oficina', icon: '', routerLink: '', disabled: false },
  {
    isTitle: false,
    text: 'Usuarios',
    icon: 'supervisor_account',
    routerLink: '/users',
    disabled: false
  },
  //{
    //isTitle: false,
    //text: 'Aux Bancario',
    //icon: 'supervisor_account',
    //routerLink: '/users',
    //disabled: false
  //},

  //{
    //isTitle: false,
    //text: 'Aux Caja',
    //icon: 'supervisor_account',
    //routerLink: '/users',
    //disabled: false
  //}
];
