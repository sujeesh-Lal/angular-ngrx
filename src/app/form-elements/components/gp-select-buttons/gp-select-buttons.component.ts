import { Component, OnInit, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gp-select-buttons',
  templateUrl: './gp-select-buttons.component.html',
  styleUrls: ['./gp-select-buttons.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GpSelectButtonsComponent),
      multi: true
    }
  ]
})
export class GpSelectButtonsComponent implements ControlValueAccessor {

  // constructor() { }

  // ngOnInit(): void {
  // }

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  // @Input()
  // control: FormControl;

  // tslint:disable-next-line:no-input-rename
  // tslint:disable-next-line:variable-name
  @Input('value') _value = false;
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  switch() {
    this.value = !this.value;
  }

}
