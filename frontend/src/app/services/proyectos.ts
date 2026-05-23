import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {

  private apiUrl = 'http://localhost:3000/proyectos';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }

  createProyecto(data: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, data);

  }

  getProyecto(id: number): Observable<any> {

  return this.http.get<any>(
    `${this.apiUrl}/${id}`
  );

}

updateProyecto(id: number, data: any): Observable<any> {

  return this.http.put<any>(
    `${this.apiUrl}/${id}`,
    data
  );

}
}