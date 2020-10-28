import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCortePage } from './new-corte.page';

const routes: Routes = [
  {
    path: '',
    component: NewCortePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCortePageRoutingModule {}
