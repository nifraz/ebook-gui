import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AdminService } from 'src/services/admin.service';
import { RejectionComponent } from '../rejection/rejection.component';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-get-books-for-verification',
  templateUrl: './get-books-for-verification.component.html',
  styleUrls: ['./get-books-for-verification.component.scss'],
})
export class GetBooksForVerificationComponent implements OnInit {
  baseUrl = environment.baseUrl;

  books: any;
  response: any;
  click = [];
  verify = [];

  counter = 0;

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.service.getAllBooksForVerification().subscribe((data: any) => {
      this.books = data.data;
    });
  }

  onApprove(book: any) {

    this.service.verify(book.bookId, localStorage.getItem('sellerId'), true, null).subscribe((data: any) => {

      this.snackBar.open(data.message, 'ok', { duration: 5000 });
      this.counter = book.bookId;
      this.click[book.bookId] = this.counter;
      this.verify[book.bookId] = 'true';
    });
  }
  onReject(book: any) {
    const dialogRef = this.dialog.open(RejectionComponent, {width: '30%'});
    dialogRef.afterClosed().pipe(
      switchMap((res) => {
        if(localStorage.getItem('reject') != 'reject') {
          this.snackBar.open('Reason is required.', 'ok', { duration: 5000 });
          return of(null);
        }
        
        return this.service.verify(book.bookId, localStorage.getItem('sellerId'), false, localStorage.getItem('description'));
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.snackBar.open(data.message, 'ok', { duration: 5000 });
          this.counter = book.bookId;
          this.click[book.bookId] = this.counter;
          this.verify[book.bookId] = 'false';
        }
      },
      error: err => {
        this.snackBar.open(err.error.message, 'ok', { duration: 5000 });
      }
    });
  }
}
