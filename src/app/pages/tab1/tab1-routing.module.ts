import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'newcorte/:id',
    loadChildren: () => import('../new-corte/new-corte.module').then( m => m.NewCortePageModule)
  },
  {
    path: 'task/:idtask/:idcorte',
    loadChildren: () => import('../task/task.module').then(m => m.TaskPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
