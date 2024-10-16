import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-confirm-delete-modal',
    templateUrl: './confirm-delete-modal.component.html',
    styleUrls: ['./confirm-delete-modal.component.scss'],
    imports:[IonicModule]
})
export class ConfirmDeleteModalComponent {
    // The songId passed from the parent component
    @Input() songId!: number;

    constructor(private modalController: ModalController) { }

    // Dismiss the modal without taking action
    dismiss() {
        this.modalController.dismiss();
    }

    // Dismiss the modal and pass the deletion confirmation along with the songId
    confirmDelete() {
        this.modalController.dismiss({
            confirmed: true,
            songId: this.songId
        });
    }
}
