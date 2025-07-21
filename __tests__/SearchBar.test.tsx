import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import SearchBar from "@/components/SearchBar/SearchBar"
import { jest, describe, test, expect, beforeEach } from "@jest/globals"

const mockOnSearch = jest.fn()

describe("SearchBar", () => {
  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  test("renders search input and popular searches", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText("Pesquisar por título, autor ou termo...")).toBeInTheDocument()
    expect(screen.getByText("JavaScript")).toBeInTheDocument()
    expect(screen.getByText("Python")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  test("calls onSearch when form is submitted", async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Pesquisar por título, autor ou termo...")
    const searchButton = screen.getByLabelText("search")

    await user.type(input, "Clean Code")
    await user.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith("Clean Code")
  })

  test("calls onSearch when popular search chip is clicked", async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const jsChip = screen.getByText("JavaScript")
    await user.click(jsChip)

    expect(mockOnSearch).toHaveBeenCalledWith("JavaScript")
  })

  test("clears search when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText("Pesquisar por título, autor ou termo...")

    await user.type(input, "test search")

    const clearButton = screen.getByLabelText("clear")
    await user.click(clearButton)

    expect(input).toHaveValue("")
    expect(mockOnSearch).toHaveBeenCalledWith("")
  })
})
