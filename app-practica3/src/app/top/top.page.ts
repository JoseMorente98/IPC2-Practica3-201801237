import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../_service/mensaje.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {
  table:any[];
  table2:any[];
  constructor(
    private mensajeService: MensajeService
  ) { }

  ngOnInit() {
    this.getAllTop5Envia();
    this.getAllTop5Recibe();
  }

  getAllTop5Envia() {
    this.mensajeService.getAllTop5Envia()
    .subscribe((res) => {
      console.log(res)
      this.table = [];
      this.table = res;
    }, (error) => {

    })
  }

  getAllTop5Recibe() {
    this.mensajeService.getAllTop5Recibe()
    .subscribe((res) => {
      console.log(res)
      this.table2 = [];
      this.table2 = res;
    }, (error) => {

    })
  }

}
