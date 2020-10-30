
import { Task } from './Task';

export class Corte {

    id : number;
    modelo: string;
    date : Date;
    tasks: Task[];
    quantity: number;

    constructor(modelo:string, quantity:number){

        this.date = new Date();
        this.id = new Date().getTime();
        this.tasks = [];
        this.modelo = modelo;
        this.quantity = quantity;
    }
}