import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonPaginationDto} from '../../models/interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';

interface SortingField {
  name: string;
}

@Component({
  selector: 'app-common-pagination',
  templateUrl: './common-pagination.component.html',
  styleUrls: ['./common-pagination.component.scss']
})
export class CommonPaginationComponent implements OnInit {
  @Input('sortingFields') set sortingFieldsSetter(fieldsList: string[]) {
    this.sortingFields = fieldsList.map((field) => {
      return {
        name: field
      };
    });
  }

  @Input('maxSize') maxSize = 1;
  @Input('total') total = 0;

  @Output('onPagination') onPaginationEventEmitter: EventEmitter<CommonPaginationDto> = new EventEmitter();
  public form: FormGroup;
  public sortingFields: SortingField[];
  public currentPage = 0;
  public perPageList = [
    {name: '10'},
    {name: '25'},
    {name: '50'},
    {name: '100'}
  ];

  private defaultQueryParams: CommonPaginationDto = {
    page: '1',
    perPage: '10',
    sortBy: 'name'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.route.queryParams.subscribe((params: any) => {
      if (!this.isCorrect(params)) {
        return this.setPaginationOptions(this.defaultQueryParams);
      }

      this.setPaginationOptions(params);
    });
  }

  public pageChanged(event: any): void {
    this.form.patchValue({
      page: event.page
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      page: [],
      sortBy: [],
      perPage: []
    });

    this.form.valueChanges.subscribe((val: CommonPaginationDto) => {
      this.router.navigate(['.'], {queryParams: val});
      this.onPaginationEventEmitter.emit(val);
    });
  }

  private isCorrect = (params: CommonPaginationDto) => {
    const sortByParameterExists = this.sortingFields.find(item => item.name === params.sortBy);
    const perPageParameterExists = this.perPageList.find(item => item.name === params.perPage);
    return params.page && params.perPage && params.sortBy && sortByParameterExists && perPageParameterExists && !isNaN(+params.page) && !isNaN(+params.perPage);
  };

  private setPaginationOptions(options: CommonPaginationDto) {
    this.form.setValue(options);
    this.currentPage = +options.page;
  }
}
