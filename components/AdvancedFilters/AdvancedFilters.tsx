"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  Divider,
} from "@mui/material"
import { ExpandMore, FilterList, Clear } from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material/Select"

export interface FilterOptions {
  yearRange: [number, number]
  languages: string[]
  sortBy: "relevance" | "date_asc" | "date_desc" | "title_asc" | "title_desc"
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  totalResults: number
}

const LANGUAGE_OPTIONS = [
  { code: "eng", name: "Inglês" },
  { code: "por", name: "Português" },
  { code: "spa", name: "Espanhol" },
  { code: "fre", name: "Francês" },
  { code: "ger", name: "Alemão" },
  { code: "ita", name: "Italiano" },
  { code: "rus", name: "Russo" },
  { code: "jpn", name: "Japonês" },
  { code: "chi", name: "Chinês" },
  { code: "ara", name: "Árabe" },
]

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevância" },
  { value: "date_desc", label: "Mais Recentes" },
  { value: "date_asc", label: "Mais Antigos" },
  { value: "title_asc", label: "Título (A-Z)" },
  { value: "title_desc", label: "Título (Z-A)" },
] as const

export default function AdvancedFilters({ onFiltersChange, totalResults }: AdvancedFiltersProps) {
  const [yearRange, setYearRange] = useState<[number, number]>([1800, 2024])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("relevance")
  const [expanded, setExpanded] = useState(false)

  // Memoizar o objeto de filtros para evitar re-renders desnecessários
  const currentFilters = useMemo(
    () => ({
      yearRange,
      languages: selectedLanguages,
      sortBy,
    }),
    [yearRange, selectedLanguages, sortBy],
  )

  // Usar callback estável para notificar mudanças
  const notifyFiltersChange = useCallback(() => {
    onFiltersChange(currentFilters)
  }, [currentFilters, onFiltersChange])

  // Notificar mudanças nos filtros apenas quando necessário
  useEffect(() => {
    notifyFiltersChange()
  }, [notifyFiltersChange])

  const handleYearRangeChange = useCallback((_event: Event, newValue: number | number[]) => {
    setYearRange(newValue as [number, number])
  }, [])

  const handleLanguageChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const value = event.target.value
    setSelectedLanguages(typeof value === "string" ? value.split(",") : value)
  }, [])

  const handleSortChange = useCallback((event: SelectChangeEvent) => {
    setSortBy(event.target.value as FilterOptions["sortBy"])
  }, [])

  const handleClearFilters = useCallback(() => {
    setYearRange([1800, 2024])
    setSelectedLanguages([])
    setSortBy("relevance")
  }, [])

  const hasActiveFilters = useMemo(
    () => yearRange[0] !== 1800 || yearRange[1] !== 2024 || selectedLanguages.length > 0 || sortBy !== "relevance",
    [yearRange, selectedLanguages, sortBy],
  )

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (yearRange[0] !== 1800 || yearRange[1] !== 2024) count++
    if (selectedLanguages.length > 0) count++
    if (sortBy !== "relevance") count++
    return count
  }, [yearRange, selectedLanguages, sortBy])

  return (
    <Card sx={{ mb: 3, boxShadow: 2 }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
            <FilterList color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filtros Avançados
            </Typography>
            {hasActiveFilters && (
              <Chip label={`${activeFiltersCount} filtros ativos`} size="small" color="primary" variant="outlined" />
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {totalResults.toLocaleString()} resultados
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <CardContent sx={{ pt: 0 }}>
            <Stack spacing={3}>
              {/* Filtro por Ano */}
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Ano de Publicação
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={yearRange}
                    onChange={handleYearRangeChange}
                    valueLabelDisplay="auto"
                    min={1800}
                    max={2024}
                    marks={[
                      { value: 1800, label: "1800" },
                      { value: 1900, label: "1900" },
                      { value: 2000, label: "2000" },
                      { value: 2024, label: "2024" },
                    ]}
                    sx={{
                      "& .MuiSlider-thumb": {
                        height: 20,
                        width: 20,
                      },
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  {yearRange[0]} - {yearRange[1]}
                </Typography>
              </Box>

              <Divider />

              {/* Filtro por Idioma */}
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Idiomas</InputLabel>
                  <Select
                    multiple
                    value={selectedLanguages}
                    onChange={handleLanguageChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const language = LANGUAGE_OPTIONS.find((lang) => lang.code === value)
                          return <Chip key={value} label={language?.name || value} size="small" />
                        })}
                      </Box>
                    )}
                  >
                    {LANGUAGE_OPTIONS.map((language) => (
                      <MenuItem key={language.code} value={language.code}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Divider />

              {/* Ordenação */}
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Ordenar por</InputLabel>
                  <Select value={sortBy} onChange={handleSortChange}>
                    {SORT_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Botão Limpar Filtros */}
              {hasActiveFilters && (
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <Button variant="outlined" startIcon={<Clear />} onClick={handleClearFilters} sx={{ minWidth: 150 }}>
                    Limpar Filtros
                  </Button>
                </Box>
              )}
            </Stack>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
