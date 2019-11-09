import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../_service/mensaje.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from '../_service/notificacion.service';
import { Location } from '@angular/common';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
})
export class MensajesPage implements OnInit {
  table:any[];
  parameter:number;
  usuarioId:string = localStorage.getItem('currentId')
  data = {
    idUsuario1: localStorage.getItem('currentId'),
    idUsuario2: 0,
    cuerpo: ''
  }
  constructor(
    private mensajeService: MensajeService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificacionService,
    private location: Location,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.parameter = +this.activatedRoute.snapshot.paramMap.get('id');
    this.data.idUsuario2 = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getAll(this.parameter);
  }

  getAll(id:number) {
    this.mensajeService.getAllMessages(+localStorage.getItem('currentId'), id)
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
      res.forEach(element => {
        if(element.idUsuario1!=this.usuarioId) {
          console.log(element)
          let data = {
            id: element.idMensaje,
            leido: 1
          }
          this.mensajeService.update(data)
          .subscribe((res) => {
            console.log(res)
            this.getAllMessages(id);
          }, (error) => {
            console.log(error)
          })
        }
      });
    }, (error) => {
    })
  }

  getAllMessages(id:number) {
    this.mensajeService.getAllMessages(+localStorage.getItem('currentId'), id)
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {
    })
  }

  //CREATE
  sendMessage() {
    if(this.data.cuerpo) {
      this.mensajeService.create(this.data)
      .subscribe((res) => {
        this.getAll(this.parameter);
        this.data.cuerpo = "";
        console.log(res)
      }, (error) => {
        console.log(this.data);
        console.error(error);
      });
    } else {
      this.notificationService.alertToast("El cuerpo es requerido.")
    }
  }

  goToBack() {
    this.location.back();
  }

  async presentActionSheet(id:number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de Mensaje',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.confirmation(id);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async confirmation(data:any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Mensaje',
      message: '¿Desea eliminar el mensaje?',
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

  //CREATE
  private delete(id:number) {
    this.mensajeService.delete(id)
    .subscribe((res) => {
      this.getAllMessages(this.parameter);
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

}
