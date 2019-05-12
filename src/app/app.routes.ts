import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component'
import { CreateComponent } from './create/create.component'
import { InquireComponent } from './inquire/inquire.component'
import { SaveComponent } from './save/save.component'

import { ProxyCreateComponent } from './proxy.create/proxy.create.component'
import { ProxyInquireComponent } from './proxy.inquire/proxy.inquire.component'

export const AppRoutingModule: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'create', component: CreateComponent },
    { path: 'inquire', component: InquireComponent },
    { path: 'save', component: SaveComponent},
    { path: 'proxycreate', component: ProxyCreateComponent},
    { path: 'proxyinquire', component: ProxyInquireComponent}
];
