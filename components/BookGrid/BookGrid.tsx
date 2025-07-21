"use client"
import { Box } from "@mui/material"
import BookCard from "@/components/BookCard/BookCard"
import type { Book } from "@/types/book"

interface BookGridProps {
  books: Book[]
  onBookClick: (book: Book) => void
  isFavorite?: (bookKey: string) => boolean
  onToggleFavorite?: (book: Book) => void
}

export default function BookGrid({ books, onBookClick, isFavorite, onToggleFavorite }: BookGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)", // Exatamente 5 livros por linha
          xl: "repeat(5, 1fr)",
        },
        gap: 2,
        mb: 4,
        width: "100%",
      }}
    >
      {books.map((book, index) => (
        <Box
          key={`${book.key}-${index}`}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <BookCard
            book={book}
            onClick={() => onBookClick(book)}
            isFavorite={isFavorite ? isFavorite(book.key) : false}
            onToggleFavorite={onToggleFavorite}
          />
        </Box>
      ))}
    </Box>
  )
}
