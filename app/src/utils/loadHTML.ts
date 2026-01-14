/**
 * Carrega um arquivo HTML externo
 */
export async function loadHTML(path: string): Promise<string> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load HTML: ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading HTML from ${path}:`, error);
    return "";
  }
}
