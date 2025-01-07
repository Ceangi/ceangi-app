import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/services/song.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-edit-song',
    templateUrl: './edit-song.component.html',
    styleUrls: ['./edit-song.component.scss'],
})
export class EditSongComponent implements OnInit {
    songForm!: FormGroup;
    songId: string = "";
    languages = [
        { label: "Italiano", value: "it" },
        { label: "Español", value: "es" }
    ];
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

    constructor(
        private route: ActivatedRoute,
        private songService: SongService,
        private formBuilder: FormBuilder,
        private toastController: ToastController,
        public navCtrl: NavController
    ) { }

    ngOnInit() {
        this.songId = this.route.snapshot.paramMap.get('id') || '';
        this.initializeForm();
        this.getSongDetails();
    }

    initializeForm() {
        this.songForm = this.formBuilder.group({
            index: ['', Validators.required],
            title: ['', Validators.required],
            lyrics: ['', Validators.required],
            chord: [''],
            lang: ['']
        });
    }

    getSongDetails() {
        this.songService.getSongById(this.songId).subscribe(
            (data: any) => {
                this.songForm.patchValue({
                    index: data.index,
                    title: data.title,
                    lyrics: data.lyrics,
                    chord: data.chord,
                    lang: data.lang
                });
            },
            error => {
                console.error('Error fetching song details', error);
            }
        );
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

    replaceParagraphsWithLineBreaks(lyrics: string): string {
        return lyrics.replace(/<p><\/p>/g, '<br>');
    }

    saveSong() {
        if (this.songForm.valid) {
            const updatedSong = { ...this.songForm.value, lyrics: this.replaceParagraphsWithLineBreaks(this.songForm.value.lyrics) };
            this.songService.updateSong(this.songId, updatedSong).subscribe({
                next: () => {
                    this.presentToast('Song updated successfully', 'success');
                    this.navCtrl.back();
                },
                error: (err) => {
                    this.presentToast('Error updating song', 'danger');
                    console.error('Error updating song:', err);
                }
            });
        }
    }
}
