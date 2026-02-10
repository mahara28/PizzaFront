import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { RequestObject } from '../models/RequestObject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
  ) { }

  openDialog(dialog: ComponentType<any>, metadata?: object, width: string = '68%'): Observable<any> {
    return this.dialog.open(dialog, {
      disableClose: true,
      width: width,
      direction: "ltr",
      autoFocus: false,
      data: metadata,
    }).afterClosed().pipe(map((response) => (response?.data ?? null)));
  }
  openExpandedDialog(dialog: ComponentType<any>, metadata?: object, width: string = '68%', height: string = '35%'): Observable<any> {
    return this.dialog.open(dialog, {
      disableClose: true,
      height: height,
      width: width,
      direction: "ltr",
      autoFocus: true,
      data: metadata,
    }).afterClosed().pipe(map((response) => response.data));
  }



  

}
