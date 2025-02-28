import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../getallbooks/getallbooks.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent implements OnInit {
  baseUrl = environment.baseUrl;

constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {}
}
