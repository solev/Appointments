import { Injectable } from '@angular/core';
import { Api } from "../utils/Api";
import { Setting } from "../models/Setting";

@Injectable()
export class SettingService {

    public holdTime: number;
    public daysInAdvance: number;

    public startTime: string;
    public endTime: string;

    public availableColor: string;
    public withheldColor: string;
    public bookedColor: string;
    public notAvailableColor: string;

    constructor(private api: Api) {

    }

    getAllSettings() {
        this.api.post("api/services/app/applicationSettings/getallsettings", null)
            .map(res => res.json())
            .subscribe(res => {
                console.log(res);
                if (res.result) {
                    for (let item of res.result) {
                        if (item.name == "HoldTime") {
                            this.holdTime = +item.value;
                        }
                        else if (item.name == "DaysInAdvance") {
                            this.daysInAdvance = +item.value;
                        }
                        else if (item.name == "StartTime") {
                            this.startTime = item.value;
                        }
                        else if (item.name == "EndTime") {
                            this.endTime = item.value;
                        }
                        else if (item.name == "AvailableColor") {
                            this.availableColor = item.value;
                        }
                        else if (item.name == "WithheldColor") {
                            this.withheldColor = item.value;
                        }
                        else if (item.name == "BookedColor") {
                            this.bookedColor = item.value;
                        }
                        else if (item.name == "NotAvailableColor") {
                            this.notAvailableColor = item.value;
                        }
                    }
                }
            });
    }

}