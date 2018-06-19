import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, Subscription, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseHttp {

  protected apiPrefix: String = '';
  protected observableCreator = Observable;

  constructor(public http: HttpClient) {
    this.apiPrefix = environment.apiPrefix;
  }
}
