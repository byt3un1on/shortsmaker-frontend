import { loadHTML } from "../../../../utils/loadHTML.js";

export class Footer {
  private template: string = "";

  async load(): Promise<void> {
    this.template = await loadHTML(
      "src/pages/home/components/footer/footer.html",
    );
  }

  render(): string {
    return this.template;
  }
}