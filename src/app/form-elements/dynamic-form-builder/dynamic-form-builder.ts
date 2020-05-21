import {
    ComponentFactoryResolver,
    Directive,
    Input,
    OnInit,
    ViewContainerRef
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import {
    FormElement,
    DatepickerFormat,
    DropdownOptions,
    RadioOptions
} from './../components/gp-input-box/form-element.interface';

import { GpInputBoxComponent } from './../components/gp-input-box/gp-input-box.component';


const PH_INPUT = 'phInput';
const PH_DROPDOWN = 'phDropdown';
const PH_DATEPICKER = 'phDatepicker';
const PH_RADIO = 'phRadio';
const PH_CHECKBOX = 'phCheckbox';

const componentMapper = {

    gpInput: GpInputBoxComponent,

    // phDropdown: PhDropdownComponent,

    // phDatepicker: PhDatepickerComponent,

    // phRadio: PhRadioComponent,

    // phCheckbox: PhCheckboxComponent

};


@Directive({
    selector: '[dynamicFormBuilder]'
})
export class DynamicFormBuilder implements OnInit {

    // Common
    @Input() config: FormElement;
    @Input() parent: FormGroup;
    @Input() controlName: string;
    @Input() readonly: boolean;
    @Input() defaultValue: string;
    @Input() autocomplete: string;
    @Input() placeholder: string;

    // Accessibility
    @Input() forId: string;

    // Drop down specific
    @Input() dropdownOptions: DropdownOptions[];
    @Input() codePropertyName: string;
    @Input() valuePropertyName: string;

    // Date picker
    @Input() minRangeDate: DatepickerFormat;
    @Input() maxRangeDate: DatepickerFormat;
    @Input() startDate: DatepickerFormat;
    @Input() hideLabel = false;

    // Radio
    @Input() required: boolean = undefined;
    @Input() groupName: string;
    @Input() radioOptions: RadioOptions[];

    // Checkbox
    @Input() disabled: boolean;

    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnInit() {

        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.config.type]
        );

        this.componentRef = this.container.createComponent(factory);

        // Common assignment
        this.componentRef.instance.config = this.config;
        this.componentRef.instance.parent = this.parent;
        this.componentRef.instance.controlName = this.controlName ? this.controlName : this.config.controlName;
        this.componentRef.instance.defaultValue = this.defaultValue ? this.defaultValue : this.config.defaultValue;
        this.componentRef.instance.forId = this.forId;

        if (this.config.type === PH_INPUT) {
            this.componentRef.instance.autocomplete = this.autocomplete;
            this.componentRef.instance.placeholder = this.placeholder;
            this.componentRef.instance.readonly = this.readonly;
        }

        if (this.config.type === PH_DROPDOWN) {
            this.componentRef.instance.autocomplete = this.autocomplete;
            this.componentRef.instance.placeholder = this.placeholder;
            this.componentRef.instance.readonly = this.readonly;
        }

        if (this.config.type === PH_DATEPICKER) {
            this.componentRef.instance.minRangeDate = this.minRangeDate;
            this.componentRef.instance.maxRangeDate = this.maxRangeDate;
            this.componentRef.instance.startDate = this.startDate;
            this.componentRef.instance.hideLabel = this.hideLabel;
        }

        if (this.config.type === PH_RADIO) {
            this.componentRef.instance.required = this.required;
            this.componentRef.instance.radioOptions = this.radioOptions;
            this.componentRef.instance.groupName = this.groupName;
        }

        if (this.config.type === PH_CHECKBOX) {
            this.componentRef.instance.disabled = this.disabled;

        }

    }

}
