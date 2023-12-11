import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendedorComponent } from './component/add-vendedor/add-vendedor.component';
import { EditVendedorComponent } from './component/edit-vendedor/edit-vendedor.component';
import { HomeComponent } from './component/home/home.component';
import { ListVendedorComponent } from './component/list-vendedor/list-vendedor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nuevo-vendedor', component: AddVendedorComponent },
  { path: 'editar-vendedor/:id', component: EditVendedorComponent },
  { path: 'lista-vendedores', component: ListVendedorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
