import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";
import { Corte } from "src/app/models/Corte";
import { CorteService } from "src/app/services/corte.service";
import data from "../../../assets/json/data.json";
import { IonSelect } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  @ViewChild("model") modelSelectRef: IonSelect;

  ngOnInit(): void {}

  @ViewChild(IonList) corteL: IonList;

  modelos: any = data;

  isAdd: boolean;
  modelSelect: string;

  cortes: Corte[];

  total: number = 0;

  constructor(
    private corteService: CorteService,
    private router: Router,
    private alert: AlertController
  ) {
    this.cortes = this.corteService.cortes;

    this.isAdd = false;
    this.total = this.cortes
      .map((corte) =>
        corte.tasks.map((task) => task.price).reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);

    this.modelos = this.sortJSON(
      JSON.parse(JSON.stringify(this.modelos)),
      "name",
      "asc"
    );
  }
  async newModel() {
    this.isAdd = false;

    const alert = await this.alert.create({
      header: "Quantity",
      inputs: [
        {
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.modelSelect = "";
          },
        },
        {
          text: "Submit",
          handler: (data) => {
            if (data.quantity.length === 0) {
              this.modelSelect = "";
              return;
            }

            const id = this.corteService.newCorte(
              this.modelSelect,
              data.quantity
            );

            this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}`);
          },
        },
      ],
    });

    alert.present();
  }

  getTasks(id: number) {
    this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}`);
    this.isAdd = false;
  }

  delete(id: number) {
    this.cortes = this.corteService.deleteCorte(id);
    this.isAdd = false;
    this.reload();
  }

  async deleteAll() {
    this.isAdd = false;
    const alert = await this.alert.create({
      header: "Delete All?",
      buttons: [
        {
          text: "Agree",
          handler: () => {
            this.cortes = this.corteService.deleteAll();
            this.reload();
          },
        },
        { text: "Cancel", role: "cancel" },
      ],
    });

    alert.present();
  }

  reload() {
    this.total = this.cortes
      .map((corte) =>
        corte.tasks.map((task) => task.price).reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  }

  sortJSON(data:[], key:string, orden:string) {
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
