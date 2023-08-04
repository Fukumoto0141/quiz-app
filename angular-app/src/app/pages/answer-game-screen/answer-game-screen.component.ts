import { Component } from '@angular/core';
import { QuestionsCreationService } from 'src/app/service/questions-creation.service';

@Component({
  selector: 'app-answer-game-screen',
  templateUrl: './answer-game-screen.component.html',
  styleUrls: ['./answer-game-screen.component.scss']
})
export class AnswerGameScreenComponent {

  statement = '';
  quizCount: number = 0;

  constructor(
    private questionCreation: QuestionsCreationService
  ) {}

  ngOnInit(): void {
    let quizInfo = this.questionCreation.createQuestion();
    this.statement = quizInfo.statement;
    this.quizCount = quizInfo.quizCount;
    console.log(quizInfo)
  }

}
