"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Alert,
} from "@mui/material"
import { Close, Delete, DeleteSweep, Book as BookIcon } from "@mui/icons-material"
import type { Book } from "@/types/book"

interface FavoritesModalProps {
  open: boolean
  onClose: () => void
  favorites: Book[]
  onRemoveFavorite: (bookKey: string) => void
  onClearFavorites: () => void
  onBookClick: (book: Book) => void
}

export default function FavoritesModal({
  open,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onBookClick,
}: FavoritesModalProps) {
  const handleBookClick = (book: Book) => {
    onBookClick(book)
    onClose() // Fechar modal de favoritos ao abrir modal do livro
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}
          >
            ⭐ Meus Favoritos ({favorites.length})
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {favorites.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body1">
              Você ainda não tem livros favoritos. Clique no ícone de coração nos livros para adicioná-los aqui!
            </Typography>
          </Alert>
        ) : (
          <Box
            sx={{
              mt: 1,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {favorites.map((book) => {
              const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
              const authors = book.author_name?.slice(0, 2).join(", ") || "Autor desconhecido"
              const year = book.first_publish_year || "Ano não informado"

              return (
                <Card
                  key={book.key}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => handleBookClick(book)}
                >
                  <Box sx={{ position: "relative", height: 160 }}>
                    {coverUrl ? (
                      <CardMedia
                        component="img"
                        height="160"
                        image={coverUrl}
                        alt={`Capa do livro ${book.title}`}
                        sx={{ objectFit: "cover" }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          const nextElement = target.nextElementSibling as HTMLElement
                          if (nextElement) {
                            nextElement.style.display = "flex"
                          }
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          bgcolor: "grey.100",
                          color: "grey.500",
                        }}
                      >
                        <BookIcon sx={{ fontSize: 48 }} />
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      {book.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.8rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 0.5,
                      }}
                    >
                      {authors}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {year}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 1, pt: 0, justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveFavorite(book.key)
                      }}
                      sx={{
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}
          </Box>
        )}
      </DialogContent>

      {favorites.length > 0 && (
        <>
          <Divider />
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={onClearFavorites}
              color="error"
              variant="outlined"
              startIcon={<DeleteSweep />}
              sx={{ mr: "auto" }}
            >
              Limpar Todos
            </Button>
            <Button onClick={onClose} variant="contained">
              Fechar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
