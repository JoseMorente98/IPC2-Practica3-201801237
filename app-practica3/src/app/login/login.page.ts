import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { ModalRegistroComponent } from './modal-registro/modal-registro.component';
import { UsuarioService } from '../_service/usuario.service';
import { Router } from '@angular/router';
import { NotificacionService } from '../_service/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private passwordType:string = 'password';
  private passwordShow:boolean = false;
  public data = {
    username: '',
    password: ''
  }

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private router: Router,
    private notificationService: NotificacionService,
    public events: Events,
  ) { }

  ngOnInit() {
  }

  logIn() {
    if(this.data.username) {
      if(this.data.password) {
        this.create();
      } else {
        this.notificationService.alertToast("La contraseña es requerida.");        
      }
    } else {
      this.notificationService.alertToast("El usuario es requerido.");
    }
  }

  //CREATE
  private create() {
    this.usuarioService.auth(this.data)
    .subscribe((res) => {
      if(res[0]) {
        console.log(res[0])
        localStorage.setItem('currentId', res[0].idUsuario);
        localStorage.setItem('currentNombre', res[0].nombre);
        localStorage.setItem('currentApellido', res[0].apellido);
        localStorage.setItem('currentConexion', res[0].conexion);
        if(res[0].idTipoUsuario == 1) {
          this.router.navigate(['usuario'])
          this.events.publish('user:admin');
        } else {
          this.router.navigate(['home'])
          this.events.publish('user:usuario');
        }
      } else {
        this.notificationService.alertToast("El usuario o contraseña es incorrecto.");
      }      
      //this.router.navigate(['home'])
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalRegistroComponent
    });
    modal.onDidDismiss().then((data) => {
      //DATOS
    });
    return await modal.present();
  }

}
