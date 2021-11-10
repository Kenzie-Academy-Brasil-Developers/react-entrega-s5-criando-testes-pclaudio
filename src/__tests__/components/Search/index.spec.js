import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import { LocateCepProvider } from "../../../providers/CepProvider";
import Search from "../../../components/Search";
import Address from "../../../components/Cep";

describe("Input component", () => {
  it("should be able to render the input component", () => {
    render(<Search />);

    const cepField = screen.getByPlaceholderText(/insira o cep/i);

    expect(cepField).toBeTruthy();
  });
});

describe("Button component", () => {
  it("should be able to render the button component", () => {
    render(<Search />);

    const buttonElement = screen.getByRole("button", {
      name: /buscar pelo cep/i,
    });

    expect(buttonElement).toBeTruthy();
  });
});

describe("Search component", () => {
  it("should be able to search address by CEP", async () => {
    render(
      <LocateCepProvider>
        <Search />
        <Address />
      </LocateCepProvider>
    );

    const cepField = screen.getByPlaceholderText(/insira o cep/i);
    const buttonElement = screen.getByRole("button", {
      name: /buscar pelo cep/i,
    });

    fireEvent.change(cepField, { target: { value: "01311000" } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const logradouroField = screen.getByDisplayValue(/avenida paulista/i);
      const bairroField = screen.getByDisplayValue(/bela vista/i);
      const cidadeField = screen.getByDisplayValue(/são paulo/i);
      const estadoField = screen.getByDisplayValue(/sp/i);

      expect(logradouroField).toBeTruthy();
      expect(bairroField).toBeTruthy();
      expect(cidadeField).toBeTruthy();
      expect(estadoField).toBeTruthy();
    });
  });
});
