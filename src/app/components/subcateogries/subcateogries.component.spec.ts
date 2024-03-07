import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcateogriesComponent } from './subcateogries.component';

describe('SubcateogriesComponent', () => {
  let component: SubcateogriesComponent;
  let fixture: ComponentFixture<SubcateogriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcateogriesComponent]
    });
    fixture = TestBed.createComponent(SubcateogriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
