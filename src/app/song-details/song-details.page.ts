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
  songTitle: string = "Alabare";
  songLyrics: string = `//Alabaré, alabaré,Alabaré, Alabaré a mi Señor.//\n Juan vio el numero, de los redimidos, \n Y todos alababan al Señor,\n Unos oraban, otros cantaban, \n Y todos alababan al Señor.`;
  songChord: string = "E";
  songUrl: string = "assets musica";

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private songService: SongService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.songId = params['id'] || '1'; // Get the id from query parameters
      this.getSongDetails(this.songId);
    });
  }

  getSongDetails(songId: string) {
    this.songService.getSongById(songId).subscribe(
      (data: any) => {
        this.songTitle = data.title; // Adjust according to your API response structure
        this.songLyrics = data.lyrics; // Adjust according to your API response structure
        this.songChord = data.chord; // Adjust according to your API response structure
        this.songUrl = data.url; // Adjust according to your API response structure
      },
      (error) => {
        console.error('Error fetching song details', error);
      }
    );
  }

  // Metodo per tornare indietro
  goBack() {
    this.navCtrl.back();
  }
}
