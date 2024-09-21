import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
})
export class SongDetailsPage implements OnInit {
  songId: string = "";
  songTitle: string = "Alabare";
  songText: string = `//Alabaré, alabaré,Alabaré, Alabaré a mi Señor.//\n Juan vio el numero, de los redimidos, \n Y todos alababan al Señor,\n Unos oraban, otros cantaban, \n Y todos alababan al Señor.`;
  songKey: string = "E";
  songUrl: string = "assets musica";

  constructor(private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    // Ottenere i parametri passati dalla canzone selezionata
    this.songId = this.route.snapshot.paramMap.get('id') || '1';
  }

  // Metodo per tornare indietro
  goBack() {
    this.navCtrl.back();
  }
}
