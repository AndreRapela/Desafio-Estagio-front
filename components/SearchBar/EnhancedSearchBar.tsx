"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Chip,
  Stack,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Button,
  ListItemButton,
} from "@mui/material"
import { Search, Clear, History, TrendingUp, Delete, AutoAwesome } from "@mui/icons-material"
import { useSearchHistory, type SearchHistoryItem } from "@/hooks/use-search-history"

interface EnhancedSearchBarProps {
  onSearch: (searchParams: SearchParams) => void
  totalResults?: number
}

export interface SearchParams {
  query: string
  combinedSearch: boolean
}

const POPULAR_SEARCHES = [
  "JavaScript",
  "Python",
  "React",
  "Clean Code",
  "Design Patterns",
  "Algorithms",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Web Development",
]

const SEARCH_SUGGESTIONS = [
  { query: "programming languages", icon: "💻", description: "Linguagens de programação" },
  { query: "science fiction", icon: "🚀", description: "Ficção científica" },
  { query: "history books", icon: "📚", description: "Livros de história" },
  { query: "cooking recipes", icon: "👨‍🍳", description: "Receitas culinárias" },
  { query: "philosophy", icon: "🤔", description: "Filosofia" },
  { query: "biography", icon: "👤", description: "Biografias" },
]

export default function EnhancedSearchBar({ onSearch, totalResults }: EnhancedSearchBarProps) {
  const [searchValue, setSearchValue] = useState("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory()

  const open = Boolean(anchorEl) && (searchHistory.length > 0 || showSuggestions)

  useEffect(() => {
    if (searchValue.length > 0) {
      setShowSuggestions(true)
      setAnchorEl(searchRef.current)
    } else {
      setShowSuggestions(false)
      if (searchHistory.length === 0) {
        setAnchorEl(null)
      }
    }
  }, [searchValue, searchHistory.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const performSearch = () => {
    if (searchValue.trim()) {
      const searchParams: SearchParams = {
        query: searchValue.trim(),
        combinedSearch: false,
      }

      onSearch(searchParams)
      addToHistory(searchValue.trim(), totalResults)
      setAnchorEl(null)
    }
  }

  const handleClear = () => {
    setSearchValue("")
    onSearch({ query: "", combinedSearch: false })
    setAnchorEl(null)
  }

  const handleHistoryClick = (item: SearchHistoryItem) => {
    setSearchValue(item.query)
    onSearch({ query: item.query, combinedSearch: false })
    setAnchorEl(null)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion)
    onSearch({ query: suggestion, combinedSearch: false })
    addToHistory(suggestion)
    setAnchorEl(null)
  }

  const handlePopularClick = (term: string) => {
    setSearchValue(term)
    onSearch({ query: term, combinedSearch: false })
    addToHistory(term)
  }

  const handleInputFocus = () => {
    if (searchHistory.length > 0 || searchValue.length > 0) {
      setAnchorEl(searchRef.current)
    }
  }

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(
    (suggestion) =>
      suggestion.query.toLowerCase().includes(searchValue.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const filteredHistory = searchHistory.filter((item) => item.query.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <Box sx={{ mb: 4 }}>
      {/* Busca Principal */}
      <Paper
        ref={searchRef}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 800,
          mx: "auto",
          mb: 2,
          boxShadow: 3,
        }}
        elevation={3}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquisar por título, autor ou termo..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleInputFocus}
            inputProps={{ "aria-label": "pesquisar livros" }}
          />
          {searchValue && (
            <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={handleClear}>
              <Clear />
            </IconButton>
          )}
        </Box>
      </Paper>

      {/* Sugestões Populares */}
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
        {POPULAR_SEARCHES.slice(0, 8).map((term) => (
          <Chip
            key={term}
            label={term}
            variant="outlined"
            size="small"
            onClick={() => handlePopularClick(term)}
            sx={{ cursor: "pointer" }}
            icon={<TrendingUp />}
          />
        ))}
      </Stack>

      {/* Dropdown de Sugestões e Histórico */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1300, width: anchorEl?.clientWidth }}
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper sx={{ maxHeight: 400, overflow: "auto", mt: 1 }}>
            {/* Histórico de Buscas */}
            {filteredHistory.length > 0 && (
              <>
                <Box sx={{ p: 2, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <History fontSize="small" />
                    Buscas Recentes
                  </Typography>
                  <Button size="small" onClick={clearHistory} startIcon={<Delete />}>
                    Limpar
                  </Button>
                </Box>
                <List dense>
                  {filteredHistory.slice(0, 5).map((item) => (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton onClick={() => handleHistoryClick(item)}>
                        <ListItemIcon>
                          <History fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.query}
                          secondary={
                            item.resultsCount
                              ? `${item.resultsCount.toLocaleString()} resultados`
                              : new Date(item.timestamp).toLocaleDateString()
                          }
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromHistory(item.id)
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                {filteredSuggestions.length > 0 && <Divider />}
              </>
            )}

            {/* Sugestões Inteligentes */}
            {filteredSuggestions.length > 0 && (
              <>
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <AutoAwesome fontSize="small" />
                    Sugestões
                  </Typography>
                </Box>
                <List dense>
                  {filteredSuggestions.slice(0, 5).map((suggestion) => (
                    <ListItem key={suggestion.query} disablePadding>
                      <ListItemButton onClick={() => handleSuggestionClick(suggestion.query)}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <span>{suggestion.icon}</span>
                              {suggestion.query}
                            </Box>
                          }
                          secondary={suggestion.description}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}
