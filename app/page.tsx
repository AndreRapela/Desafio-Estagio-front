"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Typography, Box, Alert, Snackbar, Fab, Badge } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Favorite } from "@mui/icons-material"
import EnhancedSearchBar, { type SearchParams } from "@/components/SearchBar/EnhancedSearchBar"
import AdvancedFilters, { type FilterOptions } from "@/components/AdvancedFilters/AdvancedFilters"
import BookGrid from "@/components/BookGrid/BookGrid"
import BookModal from "@/components/BookModal/BookModal"
import FavoritesModal from "@/components/FavoritesModal/FavoritesModal"
import Pagination from "@/components/Pagination/Pagination"
import Loading from "@/components/Loading/Loading"
import BookDecadeChart from "@/components/BookDecadeChart/BookDecadeChart"
import { useBooks } from "@/hooks/use-books"
import { useFavorites } from "@/hooks/use-favorites"
import type { Book } from "@/types/book"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
})

export default function Dashboard() {
  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams>({ query: "", combinedSearch: false })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    yearRange: [1800, 2024],
    languages: [],
    sortBy: "relevance",
  })

  const { books, loading, totalResults, fetchBooks, error, clearError } = useBooks()
  const { favorites, favoritesCount, isFavorite, toggleFavorite, removeFromFavorites, clearFavorites } = useFavorites()

  const loadBooks = useCallback(async () => {
    try {
      const searchFilters = {
        yearRange: filters.yearRange,
        languages: filters.languages,
        sortBy: filters.sortBy,
      }

      const searchQuery = currentSearchParams.query || "*"
      await fetchBooks(searchQuery, currentPage, searchFilters)
    } catch (err) {
      // O erro já é tratado no hook useBooks
      console.error("Erro ao carregar livros:", err)
    }
  }, [currentSearchParams, currentPage, filters, fetchBooks])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const handleSearch = (searchParams: SearchParams) => {
    setCurrentSearchParams(searchParams)
    setCurrentPage(1)
  }

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseModal = () => {
    setSelectedBook(null)
  }

  const handleCloseError = () => {
    clearError()
  }

  const handleClearFavorites = () => {
    if (window.confirm("Tem certeza que deseja remover todos os favoritos?")) {
      clearFavorites()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            📚 Biblioteca Digital
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Descubra, explore e mergulhe no universo infinito dos livros da OpenLibrary
          </Typography>
        </Box>

        <EnhancedSearchBar onSearch={handleSearch} totalResults={totalResults} />

        <AdvancedFilters onFiltersChange={handleFiltersChange} totalResults={totalResults} />

        {loading && <Loading />}

        {!loading && books.length === 0 && currentSearchParams.query && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum livro encontrado para "{currentSearchParams.query}"
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Tente ajustar os filtros ou pesquisar por outro termo
            </Typography>
          </Box>
        )}

        {!loading && books.length > 0 && (
          <>
            <BookGrid
              books={books}
              onBookClick={handleBookClick}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            <BookDecadeChart books={books} />

            <Pagination currentPage={currentPage} totalResults={totalResults} onPageChange={handlePageChange} />
          </>
        )}

        {/* Botão flutuante de favoritos */}
        <Fab
          color="error"
          aria-label="favoritos"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
          onClick={() => setShowFavorites(true)}
        >
          <Badge badgeContent={favoritesCount} color="primary" max={99}>
            <Favorite />
          </Badge>
        </Fab>

        <BookModal book={selectedBook} open={!!selectedBook} onClose={handleCloseModal} />

        <FavoritesModal
          open={showFavorites}
          onClose={() => setShowFavorites(false)}
          favorites={favorites}
          onRemoveFavorite={removeFromFavorites}
          onClearFavorites={handleClearFavorites}
          onBookClick={handleBookClick}
        />

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  )
}
