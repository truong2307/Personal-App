import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzTopicComponent } from './quizz-topic.component';

describe('QuizzTopicComponent', () => {
  let component: QuizzTopicComponent;
  let fixture: ComponentFixture<QuizzTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
