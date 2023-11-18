import { Component } from '@angular/core'
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

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
