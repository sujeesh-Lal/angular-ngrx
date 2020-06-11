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
  constructor(public form: FormBuilder) { }

  ngOnInit(): void {
    this.ClientForm = this.form.group({
      mySwitch: [true],
      rate: []

    });
    console.log(this.ClientForm);

  }

  submit() {
    // alert(`Value: ${this.ClientForm.controls.mySwitch.value}`);
    console.log(`Value: ${this.ClientForm.controls.mySwitch.value}`);
    console.log(this.ClientForm.controls.rate.value, 'rate');
    this.ClientForm.controls.rate.setValue(1);
  }
}
