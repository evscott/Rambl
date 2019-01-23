import { Component, OnInit } from "@angular/core";
import TrippyApiBase from "../../shared/core/TrippyApiBase.service";

@Component({
  selector: "app-home-view",
  templateUrl: "./home-view.component.html",
  styleUrls: ["./home-view.component.css"]
})
export class HomeViewComponent implements OnInit {

  constructor(private api: TrippyApiBase) {}

  ngOnInit() {}

  post() {
    this.api.sendQuery('SELECT * FROM Persons');
  }
}
