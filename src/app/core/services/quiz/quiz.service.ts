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
      console.error(error);
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
      console.error(error);
      return error;
    }
  }

  async saveResult(
    quizID: string,
    userUID: string | undefined,
    results: { name: string; result: string; email: string }
  ) {
    try {
      if (userUID !== undefined) {
        const res = await setDoc(
          doc(this.firestore, 'quizzes', quizID, 'userResults', userUID),
          {
            ...results,
            hasProfile: true,
          }
        );
      } else {
        const findUser = await getDocs(
          query(
            collection(this.firestore, 'quizzes', quizID, 'userResults'),
            where('email', '==', results.email)
          )
        );
        if (findUser.empty) {
          const res = await addDoc(
            collection(this.firestore, 'quizzes', quizID, 'userResults'),
            {
              ...results,
              hasProfile: false,
            }
          );
        } else {
          return {
            state: false,
            message: 'This user has already taken the quiz',
          };
        }
      }

      return {
        state: true,
        message: 'Done',
      };
    } catch (error) {
      console.error(error);
      return { state: false, message: 'Error taking the exam' };
    }
  }
}
