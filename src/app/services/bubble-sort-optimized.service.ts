import { Injectable } from '@angular/core';
import { Bar } from '../models/bar.model';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortOptimizedService {
  constructor() {}

  sort(originalArray: Bar[]): Bar[][] {
    const arrayStates: Bar[][] = [];
    const copy = [...originalArray];
    arrayStates.push(copy);
    for (let i = 0; i < arrayStates[i].length; i++) {
      let found = false;
      let swapped = false;
      for (let j = 0; j < arrayStates[i].length - i - 1; j++) {
        const previousState = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
        const newState = previousState.map((state: Bar) => {
          state.compare = false;
          delete state.swap;
          return state;
        });

        if (newState[j] && newState[j + 1]) {
          newState[j].compare = true;
          newState[j + 1].compare = true;
          arrayStates.push(JSON.parse(JSON.stringify(newState)));
          if (newState[j].value > newState[j + 1].value) {
            found = true;
            swapped = true;
            const temp = newState[j];
            newState[j] = newState[j + 1];
            newState[j + 1] = temp;
            newState[j + 1].swap = true;
            arrayStates.push([...newState]);
          }
        }
      }
      const final = JSON.parse(JSON.stringify(arrayStates[arrayStates.length - 1]));
      const finalState = [...final].map((state: Bar) => {
        state.compare = false;
        delete state.swap;
        return state;
      });
      finalState[copy.length - i - 1].final = true;
      arrayStates.push([...finalState]);
      if (!swapped) {
        const finalStateCopy = JSON.parse(JSON.stringify(finalState));
        const endState = finalStateCopy.map((state: Bar) => {
          state.compare = false;
          state.final = true;
          return state;
        });
        arrayStates.push([...endState]);
        break;
      }
    }
    return [...arrayStates];
  }
}
