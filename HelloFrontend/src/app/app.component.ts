import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from './services/message.service';
import { Message } from './models/message.model';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public messages?: Message[];
  public newMessageText: string = '';
  public greetingText: string = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getGreetings();
    this.getMessages();
  }

  private getGreetings() {
    this.messageService.getGreetings().subscribe(greeting => {
      this.greetingText = greeting;
      console.log('Greeting received:', greeting);
    });
  }

  private getMessages() {
    this.messageService.getMessages().subscribe(mes => this.messages = mes);
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages = this.messages?.filter(message => message.id !== id);
    });
  }

  addMessage(text: string) {
    this.messageService.addMessage(text).subscribe(mes => {
      this.newMessageText = '';
      this.getMessages();
    });
  }
}
