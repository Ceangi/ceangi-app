import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Song {
  id: number,
  title: string;
  link: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-corario-digital',
  templateUrl: './corario-digital.page.html',
  styleUrls: ['./corario-digital.page.scss'],
})
export class CorarioDigitalPage {
  selectedSegment: string = 'coros';

  constructor(private navCtrl: NavController) { }

  songs: Song[] = [
    { id: 1, title: 'Alabare, alabare', link: '', isFavorite: false },
    { id: 2, title: 'Bueno es alabarte Jehová', link: '', isFavorite: false },
    { id: 3, title: 'Cantad a Jehová cántico nuevo', link: '', isFavorite: false },
    { id: 4, title: 'Cristo maravilloso', link: '', isFavorite: false },
    { id: 5, title: 'Cristo no está muerto', link: '', isFavorite: false },
    { id: 6, title: 'Dame un corazón', link: '', isFavorite: false },
    { id: 7, title: 'Digno de gloria y alabanza', link: '', isFavorite: false },
    { id: 8, title: 'Él es mi Rey', link: '', isFavorite: false },
    { id: 9, title: 'El gozo del Señor', link: '', isFavorite: false },
    { id: 10, title: 'En mi corazón hay banderas', link: '', isFavorite: false },
    { id: 11, title: 'Gozo, gozo, gozo yo quería', link: '', isFavorite: false },
    { id: 12, title: 'Pueblos todos batid las manos', link: '', isFavorite: false },
    { id: 13, title: 'Se mueve la mano de Dios', link: '', isFavorite: false },
    { id: 14, title: 'Si salvo soy', link: '', isFavorite: false },
    { id: 15, title: 'Sin santidad', link: '', isFavorite: false },
    { id: 16, title: 'Solamente en Cristo', link: '', isFavorite: false },
    { id: 17, title: 'Te amo con el amor del Señor', link: '', isFavorite: false },
    { id: 18, title: 'Tenme brillando Señor', link: '', isFavorite: false }
  ];

  searchTerm: string = '';
  selectedLetter: string = '';
  showFavorites: boolean = false;

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  ngOnInit() {
    this.loadFavorites();
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

    return filtered;
  }

  get displayedSongs() {
    return this.showFavorites ? this.songs.filter(song => song.isFavorite) : this.filteredSongs;
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
  }

  openSongDetails(song: any) {
    this.navCtrl.navigateForward(`/song-details`, {
      queryParams: {
        id: song.id,
      }
    })
  }

  goBack() {
    this.navCtrl.back();
  }
  
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  
}
