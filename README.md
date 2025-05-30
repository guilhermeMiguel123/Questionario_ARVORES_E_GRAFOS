📚 Questionário de Revisão: Estruturas de Dados e Algoritmos em C
(Você pode substituir esta imagem por uma captura de tela do seu questionário em funcionamento!)

Um projeto interativo desenvolvido em React.js para auxiliar na revisão de conceitos fundamentais de Estruturas de Dados e Algoritmos, com foco na linguagem C. Ideal para estudantes e profissionais que desejam testar seus conhecimentos em tópicos como listas, pilhas, filas, algoritmos de ordenação e busca, árvores binárias e grafos.

✨ Funcionalidades
50 Questões Mistas: Combinação de perguntas objetivas e discursivas para uma revisão completa.
Pontuação Automática: As questões objetivas são corrigidas instantaneamente, com pontuação de 2 pontos por questão.
Dicas Inteligentes (via Gemini API): Um assistente de IA oferece dicas concisas para cada pergunta, sem entregar a resposta, incentivando o raciocínio.
Modo Claro/Escuro: Alterne facilmente entre temas visuais para maior conforto na leitura, com preferência salva no navegador.
Ordem Aleatória: As questões são randomizadas a cada nova tentativa, garantindo uma experiência de revisão diferente e desafiadora.
Design Responsivo: O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).
🛠️ Tecnologias Utilizadas
React.js
Tailwind CSS (para estilização rápida e responsiva)
Gemini API (para geração de dicas inteligentes)
MathJax (para renderização de notações matemáticas e científicas, como Big O)
🚀 Como Executar Localmente
Siga estas instruções para ter o questionário funcionando em sua máquina:

Pré-requisitos:

Certifique-se de ter o Node.js (versão LTS recomendada) e o npm (ou Yarn) instalados em sua máquina.
Clone este repositório para a sua máquina local:
Bash

git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
(Lembre-se de substituir SEU-USUARIO e SEU-REPOSITORIO pelos dados do seu próprio repositório)
Navegue até a pasta do projeto:
Bash

cd SEU-REPOSITORIO
Instale as Dependências:

Bash

npm install
# ou
yarn install
Configurar Tailwind CSS:
Embora os arquivos de configuração já estejam no repositório, garanta que o Tailwind esteja pronto para ser processado:

Certifique-se que o tailwind.config.js na raiz do projeto tenha o content configurado corretamente:
JavaScript

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // ...
}
Certifique-se que o src/index.css tenha as diretivas @tailwind no topo:
CSS

@tailwind base;
@tailwind components;
@tailwind utilities;
/* ... seu CSS existente ... */
Obtenha sua Chave de API do Gemini:

Vá para o Google AI Studio e crie uma nova chave de API.
Abra o arquivo src/App.js e localize a função fetchHint. Substitua "" pela sua chave:
JavaScript

const apiKey = "SUA_CHAVE_DE_API_AQUI"; // <-- Cole sua chave aqui
Atenção: Evite subir chaves de API diretamente para repositórios públicos em projetos reais. Para este projeto de estudo, é a forma mais simples.
Inicie o Aplicativo:

Bash

npm start
# ou
yarn start
O aplicativo será aberto no seu navegador padrão em http://localhost:3000.

🌐 Deploy para GitHub Pages
Este projeto está configurado para um deploy fácil e automático via GitHub Pages.

Pré-requisitos:

Seu projeto deve estar em um repositório no GitHub.
Instale o pacote gh-pages como dependência de desenvolvimento:
Bash

npm install --save-dev gh-pages
# ou
yarn add --dev gh-pages
Instale o pacote cross-env como dependência de desenvolvimento (para compatibilidade de variáveis de ambiente no Windows):
Bash

npm install --save-dev cross-env
# ou
yarn add --dev cross-env
Configure package.json:
Abra o arquivo package.json na raiz do seu projeto e adicione/ajuste as seguintes propriedades:

homepage: Defina a URL completa do seu GitHub Pages.
JSON

{
  "name": "nome-do-seu-questionario",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://seu-usuario.github.io/nome-do-seu-repositorio", // <--- Seu URL real!
  // ...
}
(Substitua seu-usuario e nome-do-seu-repositorio pelos seus dados reais)
scripts: Adicione os scripts predeploy e deploy, e ajuste o build para usar PUBLIC_URL com cross-env e HTTPS:
JSON

"scripts": {
  "start": "react-scripts start",
  "build": "cross-env PUBLIC_URL=https://seu-usuario.github.io/nome-do-seu-repositorio react-scripts build", // <--- Ajustar aqui!
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
},
(Lembre-se de usar https para a URL do PUBLIC_URL)
Faça o Commit e Push das Configurações:

Bash

git add .
git commit -m "Configurar deploy para GitHub Pages"
git push origin main # ou master
Execute o Deploy:

Bash

npm run deploy
# ou
yarn deploy
Este comando irá construir seu aplicativo e enviar os arquivos otimizados para a branch gh-pages no seu repositório.

Configure o GitHub Pages (no site do GitHub):

Vá para o seu repositório no GitHub.
Clique em Settings (Configurações) > Pages.
Em "Source", selecione a branch gh-pages e a pasta / (root).
Clique em Save.
Acesse o Questionário Online:
Após alguns minutos (o GitHub Pages leva um tempo para processar), seu questionário estará acessível na URL que você definiu na sua propriedade homepage! Lembre-se de fazer um recarregamento forçado (Ctrl + F5) se não vir as mudanças imediatamente.

