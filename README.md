# 📋 Lawgic - Sistema de Notificação Judicial

## 🚀 Visão Geral
Sistema completo para gerenciamento de notificações judiciais com fluxo de aprovação em 3 etapas: **Em Andamento → Validação → Concluído**.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + Express.js
- **MongoDB** com Mongoose
- **TypeScript**
- **Zod** para validações
- **CORS** para comunicação com frontend

### Frontend
- **Next.js 14** com App Router
- **TypeScript**
- **Tailwind CSS** para estilização
- **Axios** para consumo de API
- **Zustand** para gerenciamento de estado

---

## 📋 Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou Atlas)
- **Git**

---

## 🚀 Instalação Rápida

### 1. Clone e Setup Inicial
```bash
git clone https://github.com/seu-usuario/lawgic.git
cd lawgic

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configuração das Variáveis de Ambiente

**Backend (.env):**
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/lawgic_db
```

**Frontend (.env):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Banco de Dados - Escolha uma opção:

**Opção A - MongoDB Local:**
```bash
# Inicie o MongoDB
sudo systemctl start mongod  # Linux
net start MongoDB           # Windows
brew services start mongodb/brew/mongodb-community  # Mac
```

**Opção B - MongoDB Atlas (Recomendado):**
1. Acesse [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie cluster gratuito
3. Obtenha a string de conexão
4. Atualize `MONGODB_URI` no .env do backend

**Opção C - Docker:**
```bash
cd backend
docker-compose up -d
```

### 4. Execute a Aplicação

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📱 Acesse a Aplicação
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health

---

## 🎯 Fluxo de Trabalho

### 1. **Criação** (Status: Em Andamento)
- Preencha: Título, Descrição, Data da Audiência
- Status inicial automático: "Em Andamento"

### 2. **Preenchimento** (→ Validação)
- Adicione: Nome, Email, Telefone, Endereço do notificado
- Status muda para: "Validação"

### 3. **Validação** (→ Concluído ou Em Andamento)
- **Aprovar** → Status: "Concluído"
- **Rejeitar** → Status: "Em Andamento" (volta para edição)

---

## 🗄️ Estrutura do Projeto

```
lawgic/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica das rotas
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Definição de rotas
│   │   ├── middleware/     # Middlewares
│   │   └── types/          # Tipos TypeScript
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── notifications/[id]/  # Página dinâmica
    │   │   ├── create/              # Criar notificação
    │   │   └── page.tsx             # Página inicial
    │   ├── components/     # Componentes React
    │   ├── lib/           # Configurações
    │   ├── store/         # Gerenciamento de estado
    │   └── services/      # Serviços de API
    └── package.json
```

---

## 🔌 Endpoints da API

### Notificações
- `GET    /api/notifications`     - Listar todas
- `GET    /api/notifications/:id` - Buscar por ID
- `POST   /api/notifications`     - Criar nova
- `PUT    /api/notifications/:id` - Atualizar
- `PATCH  /api/notifications/:id/validate` - Validar
- `DELETE /api/notifications/:id` - Excluir

### Health Check
- `GET    /api/health`            - Status do servidor

---

## 🧪 Testando a Aplicação

### 1. **Testes Manuais**
```bash
# Popular com dados de teste
cd backend
npm run seed

# Ou criar manualmente via frontend
# Acesse: http://localhost:3000/create
```

### 2. **Testes Automáticos**
```bash
# Backend tests
cd backend
npm test

# Frontend build test
cd frontend
npm run build
```

---

## 🔧 Troubleshooting Comum

### Erro 404 - Página não encontrada
```bash
# Verifique estrutura de pastas
ls -la src/app/notifications/[id]/
```

### Erro 400 - Bad Request
```bash
# Verifique formato de data (YYYY-MM-DD)
# Ex: 2024-01-15
```

### Erro de Conexão MongoDB
```bash
# Teste conexão com MongoDB
mongosh
use lawgic_db
db.stats()
```

### Portas Ocupadas
```bash
# Libere portas 3000 e 3001
npx kill-port 3000
npx kill-port 3001
```

### CORS Error
```bash
# Verifique se backend permite localhost:3000
# backend/src/server.ts
app.use(cors({ origin: 'http://localhost:3000' }))
```

---

## 🚀 Deploy em Produção

### Backend (Railway/Heroku)
```env
MONGODB_URI=sua_string_conexao_atlas
NODE_ENV=production
```

### Frontend (Vercel/Netlify)
```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api
```

---

## 📞 Suporte

### Comandos Úteis para Debug
```bash
# Verificar logs do backend
cd backend && npm run dev

# Verificar logs do frontend
cd frontend && npm run dev

# Testar API manualmente
curl http://localhost:3001/api/health
curl http://localhost:3001/api/notifications
```

### Se encontrar problemas:
1. Verifique console do navegador (F12)
2. Confirme MongoDB rodando
3. Verifique variáveis de ambiente
4. Reinicie ambos os servidores

---

## 📄 Licença
Projeto para fins educacionais e demonstração.

---

**✨ Pronto! Seu sistema Lawgic está configurado e pronto para uso!**

Acesse http://localhost:3000 e comece a gerenciar notificações judiciais! 🎉
