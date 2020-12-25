import { Injectable } from '@angular/core';
import { Api } from "../utils/Api";
import { Message } from "../models/Message";
import { Observable } from "rxjs/Observable";
import { ChannelService } from "./channel.service";
import { Subject } from "rxjs/Subject";


@Injectable()
export class MessageService {
    public messagesChanged: Subject<any>;
    public readonly msgsPerPage: number = 15;
    public messages: Array<Message>;

    constructor(private api: Api, private channelService: ChannelService) {
        this.messages = new Array<Message>();
        this.messagesChanged = new Subject<any>();
        this.channelService.messageReceived.subscribe(() => {
            this.getMessages(1, true).subscribe(res=>{
                this.messagesChanged.next();
            })
        });
    }

    getMessages(page?: number, isRefresh: boolean = false): Observable<Array<Message>> {

        let input = {
            maxResultCount: this.msgsPerPage,
            skipCount: 0
        }

        console.log(page);

        if (page != null && page != undefined && page > 1) {
            input.skipCount = (page - 1) * this.msgsPerPage;
        }

        console.log(input);

        var req = this.api.post("api/services/app/message/getall", input).share();

        req.map(res => res.json().result.items)
            .subscribe((res: Array<Message>) => {
                if (isRefresh) {
                    let newMessages = new Array<Message>();
                    for (let item of res) {
                        var exists = this.messages.find(x => x.id == item.id);
                        if (exists == null) {
                            newMessages.push(item);
                        }
                    }
                    this.messages = newMessages.concat(this.messages);
                }
                else
                    this.messages = this.messages.concat(res);
            });

        return req.map(res => res.json().result.items);
    }

    markAsRead(id: number) {
        var input = {
            id: id
        };

        return this.api.post("api/services/app/message/markasread", input);
    }
}