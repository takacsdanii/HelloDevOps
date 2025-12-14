import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = `${environment.apiUrl}/api/messages`;

  constructor(private http: HttpClient) { }

  public getMessage(): Observable<string> {
    const url = `${this.baseUrl}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
