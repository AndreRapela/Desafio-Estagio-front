"use client"

import type React from "react"

import { IconButton, Tooltip } from "@mui/material"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import type { Book } from "@/types/book"

interface FavoriteButtonProps {
  book: Book
  isFavorite: boolean
  onToggle: (book: Book) => void
  size?: "small" | "medium" | "large"
}

export default function FavoriteButton({ book, isFavorite, onToggle, size = "medium" }: FavoriteButtonProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation() // Evita que o clique no botão abra o modal do livro
    onToggle(book)
  }

  return (
    <Tooltip title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
      <IconButton
        onClick={handleClick}
        size={size}
        sx={{
          color: isFavorite ? "error.main" : "action.active",
          "&:hover": {
            color: "error.main",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  )
}
