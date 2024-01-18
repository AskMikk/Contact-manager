import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent  implements OnInit{

  dataSource = new MatTableDataSource<Contact>();

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  searchTerm: string = '';
  displayedColumns: string[] = ['realName', 'codeName', 'phoneNumber', 'actions'];

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(contacts => {
      console.log(contacts);
      this.dataSource.data = contacts;
    });
  }

  applySearch() {
    this.dataSource.filterPredicate = (data: Contact, filter: string) => {
      return data.realName.toLowerCase().includes(filter) ||
        data.codeName.toLowerCase().includes(filter) ||
        data.phoneNumber.toLowerCase().includes(filter)
    };
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'realName': return this.compare(a.realName, b.realName, isAsc);
        case 'codeName': return this.compare(a.codeName, b.codeName, isAsc);
        case 'phoneNumber': return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
        default: return 0;
      }
    });
  }

  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  deleteContact(contactId: number) {
    this.contactService.deleteContact(contactId).subscribe(() => {
      this.loadContacts();
    });
  }


  editContact(contactId: number) {
    this.router.navigate(['/kontakt/muuda', contactId]);
  }

  addContact() {
    this.router.navigate(['/kontakt/lisa']);
  }
}
