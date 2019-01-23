import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import TrippyApiBaseService from "./TrippyApiBase.service";

@Injectable()
export default class TrippyApiService implements TrippyApiBaseService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) {}

  async sendQuery(query: String): Promise<any> {
    this.http
      .post(this.baseUrl + "/api/query", { query: query })
      .subscribe(response => {
          console.log(response)
          return response.valueOf();
      });
  }
}
