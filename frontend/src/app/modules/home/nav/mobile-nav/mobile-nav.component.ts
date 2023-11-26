import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.css']
})
export class MobileNavComponent {
  menuOpen = false;
  loading = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToSignup(){
    this.loading = true;
  }


}
