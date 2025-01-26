import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(public http: HttpClient) {

  }
  getData<Type> (url: string) {
    return this.http.get<Type>(url);
  }
  postData(url: string, obj: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, obj, { headers })
  }
  headers = new HttpHeaders({'Content-Type': 'application/json',});
  putData<Type>(url: string, obj: Type) {
    return this.http.put(url, obj, { headers: this.headers });
  }
  
  
  deleteData(url: string) {
    return this.http.delete(url, { headers: this.headers });
  }

  post<Type>(url: string, obj: Type){
    return this.http.post(url, obj);
  }
}
