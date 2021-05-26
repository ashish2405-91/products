import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AuthGuard } from './guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then(s => s.LoginModule)
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then(s => s.ProductModule),
          canActivate: [AuthGuard],
      },
        {
          path: '**',
          loadChildren: () =>
            import('./login/login.module').then(s => s.LoginModule)
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
