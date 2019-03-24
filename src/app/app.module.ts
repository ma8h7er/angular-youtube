import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SectionLoadingComponent} from './components/section-loading/section-loading.component';
import {ApiService} from './services/api.service';
import {YoutubeService} from './services/youtube.service';
import {LocalStorageService} from './services/local-storage.service';
import {HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SectionLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    ApiService,
    YoutubeService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SectionLoadingComponent
  ]
})
export class AppModule { }
