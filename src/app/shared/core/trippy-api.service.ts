import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TrippyApiService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) {}

  public getAllUsers(): Promise<any> {
    return this.http
      .get(this.baseUrl + "/api/allusers")
      .toPromise()
      .then(this.extractData);
  }

  private extractData(res) {
    return res.body;
  }
}
