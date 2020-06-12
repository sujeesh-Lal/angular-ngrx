import {
  Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef,
  ContentChild, TemplateRef, SimpleChanges, OnChanges, ChangeDetectionStrategy
} from '@angular/core';
import { SelectItem } from './selectitem';
import { ObjectUtils } from './objectutils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PngSelectComponent),
  multi: true
};

@Component({
  selector: 'png-select',
  templateUrl: './png-select.component.html',
  styleUrls: ['./png-select.component.scss'],
  providers: [SELECTBUTTON_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PngSelectComponent implements ControlValueAccessor, OnChanges {

  @Input() tabindex = 0;

  @Input() multiple: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() ariaLabelledBy: string;

  @Input() disabled: boolean;

  @Input() dataKey: string;

  @Input() optionLabel: string;

  @Output() optionClick: EventEmitter<any> = new EventEmitter();

  @Output() optionChange: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef) itemTemplate;

  value: any;

  focusedItem: HTMLDivElement;

  iOptions: any[];

  onModelChange: any = () => { };

  onModelTouched: any = () => { };

  constructor(private cd: ChangeDetectorRef) { }

  @Input() get options(): any[] {
    return this.iOptions;
  }

  set options(val: any[]) {
    // NoOp
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.options) {
      this.iOptions = this.optionLabel ? ObjectUtils.generateSelectItems(simpleChange.options.currentValue, this.optionLabel)
        : simpleChange.options.currentValue;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  onItemClick(event, option: SelectItem, index: number) {
    if (this.disabled || option.disabled) {
      return;
    }

    if (this.multiple) {
      const itemIndex = this.findItemIndex(option);
      if (itemIndex !== -1) {
        this.value = this.value.filter((val, i) => i !== itemIndex);
      }
      else {
        this.value = [...this.value || [], option.value];
      }
    }
    else {
      this.value = option.value;
    }

    this.optionClick.emit({
      originalEvent: event,
      option,
      index
    });

    this.onModelChange(this.value);

    this.optionChange.emit({
      originalEvent: event,
      value: this.value
    });
  }

  onFocus(event: Event) {
    this.focusedItem = (event.target as HTMLDivElement);
  }

  onBlur(event) {
    this.focusedItem = null;
    this.onModelTouched();
  }

  isSelected(option: SelectItem) {
    if (this.multiple) {
      return this.findItemIndex(option) !== -1;
    }
    else {
      return ObjectUtils.equals(option.value, this.value, this.dataKey);
    }
  }

  findItemIndex(option: SelectItem) {
    let index = -1;
    if (this.value) {
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i] === option.value) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}
