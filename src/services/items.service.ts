import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  baseUrl = environment.baseUrl

  constructor(private http : HttpClient) {}

  getItemsPagination(params: string) {
    return this.http.get(`${this.baseUrl}/cards?pageSize=6&page=${params}`)
  }

  getAllItems() {
    return this.http.get(`${this.baseUrl}/cards`)
  }

  getItemById(param: string) {
    return this.http.get(`${this.baseUrl}/cards/${param}`)
  }
}
