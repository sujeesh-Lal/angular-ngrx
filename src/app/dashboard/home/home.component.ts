import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ClientForm: FormGroup;
  value = false;
  cities1: any = [];
  selectedCity1: any;
  constructor(public form: FormBuilder) {
    this.cities1 = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
  }

  ngOnInit(): void {
    this.ClientForm = this.form.group({
      // mySwitch: [true],
      // rate: [],
      // fullname: ['A'],
      state: ['S'],

    });
    // this.ClientForm.controls.rate.setValue(2);
    // this.ClientForm.controls.rate.setValue('B');
    // console.log(this.ClientForm);
    (window as any).gp = this.ClientForm.controls;

  }

  submit() {

    // alert(`Value: ${this.ClientForm.controls.mySwitch.value}`);
    // console.log(`Value: ${this.ClientForm.controls.mySwitch.value}`);
    // console.log(this.ClientForm.controls.rate.value, 'rate');
    // this.ClientForm.controls.rate.setValue(null);
    // console.log(this.ClientForm.controls.rate.value, 'rate');

    console.log(this.ClientForm.controls.fullname.value, 'fn');
    this.ClientForm.controls.fullname.setValue('C');
    console.log(this.ClientForm.controls.fullname.value, 'fn');
  }
}
