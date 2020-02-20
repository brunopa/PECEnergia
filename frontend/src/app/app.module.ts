import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FichaIndexComponent } from './components/ficha/ficha.index.component';
import { MessagesComponent } from './directives/messages/messages.component';
import { AppRoutingModule } from './settings/app-routing.module';
import { ProprietarioComponent } from './components/proprietario/proprietario.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule, MatNativeDateModule, MatExpansionModule, MatListModule } from '@angular/material';
import { DataCollectionComponent } from './directives/data-table/data-table.component';

import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon"; // <----- Here
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';

import { ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from './directives/form-container/form-container.component';
import { ChildrenGridViewComponent } from './directives/children-grid-view/children-grid-view.component';
import { ListSearchComponent } from './directives/list-search/list-search.component';
import { HttpSpinnerDirective, HttpSpinnerInterceptor } from './directives/http-spinner.directive';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { IndexContainerComponent } from './directives/index-container/index-container.component';
import { LoginComponent } from './components/security/login.component';
import { AuthGuard } from './components/security/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
//import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATA_FORMAT } from 'src/app/services/app-commons.service';
import { ImageUploadComponent } from './directives/image-upload/image-upload.component';
import { WindowRef } from './services/WindowRef ';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { LayoutMessagesComponent } from './directives/messages/layout-messages/layout-messages.component';
import { HeaderModalComponent } from './directives/header-modal/header-modal.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";
import { MaskDateDirective } from './directives/mask-date/mask-date.directive';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { RevisedFieldDirective } from './directives/revised-field/revised-field.directive';
import { ReviseCommandComponent } from './directives/revised-field/revise-command/revise-command.component';
import { ImagemObraComponent } from './directives/imagem-obra/imagem-obra.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProprietarioIndexComponent } from './components/proprietario/proprietario.index.component';
import { FichaComponent } from './components/ficha/ficha.component';



registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    //MessagesComponent,
    ProprietarioIndexComponent,
    ProprietarioComponent,
    FichaIndexComponent,
    FichaComponent,
    DataCollectionComponent,
    FormContainerComponent,
    ChildrenGridViewComponent,
    ListSearchComponent,
    HttpSpinnerDirective,
    IndexContainerComponent,
    LoginComponent,
    MasterPageComponent,
    LayoutMessagesComponent,
    HeaderModalComponent,
    MaskDateDirective,
    RevisedFieldDirective,
    ReviseCommandComponent,
    ImagemObraComponent,
    MainMenuComponent,
  ],
  entryComponents: [
    LayoutMessagesComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    AppRoutingModule,

    //Router,
    //ActivatedRoute,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatDialogModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBnzUKv5LtvAoSUAkQYrvXZbCUE-n0YZQc',
      libraries: ["places"],
      language: "pt_BR"
    })
  ],

  exports: [MatExpansionModule],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpSpinnerInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'pt' },
    MessagesComponent,
    AuthGuard,
    AuthenticationService,
    MatDatepickerModule,
    MatNativeDateModule,
    WindowRef,
    //{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    //{ provide: MAT_DATE_FORMATS, useValue: DATA_FORMAT },

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATA_FORMAT},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
