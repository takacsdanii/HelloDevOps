import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public getMessage(): Observable<string> {
    const url = 'https://localhost:7257/api/messages';
    return this.http.get(url, { responseType: 'text' });
  }
}
