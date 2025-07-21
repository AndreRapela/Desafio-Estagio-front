"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Box, Typography, Card, CardContent } from "@mui/material"
import type { Book } from "@/types/book"

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BookDecadeChartProps {
  books: Book[]
}

export default function BookDecadeChart({ books }: BookDecadeChartProps) {
  // Processar os dados para obter a distribuição por década
  const decadeCounts: { [key: string]: number } = {}

  books.forEach((book) => {
    if (book.first_publish_year) {
      const year = book.first_publish_year
      const decade = Math.floor(year / 10) * 10 // Ex: 1999 -> 1990, 2005 -> 2000
      const decadeLabel = `${decade}s`
      decadeCounts[decadeLabel] = (decadeCounts[decadeLabel] || 0) + 1
    }
  })

  // Ordenar as décadas
  const sortedDecades = Object.keys(decadeCounts).sort((a, b) => {
    const yearA = Number.parseInt(a.replace("s", ""))
    const yearB = Number.parseInt(b.replace("s", ""))
    return yearA - yearB
  })

  const chartData = {
    labels: sortedDecades,
    datasets: [
      {
        label: "Número de Livros",
        data: sortedDecades.map((decade) => decadeCounts[decade]),
        backgroundColor: "rgba(25, 118, 210, 0.6)", // Cor primária do Material-UI
        borderColor: "rgba(25, 118, 210, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de Livros por Década",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("pt-BR").format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Década",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantidade de Livros",
        },
        beginAtZero: true,
      },
    },
  }

  if (books.length === 0) {
    return null // Não renderiza o gráfico se não houver livros
  }

  return (
    <Card sx={{ mt: 4, mb: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 600 }}>
          Análise de Publicações
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  )
}
