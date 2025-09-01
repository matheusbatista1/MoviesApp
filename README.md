# Começando 🚀

### Pré-requisitos

Para começar, certifique-se de ter o **Docker**, **Node.js** e o **npm** instalados em sua máquina, pois o projeto utiliza **Docker** para rodar o banco de dados.
- **Docker**: É necessário para rodar o banco de dados.
- **Node.js**: `22.16.0`
- **npm**: `10.9.2`

---

### 💻 Stacks Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

#### **Backend**

* **Linguagem:** TypeScript
* **Framework:** Express.js
* **Banco de Dados:** PostgreSQL (rodando via Docker)
* **ORM:** Prisma
* **Armazenamento de Arquivos:** AWS S3
* **Envio de Emails:** Ethereal ```https://ethereal.email/``` **Necessário para inserir credenciais no .env e acompanhar os envios.**
* **Virtualização:** Docker

#### **Frontend**

* **Framework:** React
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS
  
---

### Configuração do Ambiente 🔧

Primeiro, você precisará configurar suas variáveis de ambiente.

1. Crie um arquivo `.env` na raiz do projeto.
2. Copie o conteúdo do arquivo `.env.example` para o seu novo arquivo `.env`.
3. Preencha as informações necessárias.

As variáveis que você precisa definir são:

- `ETHEREAL_USER` e `ETHEREAL_PASS`: Credenciais para o serviço de e-mail Ethereal.
- `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD`: Credenciais do seu banco de dados PostgreSQL.
- `DATABASE_URL`: String de conexão para o seu banco de dados.
- `JWT_SECRET`: Uma chave secreta para os JSON Web Tokens.
- `PORT`: A porta na qual a aplicação será executada (o padrão é `3000`).
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`, `AWS_S3_ENDPOINT`: Credenciais da **AWS S3** para armazenamento de arquivos.

**Exemplo do arquivo `.env`:**

**Keys de acesso da AWS adicionadas para facilitar os testes**

```ini
ETHEREAL_USER="SEU_ETHEREAL_USER"
ETHEREAL_PASS="SUA_ETHEREAL_PASS"

POSTGRES_DB="moviesdb"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres123"

DATABASE_URL="postgresql://postgres:postgres123@host.docker.internal:5433/moviesdb?schema=public"

JWT_SECRET="SEU_JWT_SECRET"
PORT=3000

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=
AWS_BUCKET_NAME=
AWS_S3_ENDPOINT=""
```

### Como Rodar o Projeto ⚙️

Para rodar a aplicação, siga as instruções para o **backend** e o **frontend** separadamente.

#### Backend

1. Na raiz do projeto, acesse a pasta `backend`:
   ```bash
   cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o script de setup para configurar o banco de dados e a aplicação:
    ```bash
    npm run setup
    ```

#### Frontend

1. Na raiz do projeto, acesse a pasta `frontend`:
   ```bash
   cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o script de setup para configurar o banco de dados e a aplicação:
    ```bash
    npm run dev
    ```
---

### Gerenciamento do Banco de Dados 📊

Para explorar o esquema e os dados do banco de dados, você pode usar o Prisma Studio.

-   Execute o comando abaixo para abrir o estúdio do banco de dados no seu navegador:
    ```bash
    npx prisma studio
    ```
Este comando fornece uma interface visual para gerenciar o conteúdo do seu banco de dados.


---

### 📝 Pontos Pendentes

Alguns pontos ficaram pendentes para a finalização do projeto e podem ser adicionados em futuras atualizações:

* **Tema Claro**: Implementação de um tema claro para o frontend.
* **Responsividade**: Melhoria na responsividade da tela de detalhes de filmes.
* **Ajustes na Edição**: Otimização e ajustes na funcionalidade de edição de filmes.
