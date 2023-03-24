import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = '/reset-password';

  constructor(private http: HttpClient) {}

  resetPassword(recipientEmail: string) {
    return this.http.post(this.apiUrl, recipientEmail);
  }
}
