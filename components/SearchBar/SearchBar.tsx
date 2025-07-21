"use client"

import type React from "react"
import { useState } from "react"
import { Paper, InputBase, IconButton, Box, Chip, Stack } from "@mui/material"
import { Search, Clear } from "@mui/icons-material"

interface SearchBarProps {
  onSearch: (term: string) => void
}

const popularSearches = ["JavaScript", "Python", "React", "Clean Code", "Design Patterns", "Algorithms", "Data Science"]

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchValue)
  }

  const handleClear = () => {
    setSearchValue("")
    onSearch("")
  }

  const handleChipClick = (term: string) => {
    setSearchValue(term)
    onSearch(term)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 600,
          mx: "auto",
          mb: 2,
        }}
        elevation={2}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Pesquisar por título, autor ou termo..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          inputProps={{ "aria-label": "pesquisar livros" }}
        />
        {searchValue && (
          <IconButton sx={{ p: "10px" }} aria-label="clear" onClick={handleClear}>
            <Clear />
          </IconButton>
        )}
      </Paper>

      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ gap: 1 }}>
        {popularSearches.map((term) => (
          <Chip
            key={term}
            label={term}
            variant="outlined"
            size="small"
            onClick={() => handleChipClick(term)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Stack>
    </Box>
  )
}
