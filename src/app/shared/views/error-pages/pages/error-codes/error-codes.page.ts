import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERROR_TYPES } from '../../constants/error.constants';

@Component({
  selector: 'error-codes-page',
  styleUrls:['./error-codes.page.scss'],
  templateUrl: './error-codes.page.html',
})

export class ErrorCodesPage implements OnInit {

  public errorImage: string
  public error: string

  constructor(
    private route: ActivatedRoute,
  ){

  }
  ngOnInit() {
    this.error = this.route.snapshot.paramMap.get('code');
    this.errorImage = ERROR_TYPES[this.error];
    console.log(this.errorImage)
  }


}
