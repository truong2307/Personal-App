import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuizzTopic } from 'src/shared/model/quizz-topic.interface';
import { ResponseData, ResponseDatas } from 'src/shared/model/response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private httpClient: HttpClient) { }

  getRoles() : Observable<ResponseDatas> {
    return this.httpClient.get(environment.baseUri + 'master-data/get-roles');
  }

  getQuizzTopics(pageIndex: number, pageSize: number) : Observable<ResponseDatas> {
    return this.httpClient.get(environment.baseUri + `master-data/get-quizz-topics/${pageIndex}/${pageSize}`);
  }

  getAllQuizzTopics() : Observable<ResponseDatas> {
    return this.httpClient.get(environment.baseUri + 'master-data/get-all-quizz-topics');
  }

  createQuizzTopics(quizzTopic: QuizzTopic) : Observable<ResponseData> {
    return this.httpClient.post(environment.baseUri + 'master-data/create-quizz-topics', quizzTopic);
  }

  updateQuizzTopics(quizzTopic: QuizzTopic) : Observable<ResponseData> {
    return this.httpClient.put(environment.baseUri + 'master-data/update-quizz-topics', quizzTopic);
  }

  deleteQuizzTopics(id: number) : Observable<ResponseData> {
    return this.httpClient.delete(environment.baseUri + `master-data/delete-quizz-topics/${id}`);
  }
}
