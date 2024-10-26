import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditSongComponent } from './edit-song.component';
import { EditSongRoutingModule } from './edit-song-routing.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [EditSongComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        QuillModule.forRoot(),
        EditSongRoutingModule
    ]
})
export class EditSongModule { }
