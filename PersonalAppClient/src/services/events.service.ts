import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseData } from 'src/shared/model/ResponseData.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  addEvent(event: any) : Observable<ResponseData>{
    return this.httpClient.post(environment.baseUri + 'events', event);
  }

  getEvents() : Observable<ResponseData> {
    return this.httpClient.get(environment.baseUri + 'events/get-events');
  }

  deleteEvents(id: number) : Observable<ResponseData> {
    return this.httpClient.delete(environment.baseUri + `events/delete-event/${id}`);
  }

  updateEvents(event: any) : Observable<ResponseData> {
    return this.httpClient.put(environment.baseUri + 'events/update-event', event);
  }
}
