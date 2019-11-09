import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionsAnswersComponent} from './questions-answers/questions-answers.component';
import {QuestionsAnswersRoutingModule} from './questions-answers-routing.module';
import {SharedModule} from '../shared/shared.module';
import {QuestionsAnswersApiService} from '../providers/questions-answers-api.service';

@NgModule({
  imports: [
    CommonModule,
    QuestionsAnswersRoutingModule,
    SharedModule
  ],
  declarations: [QuestionsAnswersComponent],
  providers: [QuestionsAnswersApiService]
})
export class QuestionsAnswersModule {
}
