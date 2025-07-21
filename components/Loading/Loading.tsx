"use client"
import { Box, Skeleton } from "@mui/material"

export default function Loading() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 2,
          width: "100%",
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Box key={index}>
            <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 1, mb: 1 }} />
            <Skeleton variant="text" height={28} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" height={20} width="80%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={24} width={60} sx={{ borderRadius: 3 }} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
