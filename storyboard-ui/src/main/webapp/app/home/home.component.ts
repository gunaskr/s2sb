import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { fabric } from 'fabric';
import { AssetService, EntityResponseType } from 'app/entities/asset/service/asset.service';
import { HttpResponse } from '@angular/common/http';
import { IAsset } from 'app/entities/asset/asset.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  account: Account | null = null;
  authSubscription?: Subscription;
  imageUrl: string | null | undefined;
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  public size: any = {
    width: 800,
    height: 500,
  };
  private canvas: fabric.Canvas;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private assetService: AssetService,
    private readonly sanitizer: DomSanitizer
  ) {}

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
    // this.loadCanvasFromJSON();
    this.assetService.query().subscribe((response: HttpResponse<IAsset[]>) => {
      const assets: IAsset[] = response.body as IAsset[];
      assets.forEach(asset => {
        const imageUrl = `data:${asset.imageContentType as string};base64,${asset.image as string}`;
        fabric.Image.fromURL(imageUrl, img => {
          this.canvas.add(img);
        });
      });
    });
    /*this.assetService.find('6061e0d262d76d5134115ba0').subscribe((response: HttpResponse<IAsset>) => {
      this.imageUrl = `data:${(response.body as IAsset).imageContentType as string};base64,${(response.body as IAsset).image as string}`;
      fabric.Image.fromURL(this.imageUrl, img => {
        //this.canvas.add(img);
        this.loadCanvasFromJSON();
      });
    });*/
  }

  saveCanvasToJSON(): void {
    const json = this.canvas.toDatalessJSON();
    localStorage.setItem('Kanvas', JSON.stringify(json));
  }

  loadCanvasFromJSON(): void {
    const CANVAS = localStorage.getItem('Kanvas');

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      // making sure to render canvas at the end
      this.canvas.renderAll();
    });
  }

  confirmClear(): void {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }
}
