import { HomePage } from "./pages/home/index.js";

const init = async () => {
  const app = document.getElementById("app");
  if (app) {
    const homePage = new HomePage();
    await homePage.load();
    app.innerHTML = homePage.render();
    homePage.init();
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
