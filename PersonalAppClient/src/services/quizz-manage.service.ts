import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizzManage } from 'src/shared/model/quizz-manage.interface';
import { ResponseData } from 'src/shared/model/response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizzManageService {

  constructor(private httpClient: HttpClient) { }

  createQuizz(quizzToCreate : QuizzManage) : Observable<ResponseData> {
    return this.httpClient.post(
      environment.baseUri + 'quizz-manage/create-quizz' , quizzToCreate);
  }
}
