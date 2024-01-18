import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-contact-upsert',
  templateUrl: './contact-upsert.component.html',
  styleUrl: './contact-upsert.component.scss'
})
export class ContactUpsertComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}
  
  contact: Contact = {
    realName: '',
    codeName: '',
    phoneNumber: '',
    isActive: true
  };
  
  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => id ? this.contactService.getContact(id) : of({ realName: '', codeName: '', phoneNumber: '', isActive: true } as Contact))
    ).subscribe(contact => {
      this.contact = contact;
    });
  }

  onSubmit() {
    const operation = this.contact.id 
      ? this.contactService.updateContact(this.contact.id, this.contact)
      : this.contactService.addContact(this.contact);

    operation.subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.error('Error:', error)
    });
  }
}