import {Component} from '@angular/core';
import {QuestionsAnswersApiService} from '../../providers/questions-answers-api.service';
import {CommonPaginationDto} from '../../shared/models/interfaces';
import {BasePaginationComponent} from '../../shared/components/base-pagination.component';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss']
})
export class QuestionsAnswersComponent extends BasePaginationComponent{
  public sortingFields: string[] = ['name', 'stars'];
  public items: any[];
  public total = 0;

  constructor(private api: QuestionsAnswersApiService) {
    super();
  }

  public onPagination(dto: CommonPaginationDto) {
    this.api.get(dto).subscribe(
      (response: any) => {
        this.items = response.items;
        this.total = response.total_count;
      }
    );
  }
}
