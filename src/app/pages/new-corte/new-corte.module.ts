import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCortePageRoutingModule } from './new-corte-routing.module';

import { NewCortePage } from './new-corte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCortePageRoutingModule
  ],
  declarations: [NewCortePage]
})
export class NewCortePageModule {}
