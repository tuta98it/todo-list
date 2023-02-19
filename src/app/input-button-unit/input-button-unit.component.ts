import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <p>input-button-unit works! The title is: {{ title }}</p>
    <input
      #inputElementRef
      type="text"
      [value]="title"
      (keyup.enter)="changeTitle_ext(inputElementRef)"
    />

    <button (click)="changeTitle_ext(inputElementRef)">Save</button>
    <!-- <button>Save</button> -->
  `,
  styleUrls: ['./input-button-unit.component.scss'],
})
export class InputButtonUnitComponent implements OnInit {
  title = 'Start: Step 1: Nothing';

  constructor() {
    // // this.title = 'I Love Angular';
    // console.log('in constructor');
    // this.changeTitle('My First Angular App');
    // console.log(this.title);
    // // this.changeTitle('I Love Angular');
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.title = 'This is not the title you are looking for';
    // }, 3000);
  }

  changeTitle(e: Event): void {
    // console.log(event);
    const target = e.target as HTMLInputElement;

    this.title = target.value; // the original functionality still works
  }

  changeTitle_ext(inputElementReference: any) {
    // console.log('inputElementReference = ' + inputElementReference)
    this.title = inputElementReference.value; // the original functionality still works
  }

  generateTitle(): string {
    return 'This title was generated by a method.';
  }
}

function multiply(x: number, y: number) {
  return x * y;
}

let z = multiply(4, 5);
console.log(z);
