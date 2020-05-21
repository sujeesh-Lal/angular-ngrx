import { Component, OnInit } from '@angular/core';
import { select, Store, State } from '@ngrx/store';
import { IAppState } from './../../shared-service/models';
import * as dashboardStore from './../store';
import * as rootStore from './../../store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormElement } from 'src/app/form-elements/components/gp-input-box/form-element.interface';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  items$ = this.store.select(dashboardStore.demoItemsList);
  routerData$ = this.store.pipe(select(rootStore.routerState));
  public ClientForm: FormGroup;
  fieldName = 'email';
  inputComponentConfig: FormElement;

  constructor(private store: Store<IAppState>, public form: FormBuilder) { }

  ngOnInit(): void {
    this.setComponentConfig();
    this.store
      .select<any>((state: any) => state) // the complete state this time!!!
      .subscribe((completeState: any) => {
        console.log(JSON.stringify(completeState), 'tttt');
      });

    this.items$.subscribe((data) => {
      console.log(data, 'fff');
    });
    this.routerData$.subscribe((data) => {
      console.log(data);
    });

    this.ClientForm = this.form.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
    });
    console.log(this.ClientForm);

    const validators = [Validators.required, Validators.minLength(5)];
    this.ClientForm.addControl('email', this.form.control(null, validators));
  }

  dispatchAction() {
    this.store.dispatch(new dashboardStore.FetchData());
  }

  setComponentConfig() {
    this.inputComponentConfig = {
      type: 'gpInput',
      className: 'gp-input-box-component',
      label: 'Middlename',
      textAlign: 'text-left',
      required: true,
      readonly: false,
      controlName: 'middleName',
      autocomplete: 'off',
      defaultValue: 'rrr',
      placeholder: '',
      maxLength: 20,
      validationRule: /^[a-zA-Z0-9-]$/i,
      validationMessage: {
        emptyFieldError: 'Error on empty field',
        invalidInputError: 'Error on invalid input',
        customError: 'Business validation error'
      },
      accessibility: {
        forId: 'forId'
      }
    };

  }


}
