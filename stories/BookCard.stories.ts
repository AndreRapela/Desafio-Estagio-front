import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import BookCard from "../components/BookCard/BookCard"

const meta: Meta<typeof BookCard> = {
  title: "Components/BookCard",
  component: BookCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de card para exibir informações de livros da OpenLibrary API. Inclui capa, título, autor, ano de publicação e tratamento para dados ausentes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    book: {
      description: "Objeto contendo as informações do livro",
      control: "object",
    },
    onClick: {
      description: "Função chamada quando o card é clicado",
      action: "clicked",
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// História padrão com todos os dados
export const Default: Story = {
  args: {
    book: {
      key: "OL123W",
      title: "The Pragmatic Programmer: Your Journey to Mastery",
      author_name: ["David Thomas", "Andrew Hunt"],
      first_publish_year: 1999,
      cover_i: 123456,
    },
  },
}

// História sem capa (mostra placeholder)
export const WithoutCover: Story = {
  args: {
    book: {
      key: "OL456W",
      title: "Livro Sem Capa Disponível",
      author_name: ["Autor Desconhecido"],
      first_publish_year: 2020,
      // cover_i: undefined - sem capa
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de como o componente se comporta quando não há capa disponível. Mostra um ícone de livro como placeholder.",
      },
    },
  },
}

// História sem autor
export const WithoutAuthor: Story = {
  args: {
    book: {
      key: "OL789W",
      title: "Livro com Autor Desconhecido",
      // author_name: undefined - sem autor
      first_publish_year: 2021,
      cover_i: 789012,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo quando não há informação de autor disponível. Exibe "Autor desconhecido".',
      },
    },
  },
}

// História sem ano
export const WithoutYear: Story = {
  args: {
    book: {
      key: "OL101W",
      title: "Livro Sem Ano de Publicação",
      author_name: ["Autor Conhecido"],
      // first_publish_year: undefined - sem ano
      cover_i: 345678,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo quando não há ano de publicação disponível. Exibe "Ano não informado".',
      },
    },
  },
}

// História com título muito longo
export const LongTitle: Story = {
  args: {
    book: {
      key: "OL202W",
      title:
        "Este é um Título Extremamente Longo que Pode Quebrar o Layout se Não For Tratado Adequadamente pelo Componente",
      author_name: ["Autor com Nome Muito Longo Também"],
      first_publish_year: 2023,
      cover_i: 567890,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Teste com título e autor longos para verificar como o componente lida com overflow de texto.",
      },
    },
  },
}

// História com múltiplos autores
export const MultipleAuthors: Story = {
  args: {
    book: {
      key: "OL303W",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author_name: ["Robert C. Martin", "Kent Beck", "Martin Fowler", "Ward Cunningham"],
      first_publish_year: 2008,
      cover_i: 234567,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo com múltiplos autores. O componente limita a exibição aos primeiros 2 autores.",
      },
    },
  },
}

// História de livro clássico
export const ClassicBook: Story = {
  args: {
    book: {
      key: "OL404W",
      title: "Dom Casmurro",
      author_name: ["Machado de Assis"],
      first_publish_year: 1899,
      cover_i: 891234,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo de livro clássico brasileiro.",
      },
    },
  },
}
