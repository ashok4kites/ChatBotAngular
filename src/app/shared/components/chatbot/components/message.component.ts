import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {

  }
  getMessageClass(){
    return this.data.sent_by === "bot" ? ["left","message"] : ["right","message"];
  }
  getTime(timestamp){
    if(timestamp == null) {
      return 'Now';
    }

    var date = new Date(timestamp);
    var hours = "0" + date.getHours();
    var meridiem = "pm";
    if(parseInt(hours, 10) >= 0 && parseInt(hours, 10) < 12) {
      meridiem = "am";
    }
    var parsedHour = (parseInt(hours, 10))
    hours = (parsedHour == 0) ? "12" : hours;
    hours = (parsedHour >= 13) ? (parsedHour - 12).toString() : hours;
    var minutes = "0" + date.getMinutes();

    return hours.substr(-2) + ':' + minutes.substr(-2) + ' ' + meridiem;
  }
}
