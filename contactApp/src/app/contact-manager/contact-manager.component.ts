import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContacts';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: MyContact[] = [];
  public errorMessage: string | null = null;
  searchText: string = '';

  constructor(private contService: ContactService) {}

  ngOnInit(): void {
    this.displayAllData();
  }

  displayAllData() {
    this.loading = true;
    this.contService.getAllContacts().subscribe(
      (data: MyContact[]) => {
        this.contacts = data;
        this.loading = false;
        console.log(this.contacts);
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  deleteContact(id: any) {
    if (id) {
      this.contService.deleteContacts(id).subscribe((data) => {
        this.displayAllData();
      });
    }
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText);
  }
}
