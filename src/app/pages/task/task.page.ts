import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Task } from "src/app/models/Task";
import { CorteService } from "src/app/services/corte.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.page.html",
  styleUrls: ["./task.page.scss"],
})
export class TaskPage implements OnInit {
  task: Task;
  idCorte:number

  constructor(
    private router: ActivatedRoute,
    private corteService: CorteService
  ) {
    const idTask = this.router.snapshot.paramMap.get("idtask");
    this.idCorte = Number(this.router.snapshot.paramMap.get("idcorte"));
    this.task = this.corteService.getTask(Number(idTask), this.idCorte);
  }

  ngOnInit() {}
}
