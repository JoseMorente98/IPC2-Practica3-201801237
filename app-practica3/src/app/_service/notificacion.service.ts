import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  //PROPIEDADES
  private isLoading = false;

  constructor(private alertController: AlertController,
  private loadingController: LoadingController,
  private toastController: ToastController
  ) { }

  async alertMessage(title:any, description:any) {
    const alert = await this.alertController.create({
      header: title,
      message: description,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertToast(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  async alertLoading(msg:string, duration:number) {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: duration,
      message: msg
    }).then((a) => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {
            
          }).catch(error => {
            console.log(error)
          })
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {
      
    });
  }
}
