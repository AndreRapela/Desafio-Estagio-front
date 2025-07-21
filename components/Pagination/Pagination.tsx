"use client"
import { Box, Button, Typography, Stack, useTheme, useMediaQuery } from "@mui/material"
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material"

interface PaginationProps {
  currentPage: number
  totalResults: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
}

export default function Pagination({ currentPage, totalResults, onPageChange, itemsPerPage = 25 }: PaginationProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const totalPages = Math.ceil(totalResults / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalResults)

  if (totalPages <= 1) return null

  const handleFirstPage = () => onPageChange(1)
  const handlePreviousPage = () => onPageChange(currentPage - 1)
  const handleNextPage = () => onPageChange(currentPage + 1)
  const handleLastPage = () => onPageChange(totalPages)

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
        Mostrando {startItem.toLocaleString()} - {endItem.toLocaleString()} de {totalResults.toLocaleString()}{" "}
        resultados
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          startIcon={!isMobile ? <FirstPage /> : undefined}
        >
          {isMobile ? <FirstPage /> : "Primeira"}
        </Button>

        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          startIcon={!isMobile ? <NavigateBefore /> : undefined}
        >
          {isMobile ? <NavigateBefore /> : "Anterior"}
        </Button>

        <Typography
          variant="body2"
          sx={{
            mx: 2,
            minWidth: isMobile ? "60px" : "80px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {currentPage} / {totalPages}
        </Typography>

        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          endIcon={!isMobile ? <NavigateNext /> : undefined}
        >
          {isMobile ? <NavigateNext /> : "Próxima"}
        </Button>

        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          endIcon={!isMobile ? <LastPage /> : undefined}
        >
          {isMobile ? <LastPage /> : "Última"}
        </Button>
      </Stack>
    </Box>
  )
}
