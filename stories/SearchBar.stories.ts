import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import SearchBar from "../components/SearchBar/SearchBar"

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de barra de pesquisa com chips de termos populares e funcionalidade de limpeza. Inclui debounce automático para otimizar as consultas.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: {
      description: "Função chamada quando uma pesquisa é realizada",
      action: "searched",
    },
  },
  args: {
    onSearch: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Estado padrão da barra de pesquisa com chips de termos populares.",
      },
    },
  },
}

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "Versão interativa - digite algo no campo ou clique nos chips para testar a funcionalidade.",
      },
    },
  },
}
