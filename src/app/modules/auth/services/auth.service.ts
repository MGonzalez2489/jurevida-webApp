import { Injectable } from '@angular/core';
import { RequestService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestService: RequestService) {}
}
