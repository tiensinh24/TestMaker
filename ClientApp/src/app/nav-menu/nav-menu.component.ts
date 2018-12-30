import { Component } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(public auth: AuthService,
    private router: Router) { }


  logout(): boolean {
    if (this.auth.logout()) {
      this.router.navigate(['home']);
    }
    return false;
  }
}
