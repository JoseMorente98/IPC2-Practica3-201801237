import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_service/usuario.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { NotificacionService } from '../_service/notificacion.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public table:any[];

  constructor(
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private notificationService: NotificacionService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.getAll();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  getAll() {
    this.usuarioService.getAll()
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {

    })
  }

  async presentModal(id?:number) {
    const modal = await this.modalController.create({
      component: ModalUsuarioComponent,
      componentProps: {
        idUsuario: id
      }
    });
    modal.onDidDismiss().then((data) => {
      //DATOS
      if(data.data) {
        this.getAll();
      }
    });
    return await modal.present();
  }

    //ELIMINAR
  delete(id:any) {
    this.usuarioService.delete(id)
    .subscribe((res) => {
      this.notificationService.alertMessage('Usuario Eliminado', 'El usuario fue eliminado exitosamente.');
      this.getAll();
    },(error) => {
      console.error(error)
    });
  }

  //DELETE
  async confirmation(data:any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: '¿Desea eliminar el usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            this.delete(data);
          }
        }
      ]
    });
    await alert.present();
  }

}
