import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


interface UserPlan {
  price: string;
  description: string;
  features: string[];
}

interface PlanType {
  student: UserPlan;
  enterprise: UserPlan;
  individual: UserPlan;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  plans: { monthly: PlanType; yearly: PlanType } = {
    monthly: {
      student: {
        price: '10/mo',
        description: 'Student Plan - Affordable monthly option',
        features: ['Access to basic PDF tools', 'Up to 10 Chats per month', 'Single User']
      },
      enterprise: {
        price: '50/mo',
        description: 'Enterprise Plan - Enhanced features for businesses',
        features: ['Advanced PDF tools', 'Unlimited Chats', 'Multi-user access', 'Priority support']
      },
      individual: {
        price: '25/mo',
        description: 'Individual Plan - Ideal for personal use',
        features: ['Standard PDF tools', 'Up to 30 Chats per month', 'Single User']
      },
    },
    yearly: {
      student: {
        price: '100/year',
        description: 'Student Plan - Economical yearly option',
        features: ['All basic PDF tools', 'Up to 20 Chats per month', 'Single User', 'Year-end reports']
      },
      enterprise: {
        price: '500/year',
        description: 'Enterprise Plan - Comprehensive yearly package',
        features: ['All advanced PDF tools', 'Unlimited Chats', 'Multi-user access', 'Dedicated support', 'Customizable tools']
      },
      individual: {
        price: '250/year',
        description: 'Individual Plan - Comprehensive yearly option for personal use',
        features: ['All standard PDF tools', 'Unlimited Chats', 'Single User', 'Custom reports']
      },
    },
  };
  

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Monthly', icon: 'pi pi-calendar', command: () => this.onSelect('monthly') },
      { label: 'Yearly', icon: 'pi pi-calendar', command: () => this.onSelect('yearly') },
    ];

    this.activeItem = this.menuItems[0];
  }

  onSelect(plan: string) {

  }

}
