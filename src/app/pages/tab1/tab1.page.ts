import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";
import { Corte } from "src/app/models/Corte";
import { CorteService } from "src/app/services/corte.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @ViewChild(IonList) corteL: IonList;

  cortes: Corte[];

  constructor(
    private corteService: CorteService,
    private router: Router,
    private alert: AlertController
  ) {
    this.cortes = this.corteService.cortes;
    console.log("cortes",this.cortes)
  }

  async newCorte() {
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
            console.log(data);
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
  }

  getTasks(id: number) {
    this.router.navigateByUrl(`/tabs/tab1/newcorte/${id}`);
  }

  delete(id: number) {
    this.cortes = this.corteService.deleteCorte(id);
  }

  async update(corte: Corte) {
    console.log(corte);

    const alert = await this.alert.create({
      header: "Update Name",
      inputs: [
        {
          type: "text",
          value: corte.modelo,
          placeholder: "Model",
          name: "model",
        },
      ],
      buttons: [
        {
          text: "Update",
          handler: (data) => {
            if (data.model === 0) {
              return;
            }

            corte.modelo = data.model;
            this.corteService.saveStorage();

            this.corteL.closeSlidingItems();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    alert.present();
  }

  async deleteAll() {
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
