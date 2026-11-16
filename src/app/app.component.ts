import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { favoritesRoutes, navigationRoutes } from './menu';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    FormsModule,
    NzMenuModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSpinModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = "Vital Ledger Book";
  dropDownBorder: boolean = false;
  dropDownBorderStore1: boolean = false;
  dropDownBorderStore2: boolean = false;
  isCollapsed = false;
  sideLock = true;
  showBack: boolean = false;
  pageHeading: any = "";
  isLoading: boolean = false;
  SearchedData: string = "";
  userType!: string;
  userTypeId!: number;
  showCompanyModel: boolean = false;
  selectedCompany: any;
  isClicked = false;
  browsingMode: number = 1;
  browsePlaceHolder: any = 'Tracking #'
  trackOrderMenu={
    moduleMenuId: 2023,
    page: "Order Tracking",
    path: "./order/order-details",
    menuVersion: "1.0",
    active: true,
    offlineAvailable: 0,
    activeSince: "2023-06-28T09:14:19.000+0000",
    moduleId: 2,
    child: [],
    pageActions: "{\"Edit\":false,\"Connect More\":false}"
}
  showCompaniesDropdown: boolean = false

  companies: any[] = [];
  sites: any[] = [];
  allSites: any[]=[];
  isModuleDropdownVisible: boolean = false;

  navigationRoutes: { icon: string, page: string, path: string, moduleId: number, pageActions: string, isSelected: boolean , child?: any , isOpen?: boolean}[] = [];
  favoritesRoutes: { icon: string, page: string, path: string, moduleId: number, pageActions: string }[] = [];
  modules: any;
  loginUserEmail!: number;
  loginUserFullName!: string;
  pmsAdminDetail: any;
  errorMessage: any;
  pmsId!: string;
  isOrderAPILoading: boolean = false;
  moduleName!: string;
  assignedRoles: any[]=[];
  colorsAndIcons=[
    {class:'bg-[--light-warn-color] text-[--warn-color]',icon:'user',moduleId:1},
    {class:'bg-[--light-purple-color] text-[--purple-color]',icon:'audit',moduleId:2},
    {class:'bg-[--light-blue-color] text-[--blue-color]',icon:'apartment',moduleId:3},
    {class:'bg-[--light-green-color] text-[--dark-green-color]',icon:'appstore',moduleId:4},
    {class:'bg-[--light-warn-color] text-[--warn-color]',icon:'car',moduleId:8},
    {class:'bg-[--light-purple-color] text-[--purple-color]',icon:'home',moduleId:9},
    {class:'bg-[--light-blue-color] text-[--blue-color]',icon:'mobile',moduleId:10},
  ]

  constructor(public router: Router,private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.navigationRoutes = navigationRoutes;
    this.favoritesRoutes = favoritesRoutes;
  }

  isLoginPage(): boolean { return this.router.url.startsWith('/login'); }

  routeToMenuPath(menu:any) {
    console.log(menu.path, "testing....");
    this.router.navigate([menu.path]);
    this.navigationRoutes.forEach(menu2=>{
      menu.path==menu2.path?menu2.isSelected=true:menu2.isSelected=false;
    });
  }
  

  routeToSubmenuPath(submenu:any , mainPath: any) {
    const routePath = submenu.actionCode;
    this.router.navigate([routePath]);
  }

  openHandler(page?: string) {
    // handle menu open
  }

  notificationMenuChange(event: boolean) {
    this.isModuleDropdownVisible = event;
  }

  copyToClipboard() {
    // copy logic
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  backToAdmin(url: string) {
    // navigation logic
  }
}
