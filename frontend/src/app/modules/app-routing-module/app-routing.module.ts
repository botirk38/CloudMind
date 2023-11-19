import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/route-paths';
import { HomeComponent } from '../home/home.component';

const routes : Routes = [
  {path: ROUTE_PATHS.home, component: HomeComponent}
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
