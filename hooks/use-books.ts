"use client"

import { useState, useCallback, useRef } from "react"
import { searchBooks, type SearchFilters } from "@/services/openLibraryAPI"
import type { Book } from "@/types/book"

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  // Usar ref para evitar múltiplas chamadas simultâneas
  const isLoadingRef = useRef(false)

  const fetchBooks = useCallback(async (query: string, page = 1, filters: SearchFilters = {}) => {
    // Evitar múltiplas chamadas simultâneas
    if (isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const response = await searchBooks(query, page, filters)
      setBooks(response.docs || [])
      setTotalResults(response.num_found || 0)
      setLastSearchQuery(query)
    } catch (error) {
      console.error("Error fetching books:", error)
      setBooks([])
      setTotalResults(0)
      setError(error instanceof Error ? error.message : "Erro desconhecido")
      throw error
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    books,
    loading,
    totalResults,
    lastSearchQuery,
    error,
    fetchBooks,
    clearError,
  }
}
