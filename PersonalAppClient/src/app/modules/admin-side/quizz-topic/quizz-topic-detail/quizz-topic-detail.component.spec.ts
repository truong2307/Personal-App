import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzTopicDetailComponent } from './quizz-topic-detail.component';

describe('QuizzTopicDetailComponent', () => {
  let component: QuizzTopicDetailComponent;
  let fixture: ComponentFixture<QuizzTopicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzTopicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzTopicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
