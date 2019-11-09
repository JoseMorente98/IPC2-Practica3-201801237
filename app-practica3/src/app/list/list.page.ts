import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_service/usuario.service';
import { ModalController } from '@ionic/angular';
import { ModalMensajeComponent } from './modal-mensaje/modal-mensaje.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public table:any[];

  constructor(
    private usuarioService: UsuarioService,
    private modalController: ModalController
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

  async presentModal(id:number) {
    const modal = await this.modalController.create({
      component: ModalMensajeComponent,
      componentProps: {
        idUsuario: id
      }
    });
    modal.onDidDismiss().then((data) => {
      //DATOS
    });
    return await modal.present();
  }
}
