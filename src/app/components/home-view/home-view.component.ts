import { Component, OnInit } from "@angular/core";
import { TrippyApiService } from "../../shared/core/trippy-api.service";

@Component({
  selector: "app-home-view",
  templateUrl: "./home-view.component.html",
  styleUrls: ["./home-view.component.css"]
})
export class HomeViewComponent implements OnInit {
  people;

  constructor(public api: TrippyApiService) {}

  ngOnInit() {}

  async post() {
      this.people = await this.api.getAllUsers();
      console.log(this.people);
  }
}
