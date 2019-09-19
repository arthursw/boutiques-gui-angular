import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchToolsComponent } from './search-tools/search-tools.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolInfoComponent } from './tool-info/tool-info.component';

import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './shared/components/confirm-dialog/confirm-dialog.service';
import { DropdownMenuComponent } from './shared/components/dropdown-menu/dropdown-menu.component';
import { MenuItemComponent } from './shared/components/dropdown-menu/menu-item/menu-item.component';
import { FormFooterComponent } from './shared/components/form-footer/form-footer.component';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ModalService } from './shared/components/modals/modal.service';
import { ModalsComponent } from './shared/components/modals/modals.component';
import { PapayaComponent } from './shared/components/papaya/papaya.component';
import { PagerComponent } from './shared/components/table/pager/pager.component';
import { TableSearchComponent } from './shared/components/table/search/search.component';
import { TableComponent } from './shared/components/table/table.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { TreeNodeComponent } from './shared/components/tree/tree-node.component';
import { UploaderComponent } from './shared/components/uploader/uploader.component';
import { ConsoleComponent } from './shared/console/console.line.component';
import { DatepickerComponent } from './shared/date-picker/date-picker.component';
import { HeaderComponent } from './shared/header/header.component';
import { HelpMessageComponent } from './shared/help-message/help-message.component';
import { KeycloakHttpInterceptor } from './shared/keycloak/keycloak.http.interceptor';
import { KeycloakService } from './shared/keycloak/keycloak.service';
import { MsgBoxComponent } from './shared/msg-box/msg-box.component';
import { MsgBoxService } from './shared/msg-box/msg-box.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthAdminGuard } from './shared/roles/auth-admin-guard';
import { AuthAdminOrExpertGuard } from './shared/roles/auth-admin-or-expert-guard';
import { CanImportFromPACSGuard } from './shared/roles/auth-can-import-from-PACS-guard';
import { SelectBoxComponent } from './shared/select/select.component';
import { SelectOptionComponent } from './shared/select/select.option.component';
import { GlobalService } from './shared/services/global.service';
import { ToggleSwitchComponent } from './shared/switch/switch.component';
import { HandleErrorService } from './shared/utils/handle-error.service';
import { NotificationsComponent } from './shared/notifications/notifications.component';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs/breadcrumbs.service';
import { Router } from './breadcrumbs/router';

@NgModule({
  declarations: [
    AppComponent,
    SearchToolsComponent,
    ToolListComponent,
    ToolInfoComponent,
    AppComponent,
    ConfirmDialogComponent,
    ConsoleComponent,
    DropdownMenuComponent,
    HeaderComponent,
    LoadingBarComponent,
    ModalComponent,
    MenuItemComponent,
    NavbarComponent,
    TableComponent,
    PagerComponent,
    TreeNodeComponent,
    TooltipComponent,
    ToolListComponent,
    DatepickerComponent,
    MsgBoxComponent,
    PapayaComponent,
    TableSearchComponent,
    FormFooterComponent,
    ModalsComponent,
    SelectBoxComponent,
    SelectOptionComponent,
    UploaderComponent,
    HelpMessageComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    BreadcrumbsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MyDatePickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  providers: [
    ModalService,
    BreadcrumbsService,
    ConfirmDialogService,
    KeycloakService,
    AuthAdminGuard,
    AuthAdminOrExpertGuard,
    CanImportFromPACSGuard,
    GlobalService,
    Router,
    MsgBoxService,
    // { 
    //     provide: ErrorHandler,
    //     useClass: HandleErrorService
    // },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: KeycloakHttpInterceptor,
        multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
