import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { CadUserComponent } from './users/cad-user/cad-user.component';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { ProviderComponent } from './provider/provider.component';
import { LaunchesComponent } from './launches/launches.component';
import { ExtractComponent } from './extract/extract.component';
import { PredictionComponent } from './prediction/prediction.component';
import { PrevisionComponent } from './prevision/prevision.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'caduser',
        component: CadUserComponent
    },
    {
        path: 'cadaccount',
        component: AccountComponent
    },
    {
        path: 'cadcategory',
        component: CategoryComponent
    },
    {
        path: 'provider',
        component: ProviderComponent
    },
    {
        path: 'launches',
        component: LaunchesComponent
    },
    {
        path: 'extract',
        component: ExtractComponent
    },
    {
        path: 'prediction',
        component: PredictionComponent
    },
    {
        path: 'prevision',
        component: PrevisionComponent
    }
]
