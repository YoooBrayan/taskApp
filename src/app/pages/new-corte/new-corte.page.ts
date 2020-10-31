import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Corte } from "src/app/models/Corte";
import { Task } from "src/app/models/Task";
import { CorteService } from "src/app/services/corte.service";
import data from "../../../assets/json/data.json";

@Component({
  selector: "app-new-corte",
  templateUrl: "./new-corte.page.html",
  styleUrls: ["./new-corte.page.scss"],
})
export class NewCortePage implements OnInit {
  corte: Corte;
  name: string = "";
  quantity: number = 0;
  description: string = "";
  price: number;
  total: number = 0;

  names: string[] = [];

  tasks: Task[];

  constructor(
    private route: ActivatedRoute,
    private corteService: CorteService,
    private toast: ToastController,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    this.corte = this.corteService.getCorte(id);
    this.tasks = data.find(
      (modelF: any) => modelF.name === this.corte.modelo
    ).tasks;
    this.quantity = this.corte.quantity;
    this.total = this.corte.tasks
      .map((task) => task.price)
      .reduce((a, b) => a + b, 0);

    this.tasks = this.sortJSON(
      JSON.parse(JSON.stringify(this.tasks)),
      "name",
      "asc"
    );
  }

  ngOnInit() {}

  async addTaks() {
    if (this.names.length !== 0 && this.quantity > 0) {
      this.names.map((task) => {
        setTimeout(() => {
          this.price = this.tasks.find((t) => t.name === task).price;
          const newTask = new Task(
            task,
            this.quantity,
            this.description,
            this.quantity * this.price
          );
          this.corte.tasks.push(newTask);
          this.total = this.corte.tasks
            .map((task) => task.price)
            .reduce((a, b) => a + b, 0);
          this.corteService.saveStorage();
        }, 100);
      });
      this.names = [];
      this.description = "";
    } else if (this.name.length === 0) {
      const toast = await this.toast.create({
        message: "Invalid name!!!",
        duration: 2000,
        color: "light",
      });

      toast.present();
    } else if (this.quantity <= 0 || !this.quantity) {
      const toast = await this.toast.create({
        message: "Invalid quantity!!!",
        duration: 2000,
        color: "light",
      });

      toast.present();
    }
  }

  delete(id: number) {
    this.corte.tasks = this.corte.tasks.filter((taks) => taks.id !== id);
    this.total = this.corte.tasks
      .map((task) => task.price)
      .reduce((a, b) => a + b, 0);
    this.corteService.saveStorage();
  }

  view(task: Task) {
    console.log("task", task);
    this.router.navigateByUrl(`/tabs/tab1/task/${task.id}/${this.corte.id}`);
  }

  sortJSON(data: [], key: string, orden: string) {
    return data.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      }

      if (orden === "desc") {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  }
}
