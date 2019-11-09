import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events
  ) {
    this.initializeApp();
    events.subscribe('user:admin', res => {
      this.getAdmin();
    });
    events.subscribe('user:usuario', res => {
      this.getUsuario();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getUsuario() {
    this.appPages = [];
    this.appPages.push({title: 'Mensajes', url: '/home', icon: 'send'});
    this.appPages.push({title: 'Mis Contactos', url: '/list', icon: 'person'});
    this.appPages.push({title: 'Cerrar Sesión', url: '/login', icon: 'log-out'});
  }

  getAdmin() {
    this.appPages = [];
    this.appPages.push({title: 'Mensajes', url: '/home', icon: 'send'});
    this.appPages.push({title: 'Usuario', url: '/usuario', icon: 'person'});
    this.appPages.push({title: 'Conversaciones', url: '/conversacion', icon: 'chatbubbles'});
    this.appPages.push({title: 'Top 5', url: '/top', icon: 'heart-empty'});
    this.appPages.push({title: 'Mensajes Eliminados', url: '/eliminados', icon: 'trash'});
    this.appPages.push({title: 'Chats', url: '/eliminar', icon: 'chatbubbles'});
    this.appPages.push({title: 'Cerrar Sesión', url: '/login', icon: 'log-out'});
  }
}
