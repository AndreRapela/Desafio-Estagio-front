"use client"

import { Card, CardContent, CardMedia, Typography, Box, Chip, CardActionArea } from "@mui/material"
import { Book as BookIcon } from "@mui/icons-material"
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
  onClick: () => void
  isFavorite?: boolean
  onToggleFavorite?: (book: Book) => void
}

export default function BookCard({ book, onClick, isFavorite = false, onToggleFavorite }: BookCardProps) {
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null

  const authors = book.author_name?.slice(0, 2).join(", ") || "Autor desconhecido"
  const year = book.first_publish_year || "Ano não informado"

  return (
    <Card
      sx={{
        height: 380, // Altura fixa para todos os cards
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        position: "relative",
      }}
    >
      {/* Botão de favorito no canto superior direito */}
      {onToggleFavorite && (
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
          <FavoriteButton book={book} isFavorite={isFavorite} onToggle={onToggleFavorite} size="small" />
        </Box>
      )}

      <CardActionArea onClick={onClick} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ position: "relative", width: "100%", height: 220, flexShrink: 0 }}>
          {coverUrl ? (
            <CardMedia
              component="img"
              height="220"
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
          ) : null}
          <Box
            sx={{
              display: coverUrl ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              bgcolor: "grey.100",
              color: "grey.500",
            }}
          >
            <BookIcon sx={{ fontSize: 48 }} />
          </Box>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontSize: "0.95rem",
                fontWeight: 600,
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.6em",
                mb: 1,
              }}
            >
              {book.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.4em",
                fontSize: "0.85rem",
              }}
            >
              {authors}
            </Typography>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Chip label={year} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
