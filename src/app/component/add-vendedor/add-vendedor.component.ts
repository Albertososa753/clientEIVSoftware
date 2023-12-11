import { Component, OnInit } from '@angular/core';
import { Localidad } from '../../models/localidad'; // Ajusta la ruta según tu estructura
import { Vendedor } from '../../models/vendedor'; // Ajusta la ruta según tu estructura
import { ApiService } from 'src/app/service/api.service';
import { MensajeService } from 'src/app/service/mensaje-service.service';

@Component({
  selector: 'app-add-vendedor',
  templateUrl: './add-vendedor.component.html',
  styleUrls: ['./add-vendedor.component.css'],
})
export class AddVendedorComponent implements OnInit {
  nuevoVendedor: Vendedor = {
    fechaNacimiento: '',
    habilitado: true,
    id: 0,
    localidad: {
      codigoPostal: '',
      id: 0,
      localidad: '',
    },
    nombre: '',
    observaciones: null,
    usuarioLogin: '',
  };
  localidades: Localidad[] = []; 
  fotoSeleccionada: File | null = null; 

  constructor(
    private apiService: ApiService,
    private mensajeService: MensajeService
  ) {}

  ngOnInit() {
    
    this.apiService.getLocalidades().subscribe(
      (data: Localidad[]) => {
        this.localidades = data;
      },
      (error) => {
        this.mensajeService.mostrarMensajeError('Error obteniendo localidades');
        console.error('Error obteniendo localidades:', error);
      }
    );
  }

  agregarVendedor() {
    if (
      !this.nuevoVendedor.usuarioLogin ||
      !this.nuevoVendedor.nombre ||
      !this.nuevoVendedor.habilitado ||
      !this.nuevoVendedor.fechaNacimiento ||
      !this.nuevoVendedor.localidad
    ) {
      this.mensajeService.mostrarMensajeError(
        'Por favor, completa todos los campos requeridos.'
      );
      return;
    }
    const fechaNacimiento = new Date(this.nuevoVendedor.fechaNacimiento);

    this.nuevoVendedor.fechaNacimiento = fechaNacimiento
      .toISOString()
      .slice(0, 10); 

    const edad = this.calcularEdad(fechaNacimiento);
    if (edad < 18 || edad > 65) {
    
      this.mensajeService.mostrarMensajeError(
        'La edad del vendedor debe estar en el rango de 18 a 65 años.'
      );
      return;
    }

    console.log('vendedor', this.nuevoVendedor);
    this.apiService.postVendedores(this.nuevoVendedor).subscribe(
      (vendedorAgregado: Vendedor) => {
        this.mensajeService.mostrarMensajeExito(
          'Vendedor agregado correctamente'
        );
        console.log('Vendedor agregado correctamente:', vendedorAgregado);
      },
      (error) => {
        this.mensajeService.mostrarMensajeError(
          'Error al agregar vendedor. Por favor, intenta nuevamente.'
        );
        console.error('Error al agregar vendedor:', error);
      }
    );
  }
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fotoSeleccionada = fileList[0];
    }
  }
  calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const tiempoDiferencia = hoy.getTime() - fechaNacimiento.getTime();
    const edad = new Date(tiempoDiferencia).getUTCFullYear() - 1970;
    return edad;
  }
  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
    const anio = fecha.getFullYear();

    return `${anio}-${mes}-${dia}`;
  }
}
