import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'cadaccount', title: 'Contas Movimento',  icon: 'ti-credit-card', class: '' },
    { path: 'provider', title: 'Empresas',  icon: 'ti-truck', class: '' },
    { path: 'cadcategory', title: 'Categorias',  icon: 'ti-menu-alt', class: '' },
    { path: 'launches', title: 'Lançamentos',  icon: 'ti-exchange-vertical', class: '' },
    { path: 'prediction', title: 'Pagamentos',  icon: 'ti-calendar', class: '' },
    { path: 'extract', title: 'Extrato',  icon: 'ti-book', class: '' },
    { path: 'prevision', title: 'Lançamentos futuros',  icon: 'ti-alarm-clock', class: '' },
    { path: 'user', title: 'User',  icon:'ti-user', class: '' },
    { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
    { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
