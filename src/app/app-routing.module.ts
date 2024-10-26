import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'corario',
    loadChildren: () => import('./corario-digital/corario-digital.module').then(m => m.CorarioDigitalPageModule)
  },
  {
    path: 'song-details',
    loadChildren: () => import('./song-details/song-details.module').then(m => m.SongDetailsPageModule)
  },
  {
    path: 'inserisci',
    loadChildren: () => import('./insert-song/insert-song.module').then(m => m.InsertSongPageModule)
  },
  {
    path: 'edit-song/:id',  // Added route for editing a song
    loadChildren: () => import('./edit-song/edit-song.module').then(m => m.EditSongModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
