import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorarioDigitalPageRoutingModule } from './corario-digital-routing.module';

import { CorarioDigitalPage } from './corario-digital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorarioDigitalPageRoutingModule
  ],
  declarations: [CorarioDigitalPage]
})
export class CorarioDigitalPageModule {}
