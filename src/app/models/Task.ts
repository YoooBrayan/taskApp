import {v4 as uuidv4} from 'uuid'

export class Task {

    id : string;
    name: string;
    quantity: number;
    description: string;
    price: number;

    constructor(name:string, quantity:number, description:string, price:number){
        this.name = name;
        this.quantity = quantity;
        this.id = uuidv4();
        this.description = description;
        this.price = price;
    }
}