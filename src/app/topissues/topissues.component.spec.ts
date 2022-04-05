import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopissuesComponent } from './topissues.component';

describe('TopissuesComponent', () => {
  let component: TopissuesComponent;
  let fixture: ComponentFixture<TopissuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopissuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
