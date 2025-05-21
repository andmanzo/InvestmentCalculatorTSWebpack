import { CalculationResult } from '../types/investment';

type ResultsListener = (results: CalculationResult) => void;

class ResultsState {
  private listeners: ResultsListener[] = [];
  private results: CalculationResult = '';

  addListener(listenerFn: ResultsListener) {
    this.listeners.push(listenerFn);
  }

  setResults(res: CalculationResult) {
    this.results = res;
    for (const listenerFn of this.listeners) {
      listenerFn(this.results);
    }
  }
}

export const resultsState = new ResultsState();
