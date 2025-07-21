"use client"

import { useState, useEffect, useCallback } from "react"
import type { Book } from "@/types/book"

const FAVORITES_STORAGE_KEY = "books-dashboard-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar favoritos do localStorage na inicialização
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites)
        setFavorites(parsedFavorites)
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos do localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error("Erro ao salvar favoritos no localStorage:", error)
      }
    }
  }, [favorites, isLoading])

  // Verificar se um livro está nos favoritos
  const isFavorite = useCallback(
    (bookKey: string) => {
      return favorites.some((fav) => fav.key === bookKey)
    },
    [favorites],
  )

  // Adicionar livro aos favoritos
  const addToFavorites = useCallback((book: Book) => {
    setFavorites((prev) => {
      // Evitar duplicatas
      if (prev.some((fav) => fav.key === book.key)) {
        return prev
      }
      return [...prev, book]
    })
  }, [])

  // Remover livro dos favoritos
  const removeFromFavorites = useCallback((bookKey: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.key !== bookKey))
  }, [])

  // Toggle favorito (adicionar se não existe, remover se existe)
  const toggleFavorite = useCallback(
    (book: Book) => {
      if (isFavorite(book.key)) {
        removeFromFavorites(book.key)
      } else {
        addToFavorites(book)
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites],
  )

  // Limpar todos os favoritos
  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return {
    favorites,
    favoritesCount: favorites.length,
    isLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
  }
}
