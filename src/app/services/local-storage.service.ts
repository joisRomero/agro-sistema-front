import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private ls = window.localStorage;
  private ss = window.localStorage;
  private JWT_TOKEN = 'JWT_TOKEN';

  constructor(
    // private http: HttpClient
  ) {
    // this.url = `${environment.apiUrlPrueba}/api/v1`;
  }

  public getItem(key: any) {
    let value = this.ss.getItem(key);
    try {
      return JSON.parse(value!);
    } catch (e) {
      return null;
    }
  }

  public setItem(key: any, value: any) {
    value = JSON.stringify(value);
    this.ss.setItem(key, value);
    return true;
  }
  public signout() {
    // this.setUserAndToken(null, null, false);
    localStorage.clear();
    localStorage.clear();
    // this.router.navigateByUrl('signin');
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return this.ss.getItem(this.JWT_TOKEN);
  }

}
