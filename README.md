Este é um guia para ajudar você a executar o projeto e instalar as dependências necessárias, incluindo o SQLite, tanto para o back-end quanto para o front-end. Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de prosseguir.

Instalação
Siga as etapas abaixo para configurar o projeto em sua máquina local.

Clone o repositório
bash
Copy code
git clone https://github.com/thiagosan593/EntregaFinalA3
cd seu-projeto
Instale as dependências do back-end
bash
Copy code
cd backend
npm install
Instale as dependências do front-end
bash
Copy code
cd frontend
npm install
Instale o SQLite
Para o projeto funcionar corretamente, você precisará instalar o SQLite em sua máquina. Siga as instruções apropriadas para o seu sistema operacional.

Windows: Você pode baixar o executável do SQLite a partir do site oficial em https://www.sqlite.org/download.html. Após o download, adicione o diretório do executável ao PATH do sistema.

MacOS: Você pode instalar o SQLite usando o Homebrew executando o seguinte comando no terminal:

Copy code
brew install sqlite3
Linux (Ubuntu): Você pode instalar o SQLite usando o apt-get executando o seguinte comando no terminal:

arduino
Copy code
sudo apt-get install sqlite3
Certifique-se de que o SQLite foi instalado corretamente executando o seguinte comando no terminal:

css
Copy code
sqlite3 --version
Executando o projeto
Após a instalação das dependências e do SQLite, você está pronto para executar o projeto.

Executando o back-end
bash
Copy code
cd backend
npm start
Isso iniciará o servidor back-end e você verá uma mensagem indicando que o servidor está em execução.

Executando o front-end
bash
Copy code
cd frontend
npm start
Isso iniciará o servidor de desenvolvimento para o front-end. Após a compilação bem-sucedida, você poderá acessar o projeto em seu navegador em http://localhost:3000.

Contribuindo
Se você quiser contribuir para este projeto, sinta-se à vontade para fazer um fork e enviar pull requests. Ficarei feliz em revisar e mesclar as alterações.

Problemas
Se você encontrar algum problema ao configurar ou executar o projeto, verifique se todas as etapas foram seguidas corretamente, incluindo a instalação do SQLite. Se o problema persistir, sinta-se à vontade para abrir um problema no repositório ou entrar em contato comigo diretamente.

Licença
Este projeto está licenciado sob a MIT License.
