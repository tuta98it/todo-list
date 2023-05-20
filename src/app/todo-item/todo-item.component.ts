import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { InputButtonUnitComponent } from '../input-button-unit/input-button-unit.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div
        class="wrap-check-text-edit-save-remove flex flex-row align-items-center  justify-content-between"
      >
        <div class="wrap-check-text-edit-save">
          <div
            class="check-text"
            [ngClass]="{ 'bg-done': item.fm_status_completed }"
          >
            <!-- Check box complete to-do -->
            <p-checkbox
              name="groupname"
              value="val1"
              [binary]="
                !(item.fm_status_completed != null
                  ? item.fm_status_completed == true
                    ? true
                    : false
                  : false)
              "
              [(ngModel)]="selectedValues"
              (onChange)="completeItem()"
              inputId="binary"
            ></p-checkbox>

            <!-- title doing -->
            <input
              [disabled]="todo_isExpression"
              class="todo-title ml-1"
              type="text"
              [ngClass]="{
                'todo-complete': item.fm_status_completed,
                'bg-done': item.fm_status_completed,
                'bg-edit': !todo_isEdit
              }"
              [(ngModel)]="item.fm_title"
              (keyup.Enter)="saveItem()"
            />
          </div>

          <!-- Button save-edit -->
          <div class="edit-save-button">
            <!-- Edit and Save button -->

            <button
              *ngIf="this.todo_isExpression"
              class="btn"
              (click)="editItem()"
            >
              <div class="flex flex-direction-row align-items-center">
                <i class="pi pi-pencil mr-2 text-xs"></i>
                <span>Edit</span>
              </div>
            </button>

            <!-- <p-button label="Small" icon="pi pi-check" styleClass="p-button-sm p-button-secondary"></p-button> -->

            <button
              *ngIf="!this.todo_isExpression"
              class="btn ml-2"
              (click)="saveItem()"
            >
              <div class="flex flex-direction-row align-items-center">
                <i class="pi pi-check mr-1 text-xs"></i>
                <span>Save</span>
              </div>
            </button>

            <!-- <p-button label="Small" icon="pi pi-check" styleClass="p-button-sm"></p-button> -->
          </div>
        </div>
        <!-- Remove button -->
        <button class="btn btn-red" (click)="showDialogRemove()">
          <div class="flex flex-direction-row align-items-center">
            <i class="pi pi-trash mr-1 text-xs"></i>
            <span>Remove</span>
          </div>
        </button>

        <!-- <button class="btn btn-red" (click)="removeItem()">Remove</button> -->
      </div>
      <div class="flex align-items-center mt-1 ml-2 text-xs">
        <i class="pi pi-clock mr-2"></i>
        <span
          ><b>Time to creation:</b>
          {{ item.fm_time_creation | date : 'medium' }}</span
        >
      </div>
    </div>
    <!-- Hộp thoại thông báo đồng ý xoá item todo -->
    <p-dialog
          header="Notification"
          [(visible)]="displayDialogRemove"
          [modal]="true"
        >
          <p>Are you sure want to delete this todo item?</p>
          <div class="flex justify-content-around">
            <p-button
              type="button"

              icon="pi pi-trash"
              (click)="cancelRemove()"
              label="Huỷ"
              styleClass="p-button-danger p-button-sm"
            ></p-button>

            <p-button
              type="button"
              icon="pi pi-check"
              (click)="agreeRemove()"
              label="Đồng ý"
              styleClass="p-button-sm"
            ></p-button>
          </div>
        </p-dialog>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: any;
  @Input() todo_item: any;
  @Output() todo_itemChange: EventEmitter<any> = new EventEmitter<any>();

  // isExpression
  // @Input() todo_isExpression!: boolean;
  // @Output() todo_isExpressionChange: EventEmitter<any> = new EventEmitter<any>();

  todo_isExpression = true;

  @Input() todo_isEdit!: boolean;
  selectedValues: string[] = ['val1', 'val2'];

  // Form
  @Input()
  todo_form!: FormGroup;

  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() notification: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  // Ẩn hiện dialog thông báo Remove
  displayDialogRemove = false;
  // Đồng ý xoá item
  isRemove = false;

  ngOnInit() {}
  showDialogRemove() {
    this.displayDialogRemove = true;
  }
  cancelRemove() {
    this.isRemove = false;
    this.displayDialogRemove = false;
  }
  agreeRemove() {
    this.isRemove = true;
    this.removeItem();
    this.displayDialogRemove = false;
  }
  removeItem(): void {
    this.remove.emit(this.item);
    this.notification.emit({
      content: {
        severity: 'warn',
        summary: 'Warning',
        detail: 'You just deleted todo item "' + this.item.fm_title + '"',
      },


      option: 'add'
    });
  }

  editItem() {
    var formattedDate: Date;

    // Set dữ liệu cho giao diện nhập dữ liệu
    this.todo_form.controls['fm_title'].setValue(this.item.fm_title);
    this.todo_form.controls['fm_description'].setValue(
      this.item.fm_description
    );
    formattedDate = new Date(this.item.fm_time_start);
    this.todo_form.controls['fm_time_start'].setValue(formattedDate);
    formattedDate = new Date(this.item.fm_time_deadline);
    this.todo_form.controls['fm_time_deadline'].setValue(formattedDate);
    this.todo_form.controls['fm_priority'].setValue(this.item.fm_priority);
    // this.todo_form.controls['fm_btn_submit'].setValue('Save')
    // Đổi trạng thái nút Submit -> Save trên giao diện Input
    this.todo_form.controls['fm_btn_submit'].setValue(
      !this.todo_form.value.fm_btn_submit
    );

    // Thay đổi tràn thái nút Edit thành Save
    this.todo_isEdit = !this.todo_isEdit;

    //isExpression
    this.todo_isExpression = !this.todo_isExpression;
    // this.todo_isExpressionChange.emit(this.todo_isExpression);

    //Đưa dữ liệu item ra ngoài List manager
    // this.todo_item = this.item;
    this.todo_itemChange.emit(this.item);

    //
  }

  saveItem() {
    if (this.todo_form.value.fm_title != null) {
      this.update.emit({
        item: this.item,
        changes: this.todo_form.value,
      });
    }

    // Đổi nút trên item từ save -> edit
    this.todo_isExpression = !this.todo_isExpression;
    // this.todo_isExpressionChange.emit(this.todo_isExpression);
    // Đổi trạng thái nút Save -> submit trên giao diện Input
    this.todo_form.controls['fm_btn_submit'].setValue(
      !this.todo_form.value.fm_btn_submit
    );

    //Xoá tất cả trường đăng nhập
    this.resetForm();
  }


  resetForm() {
    // Reset value input fiels.
    this.todo_form.controls['fm_title'].setValue(null);
    this.todo_form.controls['fm_description'].setValue(null);
    this.todo_form.controls['fm_time_start'].setValue(null);
    this.todo_form.controls['fm_time_deadline'].setValue(null);
    this.todo_form.controls['fm_priority'].setValue(null);
  }

  completeItem(): void {
    console.log('this.item.completed) == ' + this.item.completed);
    if (!this.item.fm_completed) {
      this.update.emit({
        item: this.item,
        changes: {
          fm_status_completed: !this.item.fm_status_completed,
          fm_time_completed: new Date(),
        },
      });
    } else {
      this.update.emit({
        item: this.item,
        changes: {
          fm_status_completed: !this.item.fm_status_completed,
          fm_time_completed: null,
        },
      });
    }
  }
}
