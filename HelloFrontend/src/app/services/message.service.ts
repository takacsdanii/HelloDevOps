import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Message } from 'app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = `${environment.apiUrl}/api/messages`;

  constructor(private http: HttpClient) { }

  public getMessage(id: number): Observable<Message> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Message>(url);
  }

  public getMessages(message?: string): Observable<Message[]> {
    let url = `${this.baseUrl}`;
    if (message) {
      url = `${this.baseUrl}?messages=${message}`;
    }
    return this.http.get<Message[]>(url);
  }

  public addMessage(text: string): Observable<Message> {
    const url = `${this.baseUrl}?text=${text}`;
    return this.http.post<Message>(url, text);
  }

  public deleteMessage(id: number): Observable<void> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.delete<void>(url);
  }
}
