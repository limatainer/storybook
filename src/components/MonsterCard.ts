import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import NoImage from '/notFound.png';

@customElement('monster-card')
export class MonsterCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) imageUrl = '';
  @property({ type: String }) type = '';
  @property({ type: Boolean }) clickable = true;

  static styles = css`
    .monster-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      height: 250px; 
      display: flex; 
      flex-direction: column;
      justify-content: space-between;
    }

    .monster-card img {
      max-height: 120px; 
      object-fit: contain; 
    }

    .monster-card h3 {
      font-size: 18px;
      margin: 8px 0 4px 0;
    }

    .monster-card p {
      font-size: 14px;
      margin: 0;
    }

    .monster-card:hover {
      transform: scale(1.05);
    }

    .fire { border-color: #f00; }
    .water { border-color: #00f; }
    .earth { border-color: #964B00; }
    .poison { border-color: #8B008B; }
    .bug { border-color: #7CFC00; }
    .unknown { border-color: #808080; }
    .plant { border-color: #008000; }
  `;

  render() {
    return html`
      <div 
        class="monster-card ${this.type}" 
        style=${this.clickable ? 'cursor: pointer;' : ''}
        @click=${this.clickable ? this._handleClick : null}
        role="button" 
        tabindex="0" 
        @keypress=${(e: KeyboardEvent) => e.key === 'Enter' && this._handleClick()}>
        <img 
          src=${this.imageUrl || {NoImage}} 
          alt=${this.name} || 'No Image'}
          @error=${(e: Event & { target: HTMLImageElement }) => (e.target.src = NoImage)} />
        <h3>${this.name}</h3>
        <p>Type: ${this.type}</p>
      </div>
    `;
  }

  private _handleClick() {
    const event = new CustomEvent('monster-clicked', {
      detail: { name: this.name, type: this.type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}