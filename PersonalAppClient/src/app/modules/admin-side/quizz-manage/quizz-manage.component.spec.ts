import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzManageComponent } from './quizz-manage.component';

describe('QuizzManageComponent', () => {
  let component: QuizzManageComponent;
  let fixture: ComponentFixture<QuizzManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
