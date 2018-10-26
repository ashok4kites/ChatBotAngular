import { Component,AfterViewChecked, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatService} from 'app/shared/services/chat.service';
import {StorageService} from 'frontend-client-shared-module';
@Component({
  selector: 'chatbot',
  templateUrl: 'chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatBot implements OnInit,AfterViewChecked {
  @ViewChild('chats') chatsRef: ElementRef;
  private messages = [];
  private timeoutID;
  private inputMessage = "";
  private helpAction;
  private helpValue;
  private currentUser;
  private userName;
  constructor(private chatService : ChatService,
              private storageService: StorageService) {
    this.timeoutID = null;
    this.helpAction = false;
    this.helpValue = "";
    this.currentUser = this.storageService.localStorage.retrieve("tfcurrent-user");
    if(this.currentUser != null) {
      this.userName = this.currentUser.name;
    }
  }

  ngOnInit() {
    this.chatService.getRecentChatMessages().subscribe((response)=>{
      this.messages = response['messages'];
    });
    this.scrollToBot();
  }
  ngAfterViewChecked(){
    this.scrollToBot();
  }
  scrollToBot(){
    this.chatsRef.nativeElement.scroll(0,this.chatsRef.nativeElement.scrollHeight);
  }
  onSubmitMessage(e) {
    this.resetTimer();
    var userMessage = "";
    if(typeof(e) == "object") {
        e.preventDefault();
        userMessage = this.inputMessage;
    } else {
        userMessage = e;
    }


    if(userMessage.trim().length == 0) {
      alert("I won't accept empty messages. Interact with me!");
      return;
    }

    if(this.helpAction) {
        userMessage = this.helpValue.replace("#", userMessage);
        this.resetHelpAction();
    } else if(!this.isApiHitRequired(userMessage)) {
      this.inputMessage = "";
      return;
    }
    this.messages.push({
      sent_by: "user",
      name: this.userName,
      message: userMessage,
    });
    this.chatService.sendMessage(userMessage).subscribe((response)=>{
      this.setApiResponse(response["message"]);
    });
    this.inputMessage = "";
    this.messageLoadingAnimation();
  }
  resetTimer(){
    window.clearTimeout(this.timeoutID);
    this.startTimer();
  }
  startTimer(){
    this.timeoutID = window.setTimeout(this.goInactive, 120000);
  }
  goInactive(){
    /*popupS.alert({
      title:   'Athena says',
      content: "I'll be right here, if you need me, Just type help"
    });*/
    alert("I'll be right here, if you need me, Just type help");
    window.clearTimeout(this.timeoutID);
  }
  resetHelpAction(){
    this.helpAction = false;
    this.helpValue = "";
  }
  isApiHitRequired(message){
    var m = message.toLowerCase();
    if(m.indexOf("name") >= 0) {
      this.setUserAndBotMessages(message, "I'm Athena, your friendly neighborhood FourKites bot!");
      return false;
    } else if(m.indexOf("bot") >= 0) {
      var responses = ["My lawyer says I don't have to answer that question :-)",
      "I am having a bit of an existential crisis.",
      "Are we human? Or are we denser?"
    ]
      this.setUserAndBotMessages(message, responses[this.getRandomNumber(responses)]);
      return false;
    } else if(m.indexOf("smart") >= 0) {
      this.setUserAndBotMessages(message, "I am less smart since I am in early stages.");
      return false;
    } else if(m.indexOf("how are you") >= 0) {
      responses = [
        "I can't complain! It's against the Company Policy :-)",
        "I'm alright, slight bruises here and there, nothing i can't handle.",
        "I'm running a slight cold, but I'll live!",
        "It's hard out there for a bot.",
        "I hear good things, but you should never listen to rumors.",
        "If I were any better, I'd be you.",
        "Word on the street is that I'm really good."
      ]
      this.setUserAndBotMessages(message, responses[this.getRandomNumber(responses)]);
      return false;
    } else if(m.indexOf("work") >= 0 || m.indexOf("how do you work") >= 0) {
      responses = [
        "Simple amigo! Just type <b>HELP</b> and you'll find out!",
        "Easy peasy , just type <b>HELP</b> and find out!",
        "I sell adult diapers online. Nah just kidding, just type <b>HELP</b> and find out!"
      ]
      this.setUserAndBotMessages(message, responses[this.getRandomNumber(responses)]);
      return false;
    } else if(m.indexOf("do you like") >= 0) {
      responses = [
        "My lips are sealed, pal.",
        "It's not my style to comment about this.",
        "My lawyer says I don't have to answer that question :-)"
      ]
      this.setUserAndBotMessages(message, responses[this.getRandomNumber(responses)]);
      return false;
    } else if(m.indexOf("thank") >= 0) {
      responses = [
        "I am honored my lord.",
        "On your service anytime!",
        "You're welcome."
      ];
      this.setUserAndBotMessages(message, responses[this.getRandomNumber(responses)]);
      return false;
    }

    return true;
  }
  getRandomNumber(array) {
    return Math.floor(Math.random()*array.length);
  }
  setUserAndBotMessages(userMessage, botMessage) {
    this.messages.push({
      sent_by: "user",
      name: this.userName,
      message:userMessage,
    });
    this.setBotMessage(botMessage, this);
    this.inputMessage = "";
  }
  setBotMessage(response, thisReference) {
    var timeouts = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    thisReference.messageLoadingAnimation();
    setTimeout(function(){
      thisReference.messages.splice(thisReference.messages.length - 1);
      thisReference.messages.push({
        sent_by: "bot",
        message: response
      });
    }, timeouts[thisReference.getRandomNumber(timeouts)]);
  }
  messageLoadingAnimation(){
    this.messages.push({
      sent_by: "bot",
      status: "loading"
    });
  }
  setApiResponse(response) {

    this.messages.splice(this.messages.length - 1);
    var button = false;
    var submitMessage = this.onSubmitMessage;
    var setApiResponse = this.setApiResponse;
    var setBotMessage = this.setBotMessage;
    var thisRef = this;
    var setHelpAction =   function(helpAction, helpValue) {
      this.helpAction = helpAction;
      this.helpValue = helpValue;
    };

    if(response.indexOf("button") > 0) {
        button = true;
    }
    this.messages.push({
      sent_by: "bot",
      message: response
    });
    this.inputMessage = "";
    if(button) {
        var buttons = document.getElementsByTagName("button");
        for(var i = 0; i<buttons.length; i++)  {
            buttons[i].addEventListener("click", ()=> {
                var current = document.getElementsByClassName("active");
                if(current.length > 0) {
                    current[0].className = current[0].className.replace("active", "");
                }
            });
        }

    }
}
}
