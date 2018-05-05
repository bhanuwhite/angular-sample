import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {LoginPage} from '../app/components/module-component/login/login.component';
import { AuthGuard } from './services/_guards/index';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: 'app/components/module-component/structure.module#StructureModule' },
    { path: 'branchdeeplink', component: BranchDeepLink },
    { path: '**', redirectTo: '', }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
