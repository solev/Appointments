import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Adviser } from "../models/Adviser";
import { Api } from "../utils/Api";
import { Slot } from "../models/Slot";
import { Subject } from "rxjs/Subject";
import { ChannelService } from "./channel.service";

@Injectable()
export class AdviserService {

    private readonly selected_advisers_key = "selected_advisers_key";

    public advisers: Array<Adviser>;
    public selectedAdvisers: Array<number>;

    public advisersChanged: Subject<any>;

    constructor(private api: Api, private storage: Storage, private channelService: ChannelService) {
        this.advisers = new Array<Adviser>();
        this.selectedAdvisers = new Array<number>();
        this.advisersChanged = new Subject<any>();

        this.channelService.slotChanged.subscribe((slot: Slot) => {
            this.applySlotChange(slot);
        })
    }

    private applySlotChange(slot: Slot) {
        var adviser = this.advisers.find(x => x.id == slot.adviserId);
        if (adviser) {
            if (adviser.Slots != null && adviser.Slots != undefined) {
                var existingSlot = adviser.Slots.find(x => x.id == slot.id);

                if (!existingSlot && slot.status != 1) {
                    this.addSlotToAdviser(adviser, slot);
                } else {
                    if (slot.status != 1) {
                        existingSlot.status = slot.status;
                    }
                    else {
                        this.removeSlotFromAdviser(adviser, existingSlot);
                    }
                }
            }
            else {
                if (slot.status != 1) {
                    this.addSlotToAdviser(adviser, slot);
                }

            }

        }

        this.advisersChanged.next();
    }

    getAdvisers() {
        var input = {
            maxResultCount: 999
        };

        var req = this.api.post("api/services/app/adviser/getall", input).share();

        req.map(res => res.json().result.items)
            .subscribe((res: Array<Adviser>) => {
                this.advisers = res;

                for (let item of this.advisers) {
                    item.slotMaps = new Map<string, Slot>();
                }

                if (this.selectedAdvisers.length == 0) {
                    let maxLen = this.advisers.length > 3 ? 3 : this.advisers.length;
                    for (var i = 0; i < maxLen; i++) {
                        this.selectedAdvisers.push(this.advisers[i].id);
                    }
                }
            });

        return req;
    }

    getSlots(dateFrom: string, dateTo: string) {

        var input = {
            startDate: dateFrom,
            endDate: dateTo,
            adviserIds: this.selectedAdvisers
        }

        var req = this.api.post("api/services/app/slot/getall", input).share();
        req.map(res => res.json().result.items)
            .subscribe((res: Array<Slot>) => {
                this.clearAdviserSlots();
                if (res) {
                    for (let slot of res) {
                        var adviser = this.advisers.find(x => x.id == slot.adviserId);
                        if (adviser) {
                            this.addSlotToAdviser(adviser, slot);
                        }
                    }
                    this.advisersChanged.next();
                }
            });

        return req.map(res => res.json().result.items);
    }

    private addSlotToAdviser(adviser: Adviser, slot: Slot) {
        if (adviser.Slots == null) {
            adviser.Slots = new Array<Slot>();
        }
        adviser.Slots.push(slot);
        adviser.slotMaps.set(this.getFormattedTime(new Date(slot.formattedDate)), slot);
    }

    private clearAdviserSlots() {
        for(let adviser of this.advisers){
            adviser.Slots = new Array<Slot>();
            adviser.slotMaps.clear();
        }
    }

    private removeSlotFromAdviser(adviser: Adviser, slot: Slot) {
        var idx = adviser.Slots.findIndex(x => x.id == slot.id);
        adviser.Slots.splice(idx, 1);
        adviser.slotMaps.delete(this.getFormattedTime(new Date(slot.formattedDate)));
    }

    holdSlot(adviserId: number, time: string) {

        var input = {
            adviserId: adviserId,
            time: time
        };

        return this.api.post("adviser/holdslot", input).map(res => res.json());
    }

    releaseSlot(slot: Slot) {
        return this.api.post("adviser/ReleaseSlot", slot).map(res => res.json()).catch((error: any) => {
            console.log(error);
            return error;
        });
    }

    createAppointment(slot: Slot) {
        return this.api.post("adviser/confirmSlot", slot).map(res => res.json());
    }

    getFormattedTime(date: Date) {
        let dateVal = new Date(date);
        return ('0' + dateVal.getHours()).slice(-2) + ":" + ('0' + dateVal.getMinutes()).slice(-2);
    }
}