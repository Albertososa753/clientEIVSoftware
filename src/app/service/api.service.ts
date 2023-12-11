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
  private urlApiVendedores = 'http://localhost:8080/api/vendedores';

  constructor(private http: HttpClient) {}

  public getVendedores(): Observable<any> {
    return this.http.get<any>(this.urlApiGetVendedores);
  }

  public getLocalidades(): Observable<any> {
    return this.http.get<any>(this.urlApiGetLocalidades);
  }

  public postVendedores(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.urlApiVendedores, vendedor);
  }

  public updateVendedores(
    id: number,
    vendedor: Vendedor
  ): Observable<Vendedor> {
    const urlUpdate = `${this.urlApiVendedores}/${id}`;
    return this.http.put<Vendedor>(urlUpdate, vendedor);
  }

  public deleteVendedores(id: string): Observable<{}> {
    const urlDelete = `${this.urlApiVendedores}/${id}`;
    return this.http.delete(urlDelete);
  }
}
