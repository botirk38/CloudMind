import { Component } from '@angular/core'


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  loading = false;
  avatars = Array(4).fill(null);

  goToSignup(){
    this.loading = true;
  }

  goToDemo(){
    
  }


}
