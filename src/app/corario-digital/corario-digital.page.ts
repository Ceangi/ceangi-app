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
  constructor(private navCtrl: NavController) { }

  songs: Song[] = [
    { id: 1, title: 'Alabare alabare', link: 'https://example.com/amazing-grace', isFavorite: false },
    { id: 2, title: 'Battle Belongs', link: 'https://example.com/battle-belongs', isFavorite: false },
    { id: 3, title: 'Blessed Assurance', link: 'https://example.com/blessed-assurance', isFavorite: false },
    { id: 4, title: '10,000 Reasons', link: 'https://example.com/10000-reasons', isFavorite: false },
    { id: 5, title: 'Crown Him with Many Crowns', link: 'https://example.com/crown-him-with-many-crowns', isFavorite: false },
    // Add more songs as needed
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
}
