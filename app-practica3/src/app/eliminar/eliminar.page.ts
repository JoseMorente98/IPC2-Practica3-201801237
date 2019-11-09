import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../_service/mensaje.service';
import { AlertController } from '@ionic/angular';
import { NotificacionService } from '../_service/notificacion.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {
  public table:any[];

  constructor(
    private usuarioService: MensajeService,
    private alertController: AlertController,
    private notificationService: NotificacionService
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
    this.usuarioService.getChat()
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {

    })
  }

    //ELIMINAR
    delete(id:any) {
      this.usuarioService.deleteChat(id)
      .subscribe((res) => {
        this.notificationService.alertMessage('Chat Eliminado', 'El chat fue eliminado exitosamente.');
        this.getAll();
      },(error) => {
        console.error(error)
      });
    }
  
    //DELETE
    async confirmation(data:any) {
      const alert = await this.alertController.create({
        header: 'Eliminar Chat',
        message: '¿Desea eliminar el chat?',
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
