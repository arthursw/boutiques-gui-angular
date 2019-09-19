import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { ToolInfo } from './tool.model';
import { EntityService } from './shared/components/entity/entity.abstract.service';
import { ServiceLocator } from './utils/locator.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService extends EntityService<ToolInfo> {

  API_URL = 'http://localhost:8080/tool';

  constructor(private httpClient: HttpClient) {
    super()
    ToolInfo.prototype.service = ServiceLocator.injector.get(ToolService);
  }

  getEntityInstance(entity?: ToolInfo): ToolInfo
  {
    return new ToolInfo();
  }

  search(query: string): Promise<ToolInfo[]> {

    let queryParameters = new HttpParams({encoder: new HttpUrlEncodingCodec()});
    if (query) {
      queryParameters = queryParameters.append('query', <any>query);
    }

    // let headers = this.defaultHeaders;


    // // to determine the Accept header
    // let httpHeaderAccepts: string[] = [
    //     'application/json',
    //     'application/xml'
    // ];
    // const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    // if (httpHeaderAcceptSelected != undefined) {
    //     headers = headers.set('Accept', httpHeaderAcceptSelected);
    // }


    return this.httpClient.get<ToolInfo[]>(`${this.API_URL}/search`,
      {
        params: queryParameters,
      }
    ).toPromise();
  }

  getAll(): Promise<ToolInfo[]> {
    return this.httpClient.get<Array<ToolInfo>>(`${this.API_URL}/all`).toPromise();
  }
}
