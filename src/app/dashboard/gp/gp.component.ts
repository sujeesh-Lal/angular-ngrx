import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { states, State } from './states';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'gp',
  templateUrl: './gp.component.html',
  styleUrls: ['./gp.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GpComponent),
      multi: true
    }
  ],
})
export class GpComponent implements ControlValueAccessor {

  @Input()
  name: string;
  // tslint:disable-next-line:no-input-rename
  @Input('value')
  val: string;

  stateList: any[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL'
    },
    {
      name: 'Alaska',
      abbreviation: 'AK'
    },
    {
      name: 'American Samoa',
      abbreviation: 'AS'
    },
    {
      name: 'Arizona',
      abbreviation: 'AZ'
    },
    {
      name: 'Arkansas',
      abbreviation: 'AR'
    }];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  selectData(evt) {
    console.log(evt.currentTarget.value);
    this.val = evt.currentTarget.value;
    this.value = evt.currentTarget.value;

  }

}
