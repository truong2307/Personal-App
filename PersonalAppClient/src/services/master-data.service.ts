import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDatas } from 'src/shared/model/response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private httpClient: HttpClient) { }

  getEvents() : Observable<ResponseDatas> {
    return this.httpClient.get(environment.baseUri + 'master-data/get-roles');
  }
}
