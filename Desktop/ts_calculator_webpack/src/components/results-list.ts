import Component from './base-component';
import { resultsState } from '../state/results-state';
import { CalculationResult, InvestmentResult } from '../types/investment';

export class ResultsList extends Component<HTMLDivElement, HTMLElement> {
  constructor() {
    super('results-list', 'app', false, 'results');
    this.configure();
    this.renderContent();
  }

  configure() {
    resultsState.addListener((results) => {
      this.renderResults(results);
    });
  }

  renderContent() {
  }

  private renderResults(results: CalculationResult) {
    const listEl = this.element.querySelector('ul')!;
    listEl.innerHTML = '';

    if (typeof results === 'string') {
      listEl.innerHTML = `<li>${results}</li>`;
      return;
    }

    results.forEach((yr: InvestmentResult) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${yr.year}</strong> – 
        Total: €${yr.totalAmount.toFixed(0)} –
        Contributions: €${yr.totalContributions.toFixed(0)} –
        Interest: €${yr.totalInterestEarned.toFixed(0)}
      `;
      listEl.appendChild(li);
    });
  }
}
