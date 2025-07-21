# 📚 Dashboard de Livros - OpenLibrary

## 🎯 Visão Geral

Uma aplicação web moderna para explorar e descobrir livros usando a API pública da OpenLibrary. O dashboard oferece uma interface intuitiva para pesquisar livros por título, autor ou termo, com funcionalidades avançadas como histórico de buscas, sistema de favoritos, filtros por ano e idioma, além de visualizações gráficas da distribuição de livros por década.

### ✨ Funcionalidades Principais

- 🔍 **Pesquisa Inteligente**: Busca unificada em título, autor e termos gerais
- 📝 **Histórico de Buscas**: Armazena e sugere buscas anteriores
- ⭐ **Sistema de Favoritos**: Adicione e gerencie livros favoritos com persistência local
- 🎛️ **Filtros Avançados**: Filtragem por ano de publicação, idioma e ordenação
- 📊 **Visualização de Dados**: Gráfico de distribuição de livros por década
- 📱 **Interface Responsiva**: Design adaptável para desktop, tablet e mobile
- 🔄 **Estados da Aplicação**: Loading, erro, vazio e sucesso bem definidos

## 🚀 Tecnologias

- ⚛️ **React 18.2.0** - Biblioteca principal com hooks modernos
- 🔥 **Next.js 14** - Framework React com App Router
- 🎨 **Material-UI 5.x** - Sistema de design e componentes
- 📘 **TypeScript** - Tipagem estática para maior robustez
- 📈 **Chart.js** - Visualização de dados e gráficos
- 🧪 **React Testing Library** - Testes unitários de componentes
- 🃏 **Jest** - Framework de testes
- 📖 **Storybook 7.x** - Documentação e desenvolvimento de componentes

## 📦 Instalação

bash
### Clone o repositório
git clone https://github.com/AndreRapela/Desafio-Estagio-front.git

# Entre no diretório
cd Desafio-Estagio-front

### Instale as dependências
npm install

### Execute em modo de desenvolvimento
npm start


## 🛠️ Scripts Disponíveis

- `npm start` - 🏃‍♂️ Executa a aplicação em modo de desenvolvimento
- `npm run dev` - 🔄 Alias para desenvolvimento (Next.js)
- `npm test` - 🧪 Executa os testes unitários
- `npm run test:watch` - 👀 Executa testes em modo watch
- `npm run build` - 🏗️ Gera build otimizado para produção
- `npm run storybook` - 📚 Inicia o Storybook para documentação de componentes
- `npm run build-storybook` - 📦 Gera build estático do Storybook

## 🏗️ Decisões Técnicas

### 🏛️ Arquitetura e Estrutura

**📁 Organização por Funcionalidade**: Componentes organizados por responsabilidade (SearchBar, BookCard, BookModal) facilitando manutenção e reutilização.

**🎣 Custom Hooks**: Separação da lógica de negócio em hooks especializados:
- `useBooks`: Gerenciamento de estado dos livros e chamadas à API
- `useFavorites`: Sistema de favoritos com persistência no localStorage
- `useSearchHistory`: Histórico de buscas com limite e limpeza automática
- `useDebounce`: Otimização de performance para pesquisas

### 🗃️ Gerenciamento de Estado

**🎯 Estado Local com Hooks**: Optou-se por useState e useReducer ao invés de Redux devido à simplicidade do escopo, mantendo o estado próximo aos componentes que o utilizam.

**💾 Persistência Local**: localStorage para favoritos e histórico, garantindo experiência contínua entre sessões.

**🧠 Memoização Inteligente**: useMemo e useCallback para otimizar re-renders, especialmente em listas grandes de livros.

### ⚡ Performance e UX

**⏱️ Debounce de 500ms**: Reduz chamadas desnecessárias à API durante digitação.

**📄 Paginação Eficiente**: Carregamento sob demanda com navegação intuitiva.

**💀 Loading States**: Skeleton loading para melhor percepção de performance.

**🚨 Error Boundaries**: Tratamento robusto de erros com fallbacks e retry automático.

### ♿ Acessibilidade e Responsividade

**🏷️ ARIA Labels**: Elementos semânticos e descritivos para screen readers.

**⌨️ Navegação por Teclado**: Suporte completo para navegação sem mouse.

**📱 Mobile-First**: Design responsivo com breakpoints otimizados.

**🎨 Contraste e Tipografia**: Seguindo diretrizes WCAG 2.1 AA.

### 🧪 Testes e Qualidade

**🔬 Testes Unitários**: Cobertura dos componentes principais e hooks customizados.

**📚 Storybook**: Documentação viva dos componentes com diferentes estados.

**🔒 TypeScript**: Tipagem forte para reduzir bugs em runtime.

**✨ ESLint + Prettier**: Padronização de código e formatação automática.

## 🔮 Próximos Passos

Com mais tempo de desenvolvimento, as seguintes funcionalidades seriam implementadas:

### 🚀 Funcionalidades Avançadas
- 🎤 **Busca por Voz**: Integração com Web Speech API
- 🤖 **Recomendações Personalizadas**: Sistema de ML baseado no histórico
- 📋 **Listas Personalizadas**: Criação de listas temáticas além dos favoritos
- 📱 **Compartilhamento Social**: Compartilhar livros e listas nas redes sociais

### 🔧 Melhorias Técnicas
- 📲 **PWA**: Funcionalidades offline e instalação como app nativo
- 🔄 **Service Workers**: Cache inteligente para melhor performance offline
- ♾️ **Infinite Scroll**: Carregamento contínuo ao invés de paginação
- 🦥 **Lazy Loading**: Carregamento sob demanda de imagens e componentes

### 📊 Visualizações e Analytics
- 📈 **Dashboard Analytics**: Estatísticas de uso e preferências do usuário
- 📉 **Gráficos Avançados**: Distribuição por gênero, editora, idioma
- 🗺️ **Mapa de Calor**: Visualização temporal das buscas
- ⚖️ **Comparativo de Autores**: Análise comparativa entre diferentes autores

### 🔗 Integração e Dados
- 🌐 **Múltiplas APIs**: Integração com Goodreads, Google Books
- ☁️ **Sincronização na Nuvem**: Backup automático de favoritos e listas
- 🔔 **Notificações**: Alertas para novos livros de autores favoritos
- 📤 **Export/Import**: Funcionalidade para exportar dados em diferentes formatos

### 🧪 Testes e Qualidade
- 🎭 **Testes E2E**: Cypress para testes de integração completos
- 🚀 **Testes de Performance**: Lighthouse CI para monitoramento contínuo
- 🧪 **A/B Testing**: Experimentação de diferentes interfaces
- 📊 **Monitoramento**: Sentry para tracking de erros em produção
