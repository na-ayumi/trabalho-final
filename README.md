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
3. Popule o banco com dados de testes (Carros e Aluguéis)
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
    npm run dev -- criar-aluguel --id r1 --carId c1 --start 2024-11-01T10:00:00 --end 2024-11-02T12:00:00
    ```