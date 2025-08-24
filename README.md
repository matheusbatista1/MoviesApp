# Começando 🚀

### Pré-requisitos

Para começar, certifique-se de ter o **Docker**, **Node.js** e o **npm** instalados em sua máquina, pois o projeto utiliza **Docker** para rodar o banco de dados.
-   **Docker**: É necessário para rodar o banco de dados.
-   **Node.js**: `22.16.0`
-   **npm**: `10.9.2`

---

### 💻 Stacks Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

#### **Backend**

* **Linguagem:** TypeScript
* **Framework:** Express.js
* **Banco de Dados:** PostgreSQL (rodando via Docker)
* **ORM:** Prisma
* **Armazenamento de Arquivos:** AWS S3
* **Envio de Emails:** Ethereal
* **Virtualização:** Docker

#### **Frontend**

* **Framework:** React
* **Estilização:** Tailwind CSS
  
---

### Configuração do Ambiente 🔧

Primeiro, você precisará configurar suas variáveis de ambiente.

1.  Crie um arquivo `.env` na raiz do projeto.
2.  Copie o conteúdo do arquivo `.env.example` para o seu novo arquivo `.env`.
3.  Preencha as informações necessárias.

As variáveis que você precisa definir são:

-   `ETHEREAL_USER` e `ETHEREAL_PASS`: Credenciais para o serviço de e-mail Ethereal.
-   `POSTGRES_DB`, `POSTGRES_USER` e `POSTGRES_PASSWORD`: Credenciais do seu banco de dados PostgreSQL.
-   `DATABASE_URL`: String de conexão para o seu banco de dados.
-   `JWT_SECRET`: Uma chave secreta para os JSON Web Tokens.
-   `PORT`: A porta na qual a aplicação será executada (o padrão é `3000`).
-   `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`, `AWS_S3_ENDPOINT`: Credenciais da **AWS S3** para armazenamento de arquivos.

**Exemplo do arquivo `.env`:**

```ini
ETHEREAL_USER="SEU_ETHEREAL_USER"
ETHEREAL_PASS="SUA_ETHEREAL_PASS"

POSTGRES_DB="moviesdb"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres123"

DATABASE_URL="postgresql://postgres:postgres123@host.docker.internal:5433/moviesdb?schema=public"

JWT_SECRET="SEU_JWT_SECRET"
PORT=3000

AWS_ACCESS_KEY_ID="SUA_CHAVE_DE_ACESSO_AWS"
AWS_SECRET_ACCESS_KEY="SUA_CHAVE_SECRETA_AWS"
AWS_REGION="SUA_REGIAO_AWS"
AWS_BUCKET_NAME="SEU_NOME_DO_BUCKET_AWS"
AWS_S3_ENDPOINT="SEU_ENDPOINT_S3_AWS"
```

### Instalação e Configuração ⚙️

Com o ambiente configurado, você pode instalar as dependências e configurar o projeto.

1.  Execute o seguinte comando para instalar todos os pacotes necessários:
    ```bash
    npm install
    ```
2.  Após a instalação, execute o script de configuração para preparar o banco de dados e a aplicação:
    ```bash
    npm run setup
    ```

---

### Gerenciamento do Banco de Dados 📊

Para explorar o esquema e os dados do banco de dados, você pode usar o Prisma Studio.

-   Execute o comando abaixo para abrir o estúdio do banco de dados no seu navegador:
    ```bash
    npx prisma studio
    ```
Este comando fornece uma interface visual para gerenciar o conteúdo do seu banco de dados.
