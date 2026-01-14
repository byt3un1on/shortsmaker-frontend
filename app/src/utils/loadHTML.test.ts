import { loadHTML } from "./loadHTML";

describe("loadHTML", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should load HTML content successfully", async () => {
    const mockHTML = "<div>Test</div>";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(mockHTML),
    });

    const result = await loadHTML("test.html");
    expect(result).toBe(mockHTML);
    expect(global.fetch).toHaveBeenCalledWith("test.html");
  });

  it("should return empty string on fetch error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await loadHTML("test.html");
    expect(result).toBe("");
  });

  it("should return empty string on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await loadHTML("test.html");
    expect(result).toBe("");
  });
});