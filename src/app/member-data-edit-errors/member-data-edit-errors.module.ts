import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';

import { MemberDataEditErrorsComponent } from './member-data-edit-errors.component';

@NgModule({
    declarations: [
        MemberDataEditErrorsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TableModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        CheckboxModule,
        CalendarModule,
        OverlayPanelModule,
        DialogModule,
        KeyFilterModule
    ],
    exports: [MemberDataEditErrorsComponent],
    providers: [],
})
export class MemberDataEditErrorsModule { }
