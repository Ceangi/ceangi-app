import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSongComponent } from './edit-song.component';

const routes: Routes = [
    {
        path: '',
        component: EditSongComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditSongRoutingModule { }
