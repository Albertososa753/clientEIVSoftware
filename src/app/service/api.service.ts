import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApiGetLocalidades = 'http://localhost:8080/api/localidades/todas';
  private urlApiGetVendedores = 'http://localhost:8080/api/vendedores/todos';
  private urlApiPostVendedores = 'http://localhost:8080/api/vendedores/todos';
  private urlApiDeleteVendedores = 'http://localhost:8080/api/vendedores';
  private urlApiGetFotoVendedores = 'http://localhost:8080/api/vendedores';


  constructor(private http: HttpClient) {}

  subirFotoVendedor(id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`${this.urlApiGetFotoVendedores}/${id}/foto`, formData, { headers });
  }

  getFotoVendedor(id: number): Observable<Blob> {
    return this.http.get(`${this.urlApiGetFotoVendedores}/${id}/foto`, { responseType: 'blob' });
  }
  
  public getVendedores(): Observable<any> {
    return this.http.get<any>(this.urlApiGetVendedores);
  }

  public getLocalidades(): Observable<any> {
    return this.http.get<any>(this.urlApiGetLocalidades);
  }

  public postVendedores(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>('http://localhost:8080/api/vendedores/todos', vendedor);
  }

  public updateVendedores(
    id: number,
    vendedor: Vendedor
  ): Observable<Vendedor> {
    const urlUpdate = `${this.urlApiDeleteVendedores}/${id}`;
    console.log('URL de la solicitud PUT:', urlUpdate);
    console.log('Cuerpo de la solicitud PUT:', vendedor);
    return this.http.put<Vendedor>(urlUpdate, vendedor  );
  }

  public deleteVendedores(id: string): Observable<{}> {
    const urlDelete = `${this.urlApiDeleteVendedores}/${id}`;
    console.log(urlDelete, 'borrado desde el service ');
    return this.http.delete(urlDelete);
  }
}
