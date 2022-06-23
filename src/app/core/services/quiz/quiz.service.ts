import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
import { Quiz } from '@models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private firestore: Firestore) {}

  async addQuiz(quiz: Quiz, userUID: string): Promise<boolean> {
    try {
      const res = await addDoc(collection(this.firestore, 'quizzes'), {
        ...quiz,
        userUID,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getQuizzesByUserID(userUID: string, operator: any) {
    try {
      const res = await getDocs(
        query(
          collection(this.firestore, 'quizzes'),
          where('userUID', operator, userUID)
        )
      );
      return res;
    } catch (error) {
      return error;
    }
  }
}
