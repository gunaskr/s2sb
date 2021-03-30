import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsset } from '../asset.model';
import { AssetService } from '../service/asset.service';
import { AssetDeleteDialogComponent } from '../delete/asset-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-asset',
  templateUrl: './asset.component.html',
})
export class AssetComponent implements OnInit {
  assets?: IAsset[];
  isLoading = false;

  constructor(protected assetService: AssetService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.assetService.query().subscribe(
      (res: HttpResponse<IAsset[]>) => {
        this.isLoading = false;
        this.assets = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAsset): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(asset: IAsset): void {
    const modalRef = this.modalService.open(AssetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asset = asset;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
