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

## Arquitetura e Organização do Projeto

O projeto tem como objetivo o desenvolvimento de um **Sistema de Locação de Veículos**, seguindo os princípios da **Clean Architecture**, com foco na separação de responsabilidades, clareza do código e facilidade de manutenção.

### Estrutura em Camadas (Clean Architecture)

A organização do projeto foi feita respeitando a divisão de camadas proposta:

- **Domain** 
Nesta camada ficam as entidades do sistema e os contratos (interfaces) dos repositórios. Aqui definimos o que é um carro, o que é um aluguel e quais operações precisam existir. Essa camada não depende de nenhuma biblioteca externa ou framework, mantendo as regras de negócio totalmente isoladas.

- **Application**
Contém os casos de uso da aplicação, responsáveis por executar as regras de negócio. O principal caso de uso implementado foi o `CreateRental`, que coordena todo o processo de criação de um aluguel, aplicando as validações necessárias antes de persistir os dados.

- **Infra**
Nesta camada estão as implementações concretas, como o acesso ao banco de dados utilizando o Prisma, além da configuração do container de injeção de dependência com o Inversify. Essa camada cuida apenas dos detalhes técnicos, sem influenciar a lógica do domínio.

- **Adapters**
Responsável pelos pontos de entrada da aplicação. Neste projeto, utilizamos um **CLI**, que simula o uso do sistema, recebendo dados e acionando os casos de uso por meio do container de dependências.

### Caso de Uso: CreateRental

O caso de uso `CreateRental` é responsável pelo cadastro de um novo aluguel no sistema. Antes de criar o aluguel, algumas regras de negócio obrigatórias são validadas:

- **Disponibilidade do carro:** não é permitido criar um aluguel para um carro que já esteja alugado.

- **Disponibilidade do usuário:** um usuário não pode possuir mais de um aluguel em aberto ao mesmo tempo.

- **Duração mínima:** o aluguel deve ter duração mínima de 24 horas. Caso contrário, uma exceção é lançada.

Essas validações garantem a consistência dos dados e evitam estados inválidos no sistema.

### Interface de Linha de Comando (CLI)

O CLI funciona como uma forma simples de interação com a aplicação. Ele recupera o caso de uso `CreateRental` diretamente do container de injeção de dependência e executa a criação de um aluguel com dados simulados, sem conter qualquer regra de negócio.
