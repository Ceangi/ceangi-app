import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Song, SongService } from 'src/services/song.service';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-corario-digital',
  templateUrl: './corario-digital.page.html',
  styleUrls: ['./corario-digital.page.scss'],
})
export class CorarioDigitalPage {
  selectedSegment: string = 'coros';

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private songService: SongService
  ) { }

  songs: Song[] = [];

  searchTerm: string = '';
  selectedLetter: string = '';
  showFavorites: boolean = false;

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  ngOnInit() {
    this.loadSongs();
    this.loadFavorites();
  }

  loadSongs() {
    this.songService.getSongs().subscribe(
      (data: Song[]) => {
        this.songs = data;
      },
      (error) => {
        console.error('Errore nel caricamento delle canzoni', error);
      }
    );
  }

  get filteredSongs() {
    let filtered = this.songs;

    // Filter by selected letter
    if (this.selectedLetter) {
      filtered = filtered.filter(song =>
        song.title.toUpperCase().startsWith(this.selectedLetter)
      );
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Sort alphabetically by title
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  get displayedSongs() {
    return this.showFavorites
      ? this.songs.filter(song => song.isFavorite)
      : this.filteredSongs;
  }

  // Toggle favorite status of a song
  toggleFavorite(song: Song) {
    song.isFavorite = !song.isFavorite;
    this.saveFavorites();
  }

  // Save favorite songs to localStorage
  saveFavorites() {
    const favorites = this.songs
      .filter(song => song.isFavorite)
      .map(song => song.title); // Only save the titles of favorite songs
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Load favorite songs from localStorage
  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.songs.forEach(song => {
      song.isFavorite = favorites.includes(song.title);
    });
  }

  // Clear both search term and letter filter
  clearFilters() {
    this.searchTerm = '';
    this.selectedLetter = '';
  }

  filterByLetter(letter: string) {
    this.selectedLetter = letter;
    this.loadSongs();
  }

  openSongDetails(song: any) {
    this.navCtrl.navigateForward(`/song-details`, {
      queryParams: {
        id: song.id,
      },
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async presentDeleteConfirmation(song: Song) {
    const modal = await this.modalController.create({
      component: ConfirmDeleteModalComponent,
      componentProps: { songId: song.id },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.confirmed && song.id) {
        this.deleteSongById(song.id);
      }
    });

    return await modal.present();
  }

  deleteSongById(songId: number) {
    this.songService.deleteSongById(songId.toString()).subscribe(
      (response) => {
        // Remove song from displayedSongs array
        const index = this.songs.findIndex(s => s.id === songId);
        if (index > -1) {
          this.songs.splice(index, 1);
        }
      },
      (error) => {
        // Handle error in deletion
        console.error('Error deleting song:', error);
      }
    );
  }
}
