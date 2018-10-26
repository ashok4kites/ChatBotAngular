import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ERROR_TYPES } from '../../constants/error.constants';
import { URLService } from '../../../../services/url.service';

@Component({
  selector: 'error-frame',
  templateUrl: './error-frame.component.html',
  styleUrls:['./error-frame.component.scss'],
})

export class ErrorFrameComponent implements OnInit {

 @Input('error') error: {[key :string]: any}

  public errorImage: string;
  public fromDashboard: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private urlService: URLService
  ){

  }
  ngOnInit() {

    let fromPage = this.route.snapshot.queryParams? this.route.snapshot.queryParams.from: "";
    this.fromDashboard = fromPage == 'home';
    let error = this.route.snapshot.paramMap.get('code');
    this.errorImage = ERROR_TYPES[error];
  }


}
