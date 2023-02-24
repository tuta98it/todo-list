import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTodoItemComponent } from './detail-todo-item.component';

describe('DetailTodoItemComponent', () => {
  let component: DetailTodoItemComponent;
  let fixture: ComponentFixture<DetailTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTodoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
