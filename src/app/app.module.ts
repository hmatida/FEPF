import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { CadUserComponent } from './users/cad-user/cad-user.component';
import { UserService } from './users/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account/account-details/account-details.component';
import { AccountService } from './account/account.service';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category.service';
import { ProviderComponent } from './provider/provider.component';
import { ProviderService } from './provider/provider.service';
import { LaunchesComponent } from './launches/launches.component';
import { LaunchesService } from './launches/launches.service';
import { ExtractComponent } from './extract/extract.component';
import { ExtractService } from './extract/extract.service';
import { PredictionComponent } from './prediction/prediction.component';
import { PredictionService } from './prediction/prediction.service';
import { PlotsComponent } from './prediction/plots/plots.component';
import { TextMaskModule } from 'angular2-text-mask';
import { PrevisionComponent } from './prevision/prevision.component';
import { PrevisonService } from './prevision/prevision.service';
// import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CadUserComponent,
    AccountComponent,
    AccountDetailsComponent,
    CategoryComponent,
    ProviderComponent,
    LaunchesComponent,
    ExtractComponent,
    PredictionComponent,
    PlotsComponent,
    PrevisionComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    TextMaskModule,
    // createNumberMask,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),

  ],
  providers: [UserService, AccountService, CategoryService,
              ProviderService, LaunchesService, ExtractService,
              PredictionService, PrevisonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
