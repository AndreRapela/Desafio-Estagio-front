"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  Divider,
  Stack,
} from "@mui/material"
import { Close, Book as BookIcon, Person, CalendarToday, Pages } from "@mui/icons-material"
import type { Book } from "@/types/book"

interface BookModalProps {
  book: Book | null
  open: boolean
  onClose: () => void
}

export default function BookModal({ book, open, onClose }: BookModalProps) {
  if (!book) return null

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null

  const authors = book.author_name?.join(", ") || "Autor desconhecido"
  const publishers = book.publisher?.slice(0, 3).join(", ") || "Editora não informada"
  const subjects = book.subject?.slice(0, 5) || []

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography variant="h5" component="h2" sx={{ pr: 2, fontWeight: 600 }}>
            {book.title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              {coverUrl ? (
                <Box
                  component="img"
                  src={coverUrl}
                  alt={`Capa do livro ${book.title}`}
                  sx={{
                    width: "100%",
                    maxWidth: 200,
                    height: "auto",
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.setAttribute("style", "display: flex")
                  }}
                />
              ) : null}
              <Box
                sx={{
                  display: coverUrl ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 300,
                  bgcolor: "grey.100",
                  color: "grey.500",
                  borderRadius: 1,
                  mx: "auto",
                }}
              >
                <BookIcon sx={{ fontSize: 64 }} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Person sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Autor(es)
                  </Typography>
                </Box>
                <Typography variant="body1">{authors}</Typography>
              </Box>

              <Divider />

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarToday sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Primeira Publicação
                  </Typography>
                </Box>
                <Typography variant="body1">{book.first_publish_year || "Não informado"}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Editora(s)
                </Typography>
                <Typography variant="body1">{publishers}</Typography>
              </Box>

              {book.number_of_pages_median && (
                <>
                  <Divider />
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Pages sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        Páginas (mediana)
                      </Typography>
                    </Box>
                    <Typography variant="body1">{book.number_of_pages_median}</Typography>
                  </Box>
                </>
              )}

              {book.edition_count && (
                <>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Edições Disponíveis
                    </Typography>
                    <Typography variant="body1">{book.edition_count}</Typography>
                  </Box>
                </>
              )}

              {subjects.length > 0 && (
                <>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Assuntos
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {subjects.map((subject, index) => (
                        <Chip key={index} label={subject} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
