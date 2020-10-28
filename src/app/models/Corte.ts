
import { Task } from './Task';

export class Corte {

    id : number;
    modelo: string;
    date : Date;
    tasks: Task[];

    constructor(modelo:string){

        this.date = new Date();
        this.id = new Date().getTime();
        this.tasks = [];
        this.modelo = modelo;
    }
}