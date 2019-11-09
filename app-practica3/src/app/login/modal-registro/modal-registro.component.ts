import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/_service/notificacion.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
})
export class ModalRegistroComponent implements OnInit {
  private passwordType:string = 'password';
  private passwordShow:boolean = false;
  public data:any = {
    username: '',
    password: '',
    apellido: '',
    nombre: '',
    idTipoUsuario: 2
  }

  constructor(
    private notificationService: NotificacionService,
    private usuarioService: UsuarioService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  //TOGGLE PASSWORD
  togglePassword() {
    if(this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  //SAVE CHANGES
  saveChanges() {
    if(this.data.nombre) {
      if(this.data.apellido) {
        if(this.data.username) {
          if(this.data.password) {
            this.create();
          } else {
            this.notificationService.alertToast("La contraseña es requerida.");
          }
        } else {
          this.notificationService.alertToast("El usuario es requerido.");        
        }
      } else {
        this.notificationService.alertToast("El apellido es requerido.");        
      }
    } else {
      this.notificationService.alertToast("El nombre es requerido.");
    }
  }

  //CREATE
  private create() {
    this.usuarioService.create(this.data)
    .subscribe((res) => {
      this.closeModal();
      console.log(res)
      this.notificationService.alertMessage('Usuario registrado', 'Su registro fue realizado con exito, por favor iniciar sesión.');
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

}
