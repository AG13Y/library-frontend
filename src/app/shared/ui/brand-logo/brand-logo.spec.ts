import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLogo } from './brand-logo';

describe('BrandLogo', () => {
  let fixture: ComponentFixture<BrandLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BrandLogo] }).compileComponents();
    fixture = TestBed.createComponent(BrandLogo);
    fixture.detectChanges();
  });

  it('should render the brand name by default', () => {
    expect(fixture.nativeElement.textContent).toContain('GestBook');
  });

  it('should hide the name when showName is false', () => {
    fixture.componentRef.setInput('showName', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('GestBook');
  });
});