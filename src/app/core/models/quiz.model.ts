export interface Question {
  title: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  title: string;
  description: string;
  questions: Question[];
  correctAnswers: Answer[];
  id?: string;
}
