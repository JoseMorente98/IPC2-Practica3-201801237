import { Component } from '@angular/core';
import { UsuarioService } from '../_service/usuario.service';
import { MensajeService } from '../_service/mensaje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  table:any[];

  constructor(
    private mensajeService: MensajeService,
    private router: Router
  ) {
    this.getAll();
  }

  getAll() {
    this.mensajeService.getAllReceiver(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {
    })
  }

  goToRoute(route:string) {
    this.router.navigate([`${route}`])
  }

}
