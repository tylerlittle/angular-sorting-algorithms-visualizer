import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarContainerComponent } from './bar-container.component';

describe('BarContainerComponent', () => {
  let component: BarContainerComponent;
  let fixture: ComponentFixture<BarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
