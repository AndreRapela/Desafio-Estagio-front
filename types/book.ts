export interface Book {
  key: string
  title: string
  author_name?: string[]
  author_key?: string[]
  first_publish_year?: number
  cover_i?: number
  edition_count?: number
  publisher?: string[]
  subject?: string[]
  number_of_pages_median?: number
  language?: string[]
  has_fulltext?: boolean
}
