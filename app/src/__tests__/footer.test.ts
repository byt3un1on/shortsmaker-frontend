import { Footer } from "../pages/home/components/footer/footer";

describe("Footer", () => {
  let footer: Footer;

  beforeEach(() => {
    footer = new Footer();
  });

  it("should load template", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue("<footer>Test</footer>"),
    });

    await footer.load();
    expect(footer.render()).toBe("<footer>Test</footer>");
  });

  it("should render empty template initially", () => {
    expect(footer.render()).toBe("");
  });
});