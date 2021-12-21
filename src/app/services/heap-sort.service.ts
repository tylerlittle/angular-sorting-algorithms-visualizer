import { Injectable } from '@angular/core';
import { Bar } from '../models/bar.model';
import { ISortService } from './sort-service.interface';

@Injectable({
  providedIn: 'root',
})
export class HeapSortService implements ISortService {
  private arrayLength = 0;
  private arrayStates: Bar[][] = [];

  constructor() {}

  sort(originalArray: Bar[]): Bar[][] {
    this.arrayStates = [];
    this.arrayStates.push(JSON.parse(JSON.stringify(originalArray)));
    this.heapSort(originalArray);
    return [...this.arrayStates];
  }

  private heapSort(input: Bar[]) {
    this.arrayLength = input.length;
    for (let i = Math.floor(this.arrayLength / 2); i >= 0; i -= 1) {
      input = JSON.parse(JSON.stringify(this.arrayStates[this.arrayStates.length - 1]));
      this.maxHeap(input, i);
    }

    for (let i = input.length - 1; i > 0; i--) {
      input = JSON.parse(JSON.stringify(this.arrayStates[this.arrayStates.length - 1]));
      input.forEach((b: Bar) => {
        b.compare = false;
        return b;
      });
      this.swap(input, 0, i);
      input[0].compare = false;
      input[i].compare = false;
      input[i].final = true;
      this.arrayStates.push(JSON.parse(JSON.stringify(input)));
      this.arrayLength--;

      this.maxHeap(input, 0);
    }
    const previousState = JSON.parse(JSON.stringify(this.arrayStates[this.arrayStates.length - 1]));
    previousState[0].final = true;
    this.arrayStates.push(JSON.parse(JSON.stringify(previousState)));
    return input;
  }

  private maxHeap(input: Bar[], i: number) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    input = JSON.parse(JSON.stringify(input));
    input.forEach((b: Bar) => {
      b.compare = false;
      return b;
    });

    if (input[left]?.value && input[max]?.value && input[left]?.final !== true) {
      input[left].compare = true;
      input[max].compare = true;
      this.arrayStates.push(JSON.parse(JSON.stringify(input)));
    }

    if (left < this.arrayLength && input[left].value > input[max].value) {
      max = left;
    }

    input.forEach((bar: Bar) => {
      bar.compare = false;
      return bar;
    });

    if (input[right]?.value && input[max]?.value && input[right]?.final !== true) {
      input[right].compare = true;
      input[max].compare = true;
      this.arrayStates.push(JSON.parse(JSON.stringify(input)));
    }
    if (right < this.arrayLength && input[right].value > input[max].value) {
      max = right;
    }
    input.forEach((bar: Bar) => {
      bar.compare = false;
      return bar;
    });

    if (max !== i) {
      this.swap(input, i, max);

      this.maxHeap(this.arrayStates[this.arrayStates.length - 1], max);
    }
  }

  private swap(input: Bar[], indexA: number, indexB: number) {
    const previousState = this.arrayStates[this.arrayStates.length - 1];
    input[indexA].compare = true;
    input[indexB].compare = true;
    if (!(previousState[indexA].compare === true && previousState[indexB].compare === true)) {
      this.arrayStates.push(JSON.parse(JSON.stringify(input)));
    }
    const temp = input[indexA];

    input[indexA] = input[indexB];
    input[indexB] = temp;
    this.arrayStates.push(JSON.parse(JSON.stringify(input)));
  }
}
