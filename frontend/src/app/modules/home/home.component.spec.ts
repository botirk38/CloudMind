import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { BenefitsComponent } from './benefits/benefits.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { DesktopNavComponent } from './nav/desktop-nav/desktop-nav.component';
import { MenuItemComponent } from './nav/menu-item/menu-item.component';
import { MobileNavComponent } from './nav/mobile-nav/mobile-nav.component';
import { PopoverComponent } from './nav/popover/popover.component';
import { PdfComponent } from './pdf/pdf.component';
import { PlansComponent } from './plans/plans.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MobileNavComponent,
        HeroComponent,
        PdfComponent,
        HomeComponent,
        BenefitsComponent,
        PlansComponent,
        FeaturesComponent,
        FooterComponent,
        DesktopNavComponent,
        MenuItemComponent,
        PopoverComponent],
      imports: [
        CommonModule,
        AvatarGroupModule,
        AvatarModule,
        FileUploadModule,
        FormsModule,
        SharedModule,
        BrowserAnimationsModule,
        ToastModule,
        CardModule,
        TabMenuModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
