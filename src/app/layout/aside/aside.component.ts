import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
})
export class AsideComponent {
  @Output() generalfixedAside = new EventEmitter<Boolean>();
  fixedAside = true;
  menuList = [
    {
      id: 1,
      code: 'GES',
      text: 'REPORTES',
      order: 1,
      icon: 'query_stats',
      type: 'PAREN',
      link: 'evento',
      enable: false,
      module: 'Reporte',
      displayed: false,
      submenus: [
        {
          code: 'MAN-001',
          text: 'Reporte Evento',
          order: 0,
          icon: 'bar_chart',
          type: 'ALONE',
          link: 'evento/reporte',
          enable: false,
          module: 'MAN',
          displayed: false,
        },
      ],
    },
    {
      id: 2,
      code: 'EVE',
      text: 'EVENTO',
      order: 1,
      icon: 'timer',
      type: 'PAREN',
      link: 'evento',
      enable: false,
      module: 'evento',
      displayed: false,
      submenus: [
        {
          code: 'PAS-001',
          text: 'Lista Eventos',
          order: 3,
          icon: 'pending_actions',
          type: 'PAREN',
          link: 'evento/lista',
          enable: false,
          module: 'PAS',
          displayed: false,
        },
      ],
    },
  ];

  clickLinkMenu() {
    this.menuList.forEach((item) => {
      item.displayed = false;
    });
  }

  clickToggleMenu(item: any) {
    const final = !item.displayed;
    if (!(this.fixedAside == false && final == false)) {
      this.menuList.map((item) => {
        item.displayed = false;
      });
      item.displayed = final;
    }
    this.toggleAside(true);
  }

  toggleAside(e: boolean) {
    this.fixedAside = e;
    this.generalfixedAside.emit(this.fixedAside);
  }
}

