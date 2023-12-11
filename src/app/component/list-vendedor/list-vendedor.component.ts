import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Vendedor } from 'src/app/models/vendedor';
import { Router } from '@angular/router';
import { MensajeService } from '../../service/mensaje-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './list-vendedor.component.html',
  styleUrls: ['./list-vendedor.component.css'],
})
export class ListVendedorComponent implements OnInit {
  dataSource: any[] = [];
  localidades: any[] = [];
  vendedores: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerLocalidades();
    this.obtenerVendedores();
  }

  obtenerVendedores() {
    this.apiService.getVendedores().subscribe(
      (vendedores) => {
        this.vendedores = vendedores;
        this.dataSource = vendedores;
      },
      (error) => {
        this.mensajeService.mostrarMensajeError('Error al obtener vendedores');
      }
    );
  }

  obtenerLocalidades() {
    this.apiService.getLocalidades().subscribe((localidades) => {
      this.localidades = localidades;
    });
  }

  editarVendedor(id: string) {
    console.log(id);
  }

  eliminarVendedor(id: string) {
    this.apiService.deleteVendedores(id).subscribe(
      () => {
        this.mensajeService.mostrarMensajeExito('Vendedor eliminado exitosamente');
        this.vendedores = this.vendedores.filter((vendedor) => vendedor.id !== id);
        this.dataSource = this.vendedores;
      },
      (error) => {
        this.mensajeService.mostrarMensajeError('Error al eliminar el vendedor');
        console.error('Error al eliminar el vendedor:', error);
      }
    );
  }

  agregarVendedor() {
    this.router.navigate(['/nuevo-vendedor']);
  }
}
