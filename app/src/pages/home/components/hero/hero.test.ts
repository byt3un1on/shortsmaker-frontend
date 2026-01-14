import { Hero } from "./hero";

describe("Hero", () => {
  let hero: Hero;

  beforeEach(() => {
    hero = new Hero();
    // Mock document methods
    document.getElementById = jest.fn();
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should load template", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue("<section>Test</section>"),
    });

    await hero.load();
    expect(hero.render()).toBe("<section>Test</section>");
  });

  it("should render empty template initially", () => {
    expect(hero.render()).toBe("");
  });

  it("should initialize form event listener", () => {
    const mockForm = { addEventListener: jest.fn() };
    const mockStatus = { textContent: "" };
    const mockTheme = { value: "Test Theme" };
    const mockDescription = { value: "Test Description" };

    (document.getElementById as jest.Mock)
      .mockReturnValueOnce(mockForm)
      .mockReturnValueOnce(mockStatus)
      .mockReturnValueOnce(mockTheme)
      .mockReturnValueOnce(mockDescription);

    hero.init();

    expect(mockForm.addEventListener).toHaveBeenCalledWith(
      "submit",
      expect.any(Function),
    );
  });

  it("should handle form submission successfully", async () => {
    const mockForm = { addEventListener: jest.fn() };
    const mockStatus = { textContent: "" };
    const mockTheme = { value: "Test Theme" };
    const mockDescription = { value: "Test Description" };

    (document.getElementById as jest.Mock)
      .mockReturnValueOnce(mockForm)
      .mockReturnValueOnce(mockStatus)
      .mockReturnValueOnce(mockTheme)
      .mockReturnValueOnce(mockDescription);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    hero.init();

    const submitHandler = mockForm.addEventListener.mock.calls[0][1];
    const mockEvent = { preventDefault: jest.fn() };

    await submitHandler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/v1/tickets?theme=Test%20Theme&description=Test%20Description",
      { method: "POST" },
    );
    expect(mockStatus.textContent).toBe("Shorts gerados para tema: Test Theme");
  });

  it("should handle form submission failure", async () => {
    const mockForm = { addEventListener: jest.fn() };
    const mockStatus = { textContent: "" };
    const mockTheme = { value: "Test Theme" };
    const mockDescription = { value: "Test Description" };

    (document.getElementById as jest.Mock)
      .mockReturnValueOnce(mockForm)
      .mockReturnValueOnce(mockStatus)
      .mockReturnValueOnce(mockTheme)
      .mockReturnValueOnce(mockDescription);

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    hero.init();

    const submitHandler = mockForm.addEventListener.mock.calls[0][1];
    const mockEvent = { preventDefault: jest.fn() };

    await submitHandler(mockEvent);

    expect(mockStatus.textContent).toBe(
      "Erro ao gerar shorts. Tente novamente.",
    );
  });

  it("should handle connection error during form submission", async () => {
    const mockForm = { addEventListener: jest.fn() };
    const mockStatus = { textContent: "" };
    const mockTheme = { value: "Test Theme" };
    const mockDescription = { value: "Test Description" };

    (document.getElementById as jest.Mock)
      .mockReturnValueOnce(mockForm)
      .mockReturnValueOnce(mockStatus)
      .mockReturnValueOnce(mockTheme)
      .mockReturnValueOnce(mockDescription);

    global.fetch = jest.fn().mockRejectedValue(new Error("Connection error"));

    hero.init();

    const submitHandler = mockForm.addEventListener.mock.calls[0][1];
    const mockEvent = { preventDefault: jest.fn() };

    await submitHandler(mockEvent);

    expect(mockStatus.textContent).toBe("Erro de conexão com o servidor.");
  });
});
