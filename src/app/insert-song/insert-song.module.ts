import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InsertSongRoutingModule } from './insert-song-routing.module';
import { InsertSongComponent } from './insert-song.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        InsertSongRoutingModule
    ],
    declarations: [InsertSongComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
})
export class InsertSongPageModule { }
