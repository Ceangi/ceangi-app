import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorarioDigitalPage } from './corario-digital.page';

const routes: Routes = [
  {
    path: '',
    component: CorarioDigitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorarioDigitalPageRoutingModule {}
