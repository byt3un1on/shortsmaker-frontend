import { loadHTML } from "../../../../utils/loadHTML.js";

export class Hero {
  private template: string = "";

  async load(): Promise<void> {
    this.template = await loadHTML("src/pages/home/components/hero/hero.html");
  }

  init(): void {
    const form = document.getElementById("ticket-form") as HTMLFormElement;
    const status = document.getElementById("status") as HTMLDivElement;

    if (form && status) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const theme = (document.getElementById("theme") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLTextAreaElement).value;

        status.textContent = "Gerando shorts...";

        // Simular API call
        setTimeout(() => {
          status.textContent = `Shorts gerados para tema: ${theme}`;
        }, 2000);
      });
    }
  }

  render(): string {
    return this.template;
  }
}