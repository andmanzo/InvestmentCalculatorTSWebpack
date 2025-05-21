import Component from './base-component';
import { autobind } from '../decorators/autobind';
import { calculateInvestment } from '../util/calculate-investment';
import {
  InvestmentData,
  CalculationResult,
} from '../types/investment';
import { resultsState } from '../state/results-state';

export class InvestmentInput extends Component<HTMLDivElement, HTMLFormElement> {
  initialInput: HTMLInputElement;
  contributionInput: HTMLInputElement;
  returnInput: HTMLInputElement;
  durationInput: HTMLInputElement;

  constructor() {
    super('investment-input', 'app', true, 'user-input');
    this.initialInput = this.element.querySelector('#initial')!;
    this.contributionInput = this.element.querySelector('#contribution')!;
    this.returnInput = this.element.querySelector('#return')!;
    this.durationInput = this.element.querySelector('#duration')!;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.handleSubmit);
  }
  renderContent() {}

  private gatherInput(): InvestmentData {
    return {
      initialAmount: +this.initialInput.value,
      annualContribution: +this.contributionInput.value,
      expectedReturn: +this.returnInput.value,
      duration: +this.durationInput.value,
    };
  }

  @autobind
  private handleSubmit(event: Event) {
    event.preventDefault();
    const data = this.gatherInput();
    const result: CalculationResult = calculateInvestment(data);
    resultsState.setResults(result);
  }
}
