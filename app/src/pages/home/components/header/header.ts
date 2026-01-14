import { loadHTML } from "../../../../utils/loadHTML.js";

export class Header {
  private template: string = "";

  async load(): Promise<void> {
    this.template = await loadHTML(
      "src/pages/home/components/header/header.html",
    );
  }

  render(): string {
    return this.template;
  }
}
