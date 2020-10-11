import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'benefit-min-max',
  templateUrl: './benefit-min-max.component.html',
  styleUrls: ['./benefit-min-max.component.scss']
})
export class BenefitMinMaxComponent implements OnInit {
  value = '';
  public ClientForm: FormGroup;
  // value = false;
  cities1: any = [];
  ddd: any = [];
  selectedCity1: any;
  selecteddd: any;

  types: any;
  selectedTypes: string[] = ['Apartment', 'Studio'];

  constructor(public form: FormBuilder) {
    this.cities1 = [
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
    ];
    this.ddd = [
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'Istanbul', value: 'IST' },
    ];

    this.types = [
      { label: 'Apartment', value: 'Apartment' },
      { label: 'House', value: 'House' },
      { label: 'Studio', value: 'Studio' }
    ];
  }

  ngOnInit(): void {
    this.ClientForm = this.form.group({
      // mySwitch: [true],
      // rate: [],
      // fullname: ['A'],
      // state: ['S'],
      cities: ['RM'],
      ddd: [this.selectedTypes],

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
  selectItemDD(evt: any) {
    console.log(this.ClientForm.controls.ddd.value);
  }

}
