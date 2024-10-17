import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SongService } from 'src/services/song.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
})
export class SongDetailsPage implements OnInit {
  songId: string = "";
  songTitle: string = "";
  songLyrics: string = ``;
  songChord: string = "";
  songUrl: string = "";

  fontSize: number = 16; // Default font size
  isDarkMode: boolean = false; // Track theme mode

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private songService: SongService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.songId = params['id'] || '1'; // Get the id from query parameters
      this.getSongDetails(this.songId);
    });

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      this.fontSize = parseInt(savedFontSize, 10);
    }

    const savedTheme = localStorage.getItem('darkMode');
    this.isDarkMode = savedTheme === 'true';
    this.applyTheme(this.isDarkMode);
  }

  getSongDetails(songId: string) {
    this.songService.getSongById(songId).subscribe(
      (data: any) => {
        this.songTitle = data.title;
        this.songLyrics = data.lyrics;
        this.songChord = data.chord;
        this.songUrl = data.url;
      },
      (error) => {
        console.error('Error fetching song details', error);
      }
    );
  }

  // Method to go back
  goBack() {
    this.navCtrl.back();
  }

  // Method to increase font size
  increaseFontSize() {
    if (this.fontSize < 32) { // Max font size limit
      this.fontSize += 2;
      localStorage.setItem('fontSize', this.fontSize.toString()); // Save to localStorage
    }

  }

  // Method to decrease font size
  decreaseFontSize() {
    if (this.fontSize > 12) { // Min font size limit
      this.fontSize -= 2;
      localStorage.setItem('fontSize', this.fontSize.toString()); // Save to localStorage

    }
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  applyTheme(isDarkMode: boolean) {
    document.body.classList.toggle('dark', isDarkMode);
  }
}
