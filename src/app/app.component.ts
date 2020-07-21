import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ALGORITHMS, ARRAY_TYPES } from './data';
import { Bar } from './models';
import { ArrayGeneratorService, SortFacade } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  algorithmsDataSource = ALGORITHMS;
  arrayTypeDataSource = ARRAY_TYPES;
  isSortBtn = true;
  state: Bar[] = [];

  form = this.fb.group({
    algorithmId: [null, Validators.required],
    arrayTypeId: [null, Validators.required],
  });

  private arrayTypeSelected$: Observable<number> = this.form
    .get('arrayTypeId')
    .valueChanges.pipe(distinctUntilChanged());
  private handler = null;
  private originalState: Bar[] = [];
  private subscription = new Subscription();

  constructor(
    private arrayGeneratorService: ArrayGeneratorService,
    private fb: FormBuilder,
    private sortFacade: SortFacade
  ) {}

  ngOnInit() {
    this.subscription
      .add(
        this.arrayTypeSelected$.subscribe({
          next: (id: number) => {
            this.onArrayTypeIdChange(id);
            this.isSortBtn = true;
          },
        })
      )
      .add(
        this.arrayGeneratorService.generatedArray$.subscribe({
          next: (generatedArray: Bar[]) => {
            this.originalState = generatedArray;
            this.state = generatedArray;
          },
        })
      )
      .add(
        this.sortFacade.arrayStates$.subscribe({
          next: (states: Bar[][]) => {
            this.onStatesUpdated(states);
          },
        })
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onGenerate() {
    const arrayTypeId = this.form.value.arrayTypeId;
    this.arrayGeneratorService.generateArray(arrayTypeId);
    this.isSortBtn = true;
  }

  onSort() {
    if (!this.isSortBtn) {
      this.state = this.originalState;
      this.isSortBtn = true;
      return;
    }
    this.form.disable();
    const selectedAlgorithmId = +this.form.get('algorithmId').value;
    this.sortFacade.sort(selectedAlgorithmId, this.state);
  }

  trackByFn(index: number, item: Bar) {
    return item.value;
  }

  private onArrayTypeIdChange(arrayTypeId: number) {
    this.arrayGeneratorService.generateArray(arrayTypeId);
  }

  private onStatesUpdated(states: Bar[][]) {
    let i = 0;
    this.handler = setInterval(() => {
      const nextState = states[i++ % states.length];
      this.state = nextState;
      if (i === states.length) {
        clearInterval(this.handler);
        this.isSortBtn = false;
        this.form.enable();
      }
    }, 5);
  }
}
