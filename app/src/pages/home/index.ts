import { Header } from "./components/header/header.js";
import { Hero } from "./components/hero/hero.js";
import { Footer } from "./components/footer/footer.js";

export class HomePage {
  private header: Header;
  private hero: Hero;
  private footer: Footer;

  constructor() {
    this.header = new Header();
    this.hero = new Hero();
    this.footer = new Footer();
  }

  async load(): Promise<void> {
    await Promise.all([
      this.header.load(),
      this.hero.load(),
      this.footer.load(),
    ]);
  }

  init(): void {
    this.hero.init();
  }

  render(): string {
    return `
      ${this.header.render()}
      ${this.hero.render()}
      ${this.footer.render()}
    `;
  }
}
