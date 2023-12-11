import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Vendedor } from 'src/app/models/vendedor';
import { Router, ActivatedRoute } from '@angular/router';
import { Localidad } from 'src/app/models/localidad';
import { MensajeService } from '../../service/mensaje-service.service'; // Corregir el nombre del servicio

@Component({
  selector: 'app-home',
  templateUrl: './edit-vendedor.component.html',
  styleUrls: ['./edit-vendedor.component.css'],
})
export class EditVendedorComponent implements OnInit {
  localidades: Localidad[] = [];
  vendedores: Vendedor[] = [];
  vendedor: Vendedor | null = null;
  currentVendedorId: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private mensajeService: MensajeService
  ) {}

  ngOnInit(): void {
    this.obtenerLocalidades();
    this.route.params.subscribe((params) => {
      this.currentVendedorId = Number(params['id']);
      this.obtenerVendedores();
    });
  }

  obtenerVendedores() {
    this.apiService.getVendedores().subscribe(
      (vendedores) => {
        this.vendedores = vendedores;
        this.obtenerVendedor();
      },
      (error) => {
        this.mensajeService.mostrarMensajeError('Error al obtener vendedores');
      }
    );
  }

  obtenerVendedor() {
    this.vendedor =
      this.vendedores.find((v) => v.id === this.currentVendedorId) || null;
    
  }
  obtenerLocalidades() {
    this.apiService.getLocalidades().subscribe((localidades) => {
      this.localidades = localidades;
    });
  }

  modificarVendedor() {
    if (this.vendedor) {
      const fechaNacimiento = new Date(this.vendedor.fechaNacimiento);
      const edad = this.calcularEdad(fechaNacimiento);

      if (edad < 18 || edad > 65) {
        this.mensajeService.mostrarMensajeError('La edad debe estar en el rango de 18 a 65 años.');
        return;
      }

      this.apiService
        .updateVendedores(this.currentVendedorId, this.vendedor)
        .subscribe(
          (resultado) => {
            this.mensajeService.mostrarMensajeExito('Vendedor modificado exitosamente');
            console.log('Vendedor modificado exitosamente:', resultado);
          },
          (error) => {
            this.mensajeService.mostrarMensajeError('Error al modificar el vendedor');
            console.error('Error al modificar el vendedor:', error);
          }
        );
    }
  }

  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const tiempoDiferencia = hoy.getTime() - fechaNacimiento.getTime();
    const edad = new Date(tiempoDiferencia).getUTCFullYear() - 1970;
    return edad;
  }
}
