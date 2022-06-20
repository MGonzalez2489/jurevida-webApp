import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private requestService: RequestService) {}

  resetPassword(password: string, publicId: string) {
    return this.requestService.put(`resetPassword/${publicId}`, { password });
  }
}
