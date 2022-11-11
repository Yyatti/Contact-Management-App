import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyContact } from '../models/myContacts';
import { catchError, Observable, throwError } from 'rxjs';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  //get all contacts
  public getAllContacts(): Observable<MyContact[]> {
    let dataUrl = `${this.baseUrl}/contacts`;
    return this.http
      .get<MyContact[]>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  //get all groups
  public getAllGroups(): Observable<MyGroup[]> {
    let dataUrl = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get one contact
  public getContacts(contactId: string): Observable<MyContact[]> {
    let dataUrl = `${this.baseUrl}/contacts/${contactId}`;
    return this.http
      .get<MyContact[]>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  //create new contact
  public createContacts(contact: MyContact): Observable<MyContact> {
    let dataUrl = `${this.baseUrl}/contacts`;
    return this.http
      .post<MyContact>(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }

  //updating existing contacts
  public updateContacts(
    contact: MyContact,
    contactId: string
  ): Observable<MyContact> {
    let dataUrl = `${this.baseUrl}/contacts/${contactId}`;
    return this.http
      .put<MyContact>(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }

  //deleting contacts
  public deleteContacts(contactId: string): Observable<MyContact> {
    let dataUrl = `${this.baseUrl}/contacts/${contactId}`;
    return this.http
      .delete<MyContact>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  //handling errors
  public handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    //client side error handling
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      //server side error
      errorMsg = `Status: ${error.status}\n Message: ${error.message}`;
    }
    return throwError(errorMsg);
    //will return error message
  }
}
