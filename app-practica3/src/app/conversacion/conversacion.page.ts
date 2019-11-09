import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../_service/mensaje.service';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.page.html',
  styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {
  table:any[];

  constructor(
    private mensajeService: MensajeService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.mensajeService.getAllConversacion()
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {

    })
  }

}
