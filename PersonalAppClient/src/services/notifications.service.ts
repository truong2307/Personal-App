import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDatas } from 'src/shared/model/ResponseData.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private httpClient: HttpClient) { }

  getNotifications() : Observable<ResponseDatas> {
    return this.httpClient.get(environment.baseUri + 'notifications/get-notifications');
  }

  deleteNofitication(id: number){
    return this.httpClient.delete(environment.baseUri + `notifications/delete-notification/${id}`)
  }

  updateNofitication(notificationRq: any){
    return this.httpClient.post(environment.baseUri + `notifications/update-notification`, notificationRq);
  }
}
