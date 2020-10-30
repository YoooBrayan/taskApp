export class Task {

    id : number;
    name: string;
    quantity: number;
    description: string;
    price: number;

    constructor(name:string, quantity:number, description:string, price:number){
        this.name = name;
        this.quantity = quantity;
        this.id = new Date().getTime();
        this.description = description;
        this.price = price;
    }
}