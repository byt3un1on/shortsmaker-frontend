import { Hero } from "../pages/home/components/hero/hero";

describe("Hero", () => {
  let hero: Hero;

  beforeEach(() => {
    jest.useFakeTimers();
    hero = new Hero();
    // Mock document methods
    document.getElementById = jest.fn();
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
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

    expect(mockForm.addEventListener).toHaveBeenCalledWith("submit", expect.any(Function));
  });

  it("should handle form submission", () => {
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

    const submitHandler = mockForm.addEventListener.mock.calls[0][1];
    const mockEvent = { preventDefault: jest.fn() };

    submitHandler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockStatus.textContent).toBe("Gerando shorts...");

    // Wait for timeout
    jest.advanceTimersByTime(2000);
    expect(mockStatus.textContent).toBe("Shorts gerados para tema: Test Theme");
  });
});