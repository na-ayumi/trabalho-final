## Sistema de Aluguel de Carros - RentX

### Instalações e Configurações

1. Instale as dependências
    ``` bash
    npm install
    ```
    
2. Crie o banco de dados (SQLite) e as tabelas
    ``` bash
    npm run prisma:migrate
    ```
3. Popule o banco com dados de testes (Carros)
    ``` bash
    npm run prisma:seed
    ```

### Execução

- Para rodar os Testes Unitários:
    ``` bash
    npx vitest run
    ```

- Para rodar a Aplicação Real (CLI + SQLite)
    ``` bash
    npx tsx src/adapters/cli/main.ts
    ```