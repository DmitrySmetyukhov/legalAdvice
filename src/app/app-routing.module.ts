import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'questions', loadChildren: './questions-answers/questions-answers.module#QuestionsAnswersModule'},
  {path: '**', redirectTo: 'questions', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
