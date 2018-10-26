import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NguCarouselModule } from '@ngu/carousel';
import { MatTooltipModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { StopPropagationModule } from 'ngx-stop-propagation';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ItemFieldComponent } from './components/item-field/item-field.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ChatBot} from './components/chatbot/chatbot.component';
import { MessageComponent} from './components/chatbot/components/message.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {AvatarModule} from 'ngx-avatar';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    NguCarouselModule,
    MatTooltipModule,
    AutoCompleteModule,
    ButtonModule,
    MatSidenavModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSortModule,
    MatRippleModule,
    CalendarModule,
    AccordionModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    InputSwitchModule,
    MatChipsModule,
    NgxChartsModule,
    KeyFilterModule,
    StopPropagationModule,
    MatToolbarModule,
    ScrollToModule.forRoot(),
    AvatarModule,
    FormsModule
  ],
  declarations: [ItemFieldComponent,CardItemComponent,ChatBot,MessageComponent],
  exports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    NguCarouselModule,
    MatTooltipModule,
    AutoCompleteModule,
    ButtonModule,
    MatSidenavModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSortModule,
    MatRippleModule,
    CalendarModule,
    AccordionModule,
    DropdownModule,
    TabViewModule,
    InputTextModule,
    InputSwitchModule,
    MatChipsModule,
    NgxChartsModule,
    KeyFilterModule,
    StopPropagationModule,
    ItemFieldComponent,
    CardItemComponent,
    MatToolbarModule,
    ScrollToModule,
    ChatBot,
    MessageComponent
  ],
  providers: [
  ]
})
export class UIModule { }
