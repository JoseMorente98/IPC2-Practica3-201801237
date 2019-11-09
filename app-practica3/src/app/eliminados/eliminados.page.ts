import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../_service/mensaje.service';

@Component({
  selector: 'app-eliminados',
  templateUrl: './eliminados.page.html',
  styleUrls: ['./eliminados.page.scss'],
})
export class EliminadosPage implements OnInit {
  table:any[];
  constructor(
    private mensajeService: MensajeService
  ) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.mensajeService.getAllDelete()
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {
    })
  }

}
