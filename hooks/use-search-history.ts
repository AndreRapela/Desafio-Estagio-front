"use client"

import { useState, useEffect, useCallback } from "react"

const SEARCH_HISTORY_KEY = "books-dashboard-search-history"
const MAX_HISTORY_ITEMS = 10

export interface SearchHistoryItem {
  id: string
  query: string
  timestamp: number
  resultsCount?: number
}

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar histórico do localStorage
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY)
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory)
        setSearchHistory(parsedHistory)
      }
    } catch (error) {
      console.error("Erro ao carregar histórico de buscas:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Salvar histórico no localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory))
      } catch (error) {
        console.error("Erro ao salvar histórico de buscas:", error)
      }
    }
  }, [searchHistory, isLoading])

  // Adicionar nova busca ao histórico
  const addToHistory = useCallback((query: string, resultsCount?: number) => {
    if (!query.trim()) return

    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
      resultsCount,
    }

    setSearchHistory((prev) => {
      // Remove duplicatas (mesma query)
      const filtered = prev.filter((item) => item.query.toLowerCase() !== query.toLowerCase())

      // Adiciona no início e limita o tamanho
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)

      return updated
    })
  }, [])

  // Remover item do histórico
  const removeFromHistory = useCallback((id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // Limpar todo o histórico
  const clearHistory = useCallback(() => {
    setSearchHistory([])
  }, [])

  return {
    searchHistory,
    isLoading,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}
