import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class MensajeService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarMensajeExito(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-exito',
    });
  }

  mostrarMensajeError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: 'snackbar-error',
    });
  }
}
