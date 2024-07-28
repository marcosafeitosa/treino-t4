       // teste
       
        const contentArray = [
          
         "I - Introdução. (Balão Verde)",
    "Seja bem-vindo(a) ao Treinamento Complementar II do Exército Brasileiro.",
    "Eu sou o Segunto Tenente Therus e irei treiná-lo(a).",
    "Não durma durante o treinamento para não ser auto-kickado(a).",
    "Responda às perguntas com \"Sim, Senhor\", e \"Não, Senhor\".",
    "Se aprovado(a), ao final do treinamento receberá a sigla Tc2 e poderá auxiliar os Treinamentos Básicos e os Treinamentos Complementares I.",
    "Se reprovado(a), terá a chance de refazer o treinamento em outro momento.",
    "O treinamento está dividido em três partes: Login, Relatório e ADR.",
    "Dúvidas?",
    "II - Login. (Balão Verde)",
    "Acesse o nosso site: exbrhabbo,com (troque a , por .)",
    "Clique em \"Login\" na parte superior direita.",
    "Me avise quando conseguir, irei passar o seu acesso via sussurro.",
    "Acessou?",
    "Muito bem, agora irei ajudar você a mudar a senha.",
    "No canto superior direito, clique na primeira letra ou caractere do seu nick.",
    "Em seguida, clique em \"Editar perfil\".",
    "Feito isso, abrirá a página para alteração da senha.",
    "Coloque a senha atual, em seguida a senha nova e por último, confirme-a.",
    "Escolha uma senha da qual possa se lembrar.",
    "Caso se esqueça, teremos que conversar com um Oficial.",
    "É importante que você mude a senha, pois se não alterá-la, não conseguirá realizar nenhuma ação no painel.",
    "Dúvidas?",
    "III - Relatório. (Balão Verde)",
    "Sempre que for auxiliar um treino, deverá preencher o relatório de treinamento, onde terá informações referentes à instrução.",
    "Esse relatório serve para que os Oficiais possam ter controle de treinadores, auxiliares, treinados aprovados e reprovados.",
    "Durante o treinamento, os treinadores poderão necessitar do seu auxílio em algumas explicações de tópicos, portanto, esteja sempre atento ao sussurro.",
    "Agora, pesquise no Youthube por: Exército Brasileiro - Treinamento Complementar II - Cm-Anonimo e assista ao vídeo sobre como preencher o relatório.",
    "Você terá 10 minutos para assistir o vídeo todo. Caso caia do treinamento, pode voltar ao QG e pedir para um Oficial trazê-lo de volta.",
    "Me comunique quando terminar de assistir.",
    "Dúvidas?",
    "Agora, iremos fazer um teste.",
    "No canto superior direito do painel, clique na primeira letra ou caractere do seu nick e em seguida, na opção “Criar relatório”.",
    "Estarei passando algumas informações referente ao preenchimento.",
    "IV - Área de Recrutas (ADR). (Balão Verde)",
    "A Área de Recrutas é o local onde os alistados irão aguardar o treinamento.",
    "Para acessar essa área, peça que o Oficial em MQG abra a “Porta Nave Espacial” que está à esquerda do QG.",
    "Você deve entreter o Recruta enquanto o treinamento não é enviado.",
    "Podendo perguntar se ele joga pelo PC ou Celular, se sabe falar em negrito, se é a primeira vez dele em Exércitos e coisas desse tipo.",
    "Somente um praça pode acompanhar os recrutas por vez, além do treinador, dando preferência à menor patente e a quem ainda não pôde auxiliar.",
    "Dúvidas?",
    "V - Finalização. (Balão Verde)",
    "Parabéns, está aprovado(a) no Treinamento Complementar II.",
    "Agora você poderá auxiliar os Treinamentos Básicos I e II e os Treinamentos Complementares I.",
    "Você também poderá ficar com os novos Recrutas na ADR até que chegue o momento do envio do treinamento.",
    "E, como dito anteriormente, para auxiliar um treinamento você deve pedir para um Oficial e se dirigir até a ADR.",
    "Pode alterar a sua sigla para Tc2, por favor."
];

        const container = document.getElementById('container');
        const alertBox = document.getElementById('alert');
        const copyPreviousButton = document.getElementById('copyPrevious');
        const copyNextButton = document.getElementById('copyNext');
        const startAutoCopyButton = document.getElementById('startAutoCopy');
        const stopAutoCopyButton = document.getElementById('stopAutoCopy');

        let autoCopyInterval;

        contentArray.forEach((paragraph, index) => {
          const p = document.createElement('p');
          p.className = 'paragraph';
          if (paragraph.includes('(Balão Verde)')) {
            p.classList.add('balao-verde');
          }
          p.dataset.index = index;
          p.innerText = paragraph;
          container.appendChild(p);
        });

        const paragraphs = document.querySelectorAll('.paragraph');

        function copyText(index) {
          if (index < 0 || index >= paragraphs.length) return;

          const textToCopy = paragraphs[index].innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            paragraphs.forEach(p => p.classList.remove('copied'));
            paragraphs[index].classList.add('copied');

            // Scroll to center the paragraph
            const containerHeight = container.clientHeight;
            const paragraphOffsetTop = paragraphs[index].offsetTop;
            const paragraphHeight = paragraphs[index].offsetHeight;
            const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
            container.scrollTo({ top: scrollTop, behavior: 'smooth' });

            // Show alert if paragraph contains "(Balão Verde)"
            if (paragraphs[index].classList.contains('balao-verde')) {
              showAlert();
              clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
            }
          }).catch(err => console.error('Failed to copy text: ', err));
        }

        function showAlert() {
          alertBox.style.display = 'block';
          setTimeout(() => {
            alertBox.style.display = 'none';
            enableButtons();
          }, 3000);
        }

        function enableButtons() {
          copyPreviousButton.disabled = false;
          copyNextButton.disabled = false;
        }

        let currentIndex = 0;

        copyPreviousButton.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            copyText(currentIndex);
          }
        });

        copyNextButton.addEventListener('click', () => {
          if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
          }
        });

        startAutoCopyButton.addEventListener('click', () => {
          autoCopyInterval = setInterval(() => {
            if (currentIndex < paragraphs.length - 1) {
              currentIndex++;
              copyText(currentIndex);
            } else {
              clearInterval(autoCopyInterval);
            }
          }, 4000);
        });

        stopAutoCopyButton.addEventListener('click', () => {
          clearInterval(autoCopyInterval);
        });

        // Copia automaticamente o primeiro parágrafo ao carregar a página
        window.onload = () => {
          copyText(currentIndex);
        };