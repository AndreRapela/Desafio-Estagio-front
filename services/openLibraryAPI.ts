const BASE_URL = "https://openlibrary.org"
const ITEMS_PER_PAGE = 25

export interface OpenLibraryResponse {
  start: number
  num_found: number
  docs: any[]
}

export interface SearchFilters {
  yearRange?: [number, number]
  languages?: string[]
  sortBy?: "relevance" | "date_asc" | "date_desc" | "title_asc" | "title_desc"
}

export async function searchBooks(query: string, page = 1, filters: SearchFilters = {}): Promise<OpenLibraryResponse> {
  const offset = (page - 1) * ITEMS_PER_PAGE

  // Usar a query diretamente - a API já busca em título, autor e outros campos
  let searchQuery = query.trim() || "*"

  // Aplicar filtros adicionais de forma mais segura
  if (filters.yearRange) {
    const [startYear, endYear] = filters.yearRange
    if (startYear !== 1800 || endYear !== 2024) {
      searchQuery += ` AND first_publish_year:[${startYear} TO ${endYear}]`
    }
  }

  if (filters.languages && filters.languages.length > 0) {
    const languageQuery = filters.languages.map((lang) => `language:${lang}`).join(" OR ")
    searchQuery += ` AND (${languageQuery})`
  }

  const params = new URLSearchParams({
    q: searchQuery,
    limit: ITEMS_PER_PAGE.toString(),
    offset: offset.toString(),
    fields:
      "title,author_name,cover_i,first_publish_year,key,edition_count,publisher,subject,number_of_pages_median,language",
  })

  // Ordenação
  if (filters.sortBy && filters.sortBy !== "relevance") {
    switch (filters.sortBy) {
      case "date_desc":
        params.append("sort", "first_publish_year desc")
        break
      case "date_asc":
        params.append("sort", "first_publish_year asc")
        break
      case "title_asc":
        params.append("sort", "title asc")
        break
      case "title_desc":
        params.append("sort", "title desc")
        break
    }
  }

  const url = `${BASE_URL}/search.json?${params}`
  console.log("API URL:", url) // Para debug

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Books-Dashboard/1.0",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)

      // Fallback para busca mais simples se a query complexa falhar
      if (response.status === 500 && searchQuery !== "*") {
        console.log("Tentando busca simplificada...")
        const fallbackParams = new URLSearchParams({
          q: "*",
          limit: ITEMS_PER_PAGE.toString(),
          offset: offset.toString(),
          fields: "title,author_name,cover_i,first_publish_year,key",
        })

        const fallbackUrl = `${BASE_URL}/search.json?${fallbackParams}`
        const fallbackResponse = await fetch(fallbackUrl)

        if (fallbackResponse.ok) {
          return await fallbackResponse.json()
        }
      }

      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Validar estrutura da resposta
    if (!data || typeof data.num_found !== "number" || !Array.isArray(data.docs)) {
      throw new Error("Resposta da API inválida")
    }

    return data
  } catch (error) {
    console.error("Error fetching from OpenLibrary API:", error)

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Timeout: A busca demorou muito para responder.")
      }
      if (error.message.includes("Failed to fetch")) {
        throw new Error("Erro de conexão. Verifique sua internet.")
      }
    }

    throw new Error("Falha ao buscar livros. Tente novamente.")
  }
}

export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M"): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
