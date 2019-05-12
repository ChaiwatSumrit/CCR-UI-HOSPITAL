// import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions } from '@angular/http';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
//Page
import { CcrDocumentService } from './service/ccrdocument.service';
import { ProxyCcrDocumentService } from './service/proxyccrdocument.service';

import { CreateComponent } from './create/create.component';

import { NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app.routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { SaveComponent } from './save/save.component';
import { InquireComponent } from './inquire/inquire.component';
import { ProxyCreateComponent } from './proxy.create/proxy.create.component';
import { ProxyInquireComponent } from './proxy.inquire/proxy.inquire.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    SignInComponent,
    SaveComponent,
    InquireComponent,
    ProxyCreateComponent,
    ProxyInquireComponent

  ],
  imports: [
    HttpModule, CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutingModule),
    NgxLoadingModule
  ],
  providers: [CcrDocumentService,ProxyCcrDocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
