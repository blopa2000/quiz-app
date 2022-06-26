import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Quiz } from '@models/quiz.model';
import { promises } from 'dns';

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

  async getQuiz(quizID: string | any): Promise<Quiz | any> {
    try {
      const res = await getDoc(doc(this.firestore, 'quizzes', quizID));
      return res.data();
    } catch (error) {
      return error;
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

  async saveResult(
    quizID: string,
    userUID: string,
    results: { name: string; result: string }
  ) {
    try {
      const res = await setDoc(
        doc(this.firestore, 'quizzes', quizID, 'userResults', userUID),
        {
          ...results,
        }
      );
      return true;
    } catch (error) {
      return error;
    }
  }
}
