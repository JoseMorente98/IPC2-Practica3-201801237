import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MensajeService } from 'src/app/_service/mensaje.service';
import { NotificacionService } from 'src/app/_service/notificacion.service';

@Component({
  selector: 'app-modal-mensaje',
  templateUrl: './modal-mensaje.component.html',
  styleUrls: ['./modal-mensaje.component.scss'],
})
export class ModalMensajeComponent implements OnInit {
  public data = {
    idUsuario1: localStorage.getItem('currentId'),
    idUsuario2: 0,
    cuerpo: ''
  }

  constructor(
    private navParams: NavParams,
    private mensajeService: MensajeService,
    private notificationService: NotificacionService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.data.idUsuario2 = this.navParams.get('idUsuario');
  }

  saveChanges() {
    console.log(this.data)
    this.create();
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  //CREATE
  private create() {
    this.mensajeService.create(this.data)
    .subscribe((res) => {
      this.closeModal();
      console.log(res)
      this.notificationService.alertMessage('Mensaje Enviado', 'Su mensaje fue enviado con exito.');
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

}
