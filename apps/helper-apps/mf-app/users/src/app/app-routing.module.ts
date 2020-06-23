import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: UsersComponent },
      { path: ':id', component: UserDetailComponent },
    ],
  },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
