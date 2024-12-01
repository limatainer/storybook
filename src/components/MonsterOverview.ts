import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import axios from 'axios';
import './MonsterCard';

interface Monster {
  name: string;
  imageUrl: string;
  type: string;
}

@customElement('monster-overview')
export class MonsterOverview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      gap: 16px;
    }

    .filter-menu {
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background-color: #f9f9f9;
    }

    .filter-menu h2 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .filter-menu label {
      display: block;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .monster-grid {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }
  `;

  monsters: Monster[] = [];
  selectedFilters: Set<string> = new Set();

  connectedCallback() {
    super.connectedCallback();
    this.fetchMonsters();
  }

  async fetchMonsters() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
    this.monsters = response.data.results.map((monster: { name: string }) => ({
      name: monster.name,
      imageUrl: `https://img.pokemondb.net/artwork/large/${monster.name}.jpg`,
      type: this.getMonsterType(monster.name),
    }));
    this.requestUpdate();
  }

  getMonsterType(name: string): string {
    const types = {
      bulbasaur: 'plant',
      charmander: 'fire',
      squirtle: 'water',
      ivysaur: 'poison',
      charizard: 'fire',
      wartortle: 'water',
      caterpie: 'bug',
      blastoise: 'water',
      venusaur: 'plant',
      charmeleon: 'fire',
    } as const;

    return types[name as keyof typeof types] || 'unknown';
  }

  toggleFilter(filter: string) {
    this.selectedFilters.has(filter) ? this.selectedFilters.delete(filter) : this.selectedFilters.add(filter);
    this.requestUpdate();
  }

  render() {
    const filteredMonsters = this.selectedFilters.size
      ? this.monsters.filter(monster => this.selectedFilters.has(monster.type))
      : this.monsters;

    return html`
      <div class="filter-menu">
        <h2>Filter by Type:</h2>
        ${['fire', 'water', 'plant', 'poison', 'bug', 'unknown'].map(type => html`
          <label>
            <input
              type="checkbox"
              @change=${() => this.toggleFilter(type)}
              ?checked=${this.selectedFilters.has(type)}
            />
            ${type}
          </label>
        `)}
      </div>

      <div class="monster-grid">
        ${filteredMonsters.map(monster => html`
          <monster-card
            name=${monster.name}
            imageUrl=${monster.imageUrl}
            type=${monster.type}>
          </monster-card>
        `)}
      </div>
    `;
  }
}