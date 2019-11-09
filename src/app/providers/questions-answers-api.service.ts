import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonPaginationDto, CommonResponseDto} from '../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersApiService {
  private basePath = 'https://api.github.com/search/repositories'; // mock data resource

  constructor(private http: HttpClient) {
  }

  public get(paginationDto: CommonPaginationDto): Observable<CommonResponseDto> {
    const params = new HttpParams({fromString: `q=language:js+sort:${paginationDto.sortBy}&order=desc&per_page=${paginationDto.perPage}&page=${paginationDto.page}`});
    return this.http.get<CommonResponseDto>(this.basePath, {params: params});
  }
}
