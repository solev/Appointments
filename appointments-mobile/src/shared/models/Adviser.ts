import { Slot } from "./Slot";

export class Adviser {
    public id: number;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public companyName: string;
    public fullName: string;

    public Slots: Array<Slot>;
    public slotMaps: Map<string, Slot>;

    constructor(){
        this.Slots = new Array<Slot>();
        this.slotMaps = new Map<string, Slot>();
    }
}