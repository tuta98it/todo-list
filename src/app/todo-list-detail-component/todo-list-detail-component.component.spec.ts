import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDetailComponentComponent } from './todo-list-detail-component.component';

describe('TodoListDetailComponentComponent', () => {
  let component: TodoListDetailComponentComponent;
  let fixture: ComponentFixture<TodoListDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListDetailComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
