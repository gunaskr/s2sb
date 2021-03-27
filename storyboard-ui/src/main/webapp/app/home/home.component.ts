import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { fabric } from 'fabric';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  public size: any = {
    width: 800,
    height: 500,
  };
  private canvas: fabric.Canvas;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
    fabric.Image.fromURL('../../content/images/jhipster_family_member_0_head-192.png', aImg => {
      // Scale down our image size
      // aImg.scale(0.5);
      this.canvas.add(aImg);
    });
  }
}
