import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Member} from '../_models/member';

import { NotificationService } from '../_services/notification.service';
import { MemberService } from '../_services/member.service';
import { AuthService } from '../_services/auth.service';
declare var paypal;  
@Component({templateUrl: 'renew.component.html',

  styleUrls: ['renew.component.css']

})



export class RenewComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;  
  renewForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];
  currentMember: Member;

  product = {
    price: 0.01,
    description: "Standard Membership"
  };

  paidFor = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private memberService: MemberService,
    private notification: NotificationService
  ) {
    this.authService.currentMember.subscribe(x => this.currentMember = x);
  }

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          document.getElementById('pay').style.display='none';
          console.log(order);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
 
  // convenience getter for easy access to form fields
  get f() {
    return this.renewForm.controls; }

  onSubmit() {
    if (!this.paidFor) {
      this.notification.showNotif("Must pay to renew", "dismiss");
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.memberService.renew(this.currentMember)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }
}
