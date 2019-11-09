import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/_service/notificacion.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss'],
})
export class ModalUsuarioComponent implements OnInit {
  private passwordType:string = 'password';
  private passwordShow:boolean = false;
  public data:any = {
    id: 0,
    username: '',
    password: '',
    apellido: '',
    nombre: '',
    idTipoUsuario: 2
  }

  constructor(
    private notificationService: NotificacionService,
    private usuarioService: UsuarioService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.data.id = this.navParams.get('idUsuario');
    if(this.data.id) {
      this.getSingle(this.data.id);
    }
  }

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
            console.log(this.data)
            if(this.data.id) {
              this.update();
            } else {
              this.create();
            }            
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
      this.modalController.dismiss(res);
      console.log(res)
      this.notificationService.alertMessage('Usuario registrado', 'Usuario registrado con exito.');
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

  //CREATE
  private update() {
    this.usuarioService.update(this.data)
    .subscribe((res) => {
      this.modalController.dismiss(res);
      console.log(res)
      this.notificationService.alertMessage('Usuario actualizado', 'Usuario actualizado con exito.');
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

  //CREATE
  private getSingle(data:any) {
    this.usuarioService.getSingle(data)
    .subscribe((res) => {
      this.data = res;
      this.data.id = res.idUsuario;
    }, (error) => {
      console.log(this.data);
      console.error(error);
    });
  }

}
