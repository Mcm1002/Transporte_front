import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path:'',
    component : LoginComponent
  },
  {
    path: 'registro',
    component : RegisterComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UserGuard]
  
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
