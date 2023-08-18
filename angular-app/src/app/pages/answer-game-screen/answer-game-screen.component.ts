import { Component } from '@angular/core';
import { QuestionsCreationService } from 'src/app/service/questions-creation.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-answer-game-screen',
  templateUrl: './answer-game-screen.component.html',
  styleUrls: ['./answer-game-screen.component.scss']
})
export class AnswerGameScreenComponent {

  statement = '';
  quizCount: number = 0;
  answer?: number;

  constructor(
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.statement = this.quizService.currentQuizStatement;
    this.quizCount = this.quizService.currentQuizCount;
  }

  checkAnswer(){
    if(this.quizService.checkAnswer(this.answer? this.answer: -1)){
      console.log('正解');
    }else{
      console.log('不正解');
    }
    this.statement = this.quizService.currentQuizStatement;
    this.quizCount = this.quizService.currentQuizCount;

    this.answer = undefined;
  }



}
