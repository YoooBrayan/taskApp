import { Component, ViewChild, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";
import { Corte } from "src/app/models/Corte";
import { CorteService } from "src/app/services/corte.service";
import data from "../../../assets/json/data.json";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit{


  ngOnInit(): void {
    console.log("inicio")
  }

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
    /*this.total = this.cortes.tasks.map((task) => task.price).reduce((a, b) => a + b, 0);*/
  }

  /*async newCorte() {
    //this.router.navigateByUrl("/tabs/tab1/newcorte");

    const alert = await this.alert.create({
      header: "New Corte",
      inputs: [
        {
          name: "model",
          type: "text",
          placeholder: "Model",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Submit",
          handler: (data) => {
            if (data.model.length === 0) {
              return;
            }

            const id = this.corteService.newCorte(data.model);

            this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}`);
          },
        },
      ],
    });

    alert.present();
  }*/

  async newModel() {
    //const id = this.corteService.newCorte(this.modelSelect);
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

    //this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}/${this.modelSelect}`);
  }

  getTasks(id: number) {
    this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}`);
    this.isAdd = false;
  }

  delete(id: number) {
    this.cortes = this.corteService.deleteCorte(id);
    this.isAdd = false;
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
          },
        },
        { text: "Cancel", role: "cancel" },
      ],
    });

    alert.present();
  }
}
