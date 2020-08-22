import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  baseUrl = environment.baseUrl

  constructor(private http : HttpClient) {}

  getItems(params) {
    return this.http.get(`${this.baseUrl}/cards${params}`)
  }
}
