import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { AssetDetailComponent } from './asset-detail.component';

describe('Component Tests', () => {
  describe('Asset Management Detail Component', () => {
    let comp: AssetDetailComponent;
    let fixture: ComponentFixture<AssetDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AssetDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ asset: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(AssetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AssetDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load asset on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asset).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
