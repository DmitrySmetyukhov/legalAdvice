import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPaginationComponent } from './components/common-pagination/common-pagination.component';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    HttpClientModule,
    NgSelectModule
  ],
  declarations: [CommonPaginationComponent],
  exports: [CommonPaginationComponent]
})
export class SharedModule { }
