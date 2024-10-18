import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Song, SongService } from 'src/services/song.service';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-insert-song',
  templateUrl: './insert-song.component.html',
  styleUrls: ['./insert-song.component.scss'],
})
export class InsertSongComponent {

  chords = [
    { label: "Do maggiore", value: "C" },
    { label: "Do minore", value: "Cm" },
    { label: "Do diesis maggiore", value: "C#" },
    { label: "Do diesis minore", value: "C#m" },

    { label: "Re maggiore", value: "D" },
    { label: "Re minore", value: "Dm" },
    { label: "Re diesis maggiore", value: "D#" },
    { label: "Re diesis minore", value: "D#m" },

    { label: "Mi maggiore", value: "E" },
    { label: "Mi minore", value: "Em" },
    { label: "Mi bemolle maggiore", value: "Eb" },
    { label: "Mi bemolle minore", value: "Ebm" },

    { label: "Fa maggiore", value: "F" },
    { label: "Fa minore", value: "Fm" },
    { label: "Fa diesis maggiore", value: "F#" },
    { label: "Fa diesis minore", value: "F#m" },

    { label: "Sol maggiore", value: "G" },
    { label: "Sol minore", value: "Gm" },
    { label: "Sol diesis maggiore", value: "G#" },
    { label: "Sol diesis minore", value: "G#m" },

    { label: "La maggiore", value: "A" },
    { label: "La minore", value: "Am" },
    { label: "La diesis maggiore", value: "A#" },
    { label: "La diesis minore", value: "A#m" },

    { label: "Si maggiore", value: "B" },
    { label: "Si minore", value: "Bm" },
    { label: "Si bemolle maggiore", value: "Bb" },
    { label: "Si bemolle minore", value: "Bbm" }
  ];
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // basic formatting buttons
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // lists
      [{ 'align': [] }], // text alignment
      ['link', 'image'], // link and image
      [{ 'color': [] }, { 'background': [] }], // color/background dropdowns
    ]
  };

  songForm!: FormGroup;
  item: string;

  constructor(private formBuilder: FormBuilder,
    private songService: SongService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private location: Location) {
    this.item = '';
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      chord: [''],
      lyrics: ['', Validators.required]
    });
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }

  saveSong() {
    if (this.songForm.valid) {
      const newSong: Song = {
        title: this.songForm.get('title')?.value,
        lyrics: this.songForm.get('lyrics')?.value,
        chord: this.songForm.get('chord')?.value,
      };

      this.songService.createSong(newSong).subscribe({
        next: (result) => {
          this.presentToast('Song created successfully', 'success');
          console.log('Song created successfully:', result);
          this.songForm.reset();
        },
        error: (err) => {
          this.presentToast('Error creating song', 'danger');
          console.error('Error creating song:', err);
        }
      });
    }
  }

}
