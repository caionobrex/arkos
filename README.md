## Arkos Food E-Commerce
A Arkos Food é um e-commerce de comida onde o usuário é capaz
de realizar um cadastro, realizar login, adicionar items ao seu carrinho de compra,
editar quantidade dos produtos no carrinho e editar algumas informações do seu perfil.

Ela foi desenvolvida usando NextJs/MongoDB/NextAuth/TailWindCss.

## Adicionais

Foi adicionado um Dashboard com gráficos de estatísticas(usando ChartJs library) de vendas.
Esse Dashboard é apenas um caso de amostra do que poderia ser 
implementado em um e-commerce real. Em um caso real o acesso ao dashboard obviamente
seria restritos aqueles usuários com funções/permissões especificas.

## Notas Importantes

Não vi a necessidade de permitir que o usuário adicione items ao
carrinho apenas quando logado, já que esses items do carrinho
podem ser facilmente salvos no client-side usando a localStorage API.

Obviamente um usuário deslogado ao realizar o processo de checkout
teria que logar-se ou caso se não tivesse uma conta seria necessário
criar uma nova.

## Avisos

1º - Qualquer critica a essa aplicação é bem-vinda. Estou aqui disposto à aprender
o máximo possível. Pois quero me tornar um Dev melhor a cada dia.
Por favor, criticar tudo aquilo que você não gostou e dar
dicas de como poderia ser melhorado.

2º - Vou ser sincero e vou ter que dizer que não tenho
experiência com JestJS. Por isso que nada ligado a ele foi implementado.
Peço desculpas mas queria deixar claro que estou muito disposto à aprender.

3º - Não tenho costume de colocar minhas aplicações sob controle de versão
no inicio dela. No caso dessa aplicação, acabei esquecendo desse detalhe por
causa desse habito. Sorry =)
