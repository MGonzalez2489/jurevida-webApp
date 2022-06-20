import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionModel, UserModel } from '@core/models/database';
import { SESSION_KEY } from '@global/session-keys';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from './request.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private currentSession$: BehaviorSubject<SessionModel> = new BehaviorSubject(
    new SessionModel()
  );
  constructor(
    private storageService: StorageService,
    private requestService: RequestService,
    private router: Router
  ) {}
  getCurrentSession(): Observable<SessionModel> {
    return this.currentSession$.asObservable();
  }
  /**
   * Loads session info from storage if it doesn't exists.
   */
  loadSessionInfo(): void {
    if (
      this.currentSession$.value.token != '' ||
      this.currentSession$.value.user.publicId != ''
    ) {
      return;
    }
    const token = this.getSessionToken();
    const user = this.getSessionUser();
    if (!token || !user) {
      this.existsValidSession();
      return;
    }

    const loadedSession = new SessionModel();
    loadedSession.user = user;
    loadedSession.token = token;
    this.currentSession$.next(loadedSession);
  }
  noSessionExit(): void {
    this.router.navigate(['/auth']);
  }
  initializeSession(session: SessionModel, toRemember: boolean): void {
    this.currentSession$.next(session);

    if (toRemember) {
      this.storageService.createCookie(
        SESSION_KEY.USER,
        JSON.stringify(session.user)
      );
      this.storageService.createCookie(SESSION_KEY.TOKEN, session.token);
    } else {
      this.storageService.createStorageValue(
        SESSION_KEY.USER,
        JSON.stringify(session.user)
      );
      this.storageService.createStorageValue(SESSION_KEY.TOKEN, session.token);
    }
  }
  deleteSession(): void {
    //cookies
    this.storageService.deleteCookie(SESSION_KEY.TOKEN);
    this.storageService.deleteCookie(SESSION_KEY.USER);
    //storage
    this.storageService.deleteStorageValue(SESSION_KEY.TOKEN);
    this.storageService.deleteStorageValue(SESSION_KEY.USER);
    this.currentSession$.complete();
    this.currentSession$.unsubscribe();
    this.currentSession$ = new BehaviorSubject(new SessionModel());
  }
  getSessionToken(): string {
    let token = this.currentSession$.value.token;
    if (!token || token === '') {
      token =
        this.storageService.getStorageValue(SESSION_KEY.TOKEN) ??
        this.storageService.getCookie(SESSION_KEY.TOKEN);
    }

    return token;
  }
  getSessionUser(): UserModel | undefined {
    const user =
      this.storageService.getStorageValue(SESSION_KEY.USER) ??
      this.storageService.getCookie(SESSION_KEY.USER);
    if (!user) {
      return undefined;
    } else {
      return JSON.parse(user);
    }
  }
  existsValidSession(): boolean {
    const token = this.getSessionToken();
    const user = this.getSessionUser();
    if (!token || !user) {
      this.deleteSession();
      return false;
    } else {
      return true;
    }
  }
  validateToken(token: string) {
    return this.requestService.get('/auth/validatetoken', { token });
  }
}
