import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCharactersDirective, OnlyDatesDirective, OnlyDecimalsDirective, OnlyLettersDirective, OnlyLettersNumbersDirective, OnlyNumbersDirective } from 'src/app/directives/validations.directive';
import { ClickOutsideDirective } from 'src/app/directives/outside-click-directive';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { GeneralSectionComponent } from './general-section/general-section.component';
import { GeneralButtonComponent } from './general-button/general-button.component';
import { ModalComponent } from './modal/modal.component';
import { GeneralInputComponent } from './general-input/general-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralCheckboxComponent } from './general-checkbox/general-checkbox.component';
import { GeneralAlertComponent } from './general-alert/general-alert.component';
import { GeneralAlertInformationComponent } from './general-alert-information/general-alert-information.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    GeneralSectionComponent,
    GeneralButtonComponent,
    ModalComponent,
    GeneralInputComponent,
    AllCharactersDirective,
    OnlyDatesDirective,
    OnlyDecimalsDirective,
    OnlyLettersDirective,
    OnlyLettersNumbersDirective,
    OnlyNumbersDirective,
    ClickOutsideDirective,
    GeneralCheckboxComponent,
    GeneralAlertComponent,
    GeneralAlertInformationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    GeneralSectionComponent,
    GeneralButtonComponent,
    ModalComponent,
    GeneralInputComponent,
    ClickOutsideDirective,
    GeneralCheckboxComponent,
    GeneralAlertComponent,
    GeneralAlertInformationComponent
  ]
})
export class SharedModule { }
