import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment'
import { StorageService } from 'frontend-client-shared-module';
import { Observable } from 'rxjs';
@Injectable()
export class ChatService {
  private authToken;
  private deviceId;
  private userId;
  private currentUser;
  private recentMessagesUrl = '/api/v1/chat/recent_messages';
  private sendMessageUrl = '/api/v1/chat/process_message';
  constructor(private http: HttpClient,
              private storageService: StorageService) {
    this.authToken = this.storageService.localStorage.retrieve('tfauth-token');
    this.deviceId = this.storageService.localStorage.retrieve('tfdevice-id');
    this.userId = this.storageService.localStorage.retrieve('tfuser-id');
    this.currentUser = this.storageService.localStorage.retrieve("tfcurrent-user");
  }

  getRecentChatMessages(): Observable<Object>{
    const url = this.getRecentMessagesUrl();
    return this.http.post(url,null,{headers:this.getHeaders()}).map((response)=>{return response});
  }
  getHeaders(){
    return {
      'Authorization': 'Bearer ' + this.authToken,
      'Content-Type': 'application/json',
      'X-FourkitesDeviceId': this.deviceId,
      'X-FourkitesUserId': this.userId,
    };
  }
  sendMessage(messageContent):Observable<Object>{
    let params: {[key: string]: any} = { interceptorOptions : { hideLoader: true } };
    const url = this.getsendMessageUrl();
    return this.http.post<Object>(url,JSON.stringify({"message":messageContent}),{headers:this.getHeaders(),params}).map((response)=>{return response});
  }
  getRecentMessagesUrl(){
    return `${environment.chatServiceUrl}${this.recentMessagesUrl}`;
  }
  getsendMessageUrl(){
    return `${environment.chatServiceUrl}${this.sendMessageUrl}`;
  }
}
