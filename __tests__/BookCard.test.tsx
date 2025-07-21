"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import BookCard from "@/components/BookCard/BookCard"
import type { Book } from "@/types/book"
import { jest, describe, test, expect, beforeEach } from "@jest/globals"

const mockBook: Book = {
  key: "OL123W",
  title: "Clean Code",
  author_name: ["Robert C. Martin"],
  first_publish_year: 2008,
  cover_i: 123456,
}

const mockOnClick = jest.fn()

describe("BookCard", () => {
  beforeEach(() => {
    mockOnClick.mockClear()
  })

  test("renders book information correctly", () => {
    render(<BookCard book={mockBook} onClick={mockOnClick} />)

    expect(screen.getByText("Clean Code")).toBeInTheDocument()
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument()
    expect(screen.getByText("2008")).toBeInTheDocument()
  })

  test("handles click events", () => {
    render(<BookCard book={mockBook} onClick={mockOnClick} />)

    const card = screen.getByRole("button")
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test("displays placeholder when no cover is available", () => {
    const bookWithoutCover = { ...mockBook, cover_i: undefined }
    render(<BookCard book={bookWithoutCover} onClick={mockOnClick} />)

    // Verifica se o ícone de livro está presente quando não há capa
    const bookIcon = screen.getByTestId("BookIcon") || screen.getByRole("img", { hidden: true })
    expect(bookIcon).toBeTruthy()
  })

  test("handles missing author information", () => {
    const bookWithoutAuthor = { ...mockBook, author_name: undefined }
    render(<BookCard book={bookWithoutAuthor} onClick={mockOnClick} />)

    expect(screen.getByText("Autor desconhecido")).toBeInTheDocument()
  })

  test("handles missing year information", () => {
    const bookWithoutYear = { ...mockBook, first_publish_year: undefined }
    render(<BookCard book={bookWithoutYear} onClick={mockOnClick} />)

    expect(screen.getByText("Ano não informado")).toBeInTheDocument()
  })
})
