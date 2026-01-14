import { Header } from "../pages/home/components/header/header";

describe("Header", () => {
  let header: Header;

  beforeEach(() => {
    header = new Header();
  });

  it("should load template", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue("<header>Test</header>"),
    });

    await header.load();
    expect(header.render()).toBe("<header>Test</header>");
  });

  it("should render template", () => {
    expect(header.render()).toBe("");
  });
});