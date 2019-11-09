import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { ModalMensajeComponent } from './modal-mensaje/modal-mensaje.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [
    ListPage,
    ModalMensajeComponent
  ], entryComponents: [
    ModalMensajeComponent
  ]
})
export class ListPageModule {}
