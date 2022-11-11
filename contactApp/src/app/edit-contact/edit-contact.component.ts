import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContacts';
import { MyGroup } from '../models/myGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contacts: MyContact[] = {} as MyContact[];
  public contact: any;
  public group: MyGroup[] = [] as MyGroup[];
  public errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
    });
    if (this.contactId) {
      this.contService.getContacts(this.contactId).subscribe(
        (data: MyContact[]) => {
          this.contacts = data;
          this.contact = this.contacts;
          this.loading = false;
          this.contService.getAllGroups().subscribe((data: MyGroup[]) => {
            this.group = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
  editSubmit() {
    if (this.contactId) {
      this.contService.updateContacts(this.contact, this.contactId).subscribe(
        (data: MyContact) => {
          this.router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      );
    }
  }
}
