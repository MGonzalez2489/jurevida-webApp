import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  createStorageValue(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
  deleteStorageValue(key: string): void {
    sessionStorage.removeItem(key);
  }

  getStorageValue(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  createCookie(key: string, value: string): void {
    this.cookieService.set(key, value);
  }
  getCookie(key: string): string {
    return this.cookieService.get(key);
  }
  deleteCookie(key: string): void {
    this.cookieService.delete(key);
  }
}
