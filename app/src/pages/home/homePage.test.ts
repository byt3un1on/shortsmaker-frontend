import { HomePage } from "./index";
import { Header } from "./components/header/header";
import { Hero } from "./components/hero/hero";
import { Footer } from "./components/footer/footer";

jest.mock("./components/header/header");
jest.mock("./components/hero/hero");
jest.mock("./components/footer/footer");

describe("HomePage", () => {
  let homePage: HomePage;
  let mockHeader: jest.Mocked<Header>;
  let mockHero: jest.Mocked<Hero>;
  let mockFooter: jest.Mocked<Footer>;

  beforeEach(() => {
    jest.clearAllMocks();
    (Header as jest.Mock).mockClear();
    (Hero as jest.Mock).mockClear();
    (Footer as jest.Mock).mockClear();
    mockHeader = new Header() as jest.Mocked<Header>;
    mockHero = new Hero() as jest.Mocked<Hero>;
    mockFooter = new Footer() as jest.Mocked<Footer>;

    (Header as jest.Mock).mockImplementation(() => mockHeader);
    (Hero as jest.Mock).mockImplementation(() => mockHero);
    (Footer as jest.Mock).mockImplementation(() => mockFooter);

    homePage = new HomePage();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should load all components", async () => {
    mockHeader.load.mockResolvedValue();
    mockHero.load.mockResolvedValue();
    mockFooter.load.mockResolvedValue();

    await homePage.load();

    expect(mockHeader.load).toHaveBeenCalledTimes(1);
    expect(mockHero.load).toHaveBeenCalledTimes(1);
    expect(mockFooter.load).toHaveBeenCalledTimes(1);
  });

  it("should init hero component", () => {
    homePage.init();

    expect(mockHero.init).toHaveBeenCalledTimes(1);
  });

  it("should render all components", () => {
    mockHeader.render.mockReturnValue("<header></header>");
    mockHero.render.mockReturnValue("<section></section>");
    mockFooter.render.mockReturnValue("<footer></footer>");

    const result = homePage.render();

    expect(result).toBe(`
      <header></header>
      <section></section>
      <footer></footer>
    `);
    expect(mockHeader.render).toHaveBeenCalledTimes(1);
    expect(mockHero.render).toHaveBeenCalledTimes(1);
    expect(mockFooter.render).toHaveBeenCalledTimes(1);
  });
});
