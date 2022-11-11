import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { MyContact } from '../models/myContacts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contacts: MyContact[] = {} as MyContact[];
  public contact: any;
  public errorMessage: string | null = null;
  constructor(
    private contService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    this.loading = true;
    if (this.contactId) {
      this.contService.getContacts(this.contactId).subscribe(
        (data: MyContact[]) => {
          this.contacts = data;
          this.contact = this.contacts;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }

  isNotEmpty() {
    return Object.keys(this.contacts).length > 0;
  }
}
