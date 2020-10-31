import { Injectable } from "@angular/core";
import { Corte } from "../models/Corte";

@Injectable({
  providedIn: "root",
})
export class CorteService {
  cortes: Corte[] = [];

  constructor() {
    this.getStorage();
  }

  newCorte(modelo: string, quantity:number) {
    const newCorte = new Corte(modelo, quantity);
    this.cortes.push(newCorte);
    this.saveStorage();
    return newCorte.id;
  }

  saveStorage() {
    localStorage.setItem("cortes", JSON.stringify(this.cortes));
  }

  getStorage() {
    if (localStorage.getItem("cortes"))
      this.cortes = JSON.parse(localStorage.getItem("cortes"));
  }

  getCorte(id: string | Number) {
    const idCorte = Number(id);
    return this.cortes.find((corte) => corte.id === idCorte);
  }

  getCortes() {
    return this.cortes;
  }

  deleteCorte(id: number) {
    this.cortes = this.cortes.filter((corte) => corte.id !== id);
    this.saveStorage();
    return this.cortes;
  }

  deleteAll() {
    this.cortes = [];
    localStorage.removeItem("cortes");
    return this.cortes;
  }

  getTask(idTask: string, idCorte: number) {
    return this.cortes
      .find((corte) => corte.id === idCorte)
      .tasks.find((task) => task.id === idTask);
  }
}
