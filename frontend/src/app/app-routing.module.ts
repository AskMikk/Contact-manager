import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactUpsertComponent } from './components/contact-upsert/contact-upsert.component';

const routes: Routes = [
  {path: '', redirectTo: 'kontaktid', pathMatch: 'full'},
  {path: 'kontaktid', component: ContactsListComponent},
  {path: 'kontakt/lisa', component: ContactUpsertComponent},
  {path: 'kontakt/muuda/:id', component: ContactUpsertComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
