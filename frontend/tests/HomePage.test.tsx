// HomePage.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "@/app/page";
import userEvent from "@testing-library/user-event";

jest.mock("@/components/ui/features/ResumeForm", () => ({
  __esModule: true,
  default: ({ setSuggestions, setFileUrl, setFileError }: any) => (
    <button
      onClick={() => {
        setSuggestions("test suggestion");
        setFileUrl("http://example.com/test.pdf");
        setFileError(null);
      }}
    >
      Mock ResumeForm
    </button>
  ),
}));

jest.mock("@/components/ui/features/PDFViewer", () => ({
  __esModule: true,
  default: ({ fileUrl, fileError }: any) => (
    <div>
      {fileError && <span data-testid="file-error">{fileError}</span>}
      {fileUrl && <span data-testid="file-url">{fileUrl}</span>}
    </div>
  ),
}));

jest.mock("@/components/ui/features/Suggestions", () => ({
  __esModule: true,
  default: ({ suggestions }: any) => (
    <div data-testid="suggestions">Suggestions: {suggestions}</div>
  ),
}));

jest.mock("@/components/ui/layout/CVPageLayout", () => ({
  __esModule: true,
  default: ({ leftPanel, rightPanel }: any) => (
    <div>
      <div data-testid="left-panel">{leftPanel}</div>
      <div data-testid="right-panel">{rightPanel}</div>
    </div>
  ),
}));

describe("HomePage component", () => {
  it("renders the layout with ResumeForm, PDFViewer and Suggestions", () => {
    render(<HomePage />);
    expect(screen.getByTestId("left-panel")).toBeInTheDocument();
    expect(screen.getByTestId("right-panel")).toBeInTheDocument();
    // ResumeForm mocked as a button
    expect(
      screen.getByRole("button", { name: /Mock ResumeForm/i }),
    ).toBeInTheDocument();
    // Initially no suggestions, no fileError, and no fileUrl
    expect(screen.getByTestId("suggestions")).toHaveTextContent("Suggestions:");
    expect(screen.queryByTestId("file-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("file-url")).not.toBeInTheDocument();
  });

  it("updates suggestions, fileUrl, and fileError after ResumeForm interaction", async () => {
    render(<HomePage />);
    await userEvent.click(
      screen.getByRole("button", { name: /Mock ResumeForm/i }),
    );
    expect(screen.getByTestId("suggestions")).toHaveTextContent(
      "Suggestions: test suggestion",
    );
    expect(screen.getByTestId("file-url")).toHaveTextContent(
      "http://example.com/test.pdf",
    );
    expect(screen.queryByTestId("file-error")).not.toBeInTheDocument();
  });
});
