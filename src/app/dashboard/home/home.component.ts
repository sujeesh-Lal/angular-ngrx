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
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
    ];
  }

  ngOnInit(): void {
    this.ClientForm = this.form.group({
      // mySwitch: [true],
      // rate: [],
      // fullname: ['A'],
      // state: ['S'],
      cities: ['RM'],

    });
    // this.ClientForm.controls.cities.setValue('rome');
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
    this.ClientForm.controls.cities.setValue('IST');
    // console.log(this.ClientForm.controls.fullname.value, 'fn');
    // this.ClientForm.controls.fullname.setValue('C');
    // console.log(this.ClientForm.controls.fullname.value, 'fn');
  }

  selectItem(evt: any) {
    console.log(evt);
  }
}
