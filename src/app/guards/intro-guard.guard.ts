import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../providers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuardGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    const shownIntro = await this.store.getValue('shownIntro');
    if (!shownIntro) {
      this.router.navigateByUrl('/intro');
      return false;

    }
    return true;
  }

  constructor(private router: Router, private store: StorageService) { }


}
