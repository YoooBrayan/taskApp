export class Task {

    id : number;
    name: string;
    quantity: number;
    description: string;

    constructor(name:string, quantity:number, description:string){
        this.name = name;
        this.quantity = quantity;
        this.id = new Date().getTime();
        this.description = description;
    }
}