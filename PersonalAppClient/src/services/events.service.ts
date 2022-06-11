import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseService } from 'src/shared/model/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  addEvent(event: any) : Observable<any>{
    return this.httpClient.post(environment.baseUri + 'events', event);
  }

  getEvents() : Observable<ResponseService> {
    return this.httpClient.get(environment.baseUri + 'events/get-events');
  }
}
