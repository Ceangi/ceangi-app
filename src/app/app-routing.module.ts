import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'corario-digital',
    loadChildren: () => import('./corario-digital/corario-digital.module').then(m => m.CorarioDigitalPageModule)
  },
  {
    path: 'song-details',
    loadChildren: () => import('./song-details/song-details.module').then(m => m.SongDetailsPageModule)
  },
  {
    path: 'insert-song',
    loadChildren: () => import('./insert-song/insert-song.module').then(m => m.InsertSongPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
