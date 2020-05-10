import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService {
  private testArray = [
    { compare: false, final: false, value: 10 },
    { compare: false, final: false, value: 9 },
    { compare: false, final: false, value: 8 },
    { compare: false, final: false, value: 7 },
    { compare: false, final: false, value: 6 },
    { compare: false, final: false, value: 5 },
    { compare: false, final: false, value: 4 },
    { compare: false, final: false, value: 3 },
    { compare: false, final: false, value: 2 },
    { compare: false, final: false, value: 1 },
  ];
  private array = [];
  private arrayStates = [];
  stateUpdated = new BehaviorSubject(null);
  constructor() {}

  getArray() {
    this.array = [...this.testArray];
    this.stateUpdated.next([...this.array]);
    // const generatedArray = [];
    // for (let i = 0; i < 10; i++) {
    //   const num = Math.round(Math.random() * 100);
    //   generatedArray.push(num);
    // }
    // this.array = generatedArray;
    // this.arrayUpdated.next([...this.array]);
  }

  sort() {
    const copy = [...this.array];
    this.arrayStates.push(copy);
    for (let i = 0; i < this.arrayStates[i].length; i++) {
      let found = false;
      for (let j = 0; j < this.arrayStates[i].length - i - 1; j++) {
        const copyState = JSON.parse(
          JSON.stringify(this.arrayStates[this.arrayStates.length - 1])
        );
        const newState = copyState.map((state) => {
          state.compare = false;
          return state;
        });

        if (newState[j] && newState[j + 1]) {
          newState[j].compare = true;
          newState[j + 1].compare = true;
          this.arrayStates.push(JSON.parse(JSON.stringify(newState)));
          if (newState[j].value > newState[j + 1].value) {
            found = true;
            const temp = newState[j];
            newState[j] = newState[j + 1];
            newState[j + 1] = temp;
            this.arrayStates.push([...newState]);
          }
          if (!found) {
            this.arrayStates.push([...newState]);
          }
        }
      }
      const final = JSON.parse(
        JSON.stringify(this.arrayStates[this.arrayStates.length - 1])
      );
      const finalState = [...final].map((state) => {
        state.compare = false;
        return state;
      });
      finalState[copy.length - i - 1].final = true;
      this.arrayStates.push([...finalState]);
    }
    for (let i = 0; i < this.arrayStates.length; i++) {
      setTimeout(() => {
        this.stateUpdated.next(this.arrayStates[i]);
      }, i * 100);
    }
  }
}

export interface Bar {
  value: number;
  compare: boolean;
  final: boolean;
}
