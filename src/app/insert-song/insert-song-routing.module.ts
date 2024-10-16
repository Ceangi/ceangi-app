import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertSongComponent } from './insert-song.component';

const routes: Routes = [
    {
        path: '',
        component: InsertSongComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsertSongRoutingModule { }
