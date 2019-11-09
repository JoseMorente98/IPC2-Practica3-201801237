import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'mensajes/:id', loadChildren: './mensajes/mensajes.module#MensajesPageModule' },
  { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule' },
  { path: 'conversacion', loadChildren: './conversacion/conversacion.module#ConversacionPageModule' },
  { path: 'top', loadChildren: './top/top.module#TopPageModule' },
  { path: 'eliminados', loadChildren: './eliminados/eliminados.module#EliminadosPageModule' },
  { path: 'eliminar', loadChildren: './eliminar/eliminar.module#EliminarPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
