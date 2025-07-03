import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SuggestionsNotFound from "@/components/ui/features/suggestions/SuggestionsNotFound";

jest.mock("lucide-react", () => ({
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
}));

describe("<SuggestionsNotFound />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Test de renderizado básico
  it("se renderiza correctamente y muestra el mensaje esperado", () => {
    render(<SuggestionsNotFound />);

    expect(screen.getByTestId("icon-lightbulb")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 3, name: /Genera tu analisis/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Carga tu CV y pega una descripción de oferta laboral para recibir sugerencias personalizadas/i,
      ),
    ).toBeInTheDocument();

    const mainContainer = screen
      .getByText(/Genera tu analisis/i)
      .closest("div");
    expect(mainContainer).toHaveClass("flex");
    expect(mainContainer).toHaveClass("flex-col");
    expect(mainContainer).toHaveClass("items-center");
    expect(mainContainer).toHaveClass("justify-center");
    expect(mainContainer).toHaveClass("h-full");
    expect(mainContainer).toHaveClass("text-center");
    expect(mainContainer).toHaveClass("space-y-4");
  });

  // 2. Test de accesibilidad/contenido específico
  it("tiene el texto correcto en el título y la descripción", () => {
    render(<SuggestionsNotFound />);

    expect(screen.getByText("Genera tu analisis")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Carga tu CV y pega una descripción de oferta laboral para recibir sugerencias personalizadas.",
      ),
    ).toBeInTheDocument();
  });
});
