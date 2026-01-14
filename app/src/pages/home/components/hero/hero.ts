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
        const theme = (document.getElementById("theme") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("description") as HTMLTextAreaElement
        ).value;

        status.textContent = "Gerando shorts...";

        try {
          const response = await fetch(
            `/api/v1/tickets?theme=${encodeURIComponent(theme)}&description=${encodeURIComponent(description)}`,
            {
              method: "POST",
            },
          );

          if (response.ok) {
            status.textContent = `Shorts gerados para tema: ${theme}`;
          } else {
            status.textContent = "Erro ao gerar shorts. Tente novamente.";
          }
        } catch (error) {
          console.error("Erro ao conectar com a API:", error);
          status.textContent = "Erro de conexão com o servidor.";
        }
      });
    }
  }

  render(): string {
    return this.template;
  }
}
