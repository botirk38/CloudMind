import { Component } from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  constructor(private router: Router) {}

  loading = false;
  avatars = Array(4).fill(null);

  goToSignup(){
    this.loading = true;
  }

  goToDemo() : void{
    this.router.navigate(['/demo']);
  }


}
