# 🏭 Autoflex - MRP System (Material Requirements Planning)

## 1. O Projeto
O **Autoflex** é um sistema completo de gestão e planejamento de necessidades de materiais (MRP - Material Requirements Planning). Ele foi desenvolvido para resolver o problema clássico de controle de estoque e otimização de produção em fábricas e lanchonetes.

A aplicação permite gerenciar matérias-primas, cadastrar produtos finais, criar receitas (vínculo entre produto e material) e, o mais importante: **calcular automaticamente a capacidade máxima de produção** com base no estoque atual, garantindo que nenhum recurso falte no meio da operação.

---

## 2. Front-end 🎨
<details>
<summary>👉 <b>Clique aqui para ver os detalhes do Front-end</b></summary>
<br>

A interface do Autoflex foi pensada para ser limpa, intuitiva e rápida, garantindo a melhor experiência para o usuário final.

* **Tecnologias utilizadas:** React.js, TypeScript, Tailwind e Redux.
* **Arquitetura:** Consumo de APIs RESTful de forma assíncrona.
* **Funcionalidades:**
  * Painéis de controle para gestão de Estoque (Matérias-Primas).
  * Telas de cadastro e atualização de Produtos e Receitas.
  * Design responsivo (Mobile First).

</details>

---

## 3. Back-end ⚙️
<details>
<summary>👉 <b>Clique aqui para ver os detalhes do Back-end</b></summary>
<br>

O coração do Autoflex é uma API REST robusta, focada em segurança, tratamento de erros centralizado e regras de negócio complexas.

* **Tecnologias utilizadas:** Java, Spring Boot, MySQL.
* **Destaques da Arquitetura:**
  * **Tratamento Global de Exceções:** Implementação de um `GlobalExceptionHandler` interceptando erros customizados (`BusinessRuleException` para erros 400 e `ResourceNotFoundException` para erros 404), garantindo respostas JSON limpas para o Front-end.
  * **Regras de Negócio Blindadas:** Validações rigorosas na camada de Service para evitar dados inconsistentes (preços negativos, nomes vazios) ou exclusões de itens em uso (`DataIntegrityViolationException`).
  * **Cálculo de MRP Otimizado:** Algoritmo complexo no `ProductionService` que cruza dados de estoque e receitas, utilizando mapeamento em memória (`HashMap`) para calcular o gargalo de produção de forma performática.
  * **Intelligent Data Seeding:** Uso de `CommandLineRunner` com `@ConditionalOnProperty`. O banco inicia vazio por padrão, mas possui um "interruptor" nas propriedades para auto-popular 20 produtos e receitas para facilitar testes locais.

</details>

---

## 4. Outras Informações 🚀

### Como rodar o projeto localmente
Para testar o Autoflex na sua máquina, siga os passos abaixo:
1. Clone este repositório: `git clone link-do-seu-repo`
2. Configure as variáveis de ambiente e a conexão com o seu banco MySQL no arquivo `application.properties`.
3. **Dica:** Se quiser rodar o projeto com o banco de dados já populado com 20 produtos para testes, altere a variável `mrp.seed.ativado=true`.
4. Inicie o servidor Spring Boot e rode o Front-end.

### Autor
Desenvolvido com muita dedicação por **Bruno Henrique (RiqueBruno)**.
