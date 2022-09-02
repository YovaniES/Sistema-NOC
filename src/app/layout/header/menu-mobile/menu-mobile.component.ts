import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Menu } from 'src/app/core/models/menu.models';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styles: [],
})
export class MenuMobileComponent implements OnInit {
  subMenus: Menu[] = [];
  subMenuActive: boolean = false;
  subMenuTitle: string = '';
  active: boolean = false;
  headerLogo = './assets/images/logos/cardano.svg';

  menuList = [
    {
      id: 1,
      code: 'MAN',
      text: 'Gestión Personal',
      order: 1,
      icon: 'people',
      type: 'PAREN',
      link: 'gestion',
      enable: false,
      module: 'Reporte',
      displayed: false,
      submenus: [
        {
          code: 'MAN-001',
          text: 'Personal',
          order: 0,
          icon: 'how_to_reg',
          type: 'ALONE',
          link: 'gestion/personas',
          enable: false,
          module: 'MAN',
          displayed: false,
        },
        {
          code: 'MAN-002',
          text: 'Recurso Hardware',
          order: 20,
          icon: 'phonelink',
          type: 'PAREN',
          link: 'gestion/hardware',
          enable: false,
          module: 'MAN',
          displayed: false,
        },
        {
          code: 'MAN-002',
          text: 'Recurso Cuenta',
          order: 20,
          icon: 'lock_clock',
          type: 'PAREN',
          link: 'gestion/cuentas',
          enable: false,
          module: 'MAN',
          displayed: false,
        },
      ],
    },

    {
      id: 2,
      code: 'HER',
      text: 'Mantenimiento',
      order: 1,
      icon: 'settings_suggest',
      type: 'PAREN',
      link: 'mantenimiento',
      enable: false,
      module: 'administrador',
      displayed: false,
      submenus: [
        {
          code: 'PAS-001',
          text: 'Entidad',
          order: 3,
          icon: 'dashboard_customize',
          type: 'PAREN',
          link: 'mantenimiento/entidad',
          enable: false,
          module: 'PAS',
          displayed: false,
        },
      ],
    },

    {
      id: 3,
      code: 'HER',
      text: 'Factorización',
      order: 1,
      icon: 'currency_exchange',
      type: 'PAREN',
      link: 'factorizacion',
      enable: false,
      module: 'administrador',
      displayed: false,
      submenus: [
        {
          code: 'PAS-001',
          text: 'Venta declarada',
          order: 3,
          icon: 'paid',
          type: 'PAREN',
          link: 'factorizacion/ventas',
          enable: false,
          module: 'PAS',
          displayed: false,
        },
      ],
    },
  ];
  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.activeMenuMobile.subscribe((e) => (this.active = e));
  }

  close() {
    this.menuService.activeMenuMobile.emit(false);
  }

  closeSubMenu() {
    this.subMenuActive = false;
    this.subMenuTitle = '';
    this.subMenus = [];
  }
  showSubMenu(item: Menu) {
    this.subMenuActive = true;
    this.subMenus = item.submenus;
    this.subMenuTitle = item.text;
  }
  gotoPage(link: string | UrlTree) {
    this.subMenuActive = false;
    this.active = false;
    this.router.navigateByUrl(link);
  }
}
