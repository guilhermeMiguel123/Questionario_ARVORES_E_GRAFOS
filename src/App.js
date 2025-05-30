import React, { useState, useEffect, useMemo } from 'react'; // Adicione useMemo aqui

// Main App component
const App = () => {
  // State to store user's answers
  const [answers, setAnswers] = useState({});
  // State to control whether answers are submitted and displayed
  const [submitted, setSubmitted] = useState(false);
  // State to store the calculated score
  const [score, setScore] = useState(0);
  // State to manage hint visibility and content for each question
  const [hintStates, setHintStates] = useState({});
  // State for dark mode toggle, initialized from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  });

  // Effect to apply dark mode class to body and save preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1a202c'; // Dark background for body
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = ''; // Reset to default
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  // Original array of objective questions (constant)
  const originalObjectiveQuestions = [
    {
      id: 'q1',
      question: '1. Qual das seguintes estruturas de dados segue o princípio LIFO (Last In, First Out)?',
      options: ['Fila', 'Lista Encadeada', 'Pilha', 'Árvore Binária'],
      correctAnswer: 'Pilha',
      type: 'objective'
    },
    {
      id: 'q2',
      question: '2. Em uma lista encadeada simples, para acessar o $k$-ésimo elemento, qual é a complexidade de tempo no pior caso?',
      options: ['$\\mathcal{O}(1)$', '$\\mathcal{O}(\\log n)$', '$\\mathcal{O}(n)$', '$\\mathcal{O}(n^2)$'],
      correctAnswer: '$\\mathcal{O}(n)$',
      type: 'objective'
    },
    {
      id: 'q3',
      question: '3. Qual algoritmo de ordenação tem uma complexidade de tempo de $\\mathcal{O}(n^2)$ no pior caso, mas pode ser $\\mathcal{O}(n)$ no melhor caso se a lista já estiver ordenada e houver uma otimização?',
      options: ['Quick Sort', 'Merge Sort', 'Selection Sort', 'Bubble Sort'],
      correctAnswer: 'Bubble Sort',
      type: 'objective'
    },
    {
      id: 'q4',
      question: '4. Qual é a principal desvantagem de uma lista estática (array) em comparação com uma lista dinâmica (lista encadeada)?',
      options: ['Acesso mais lento aos elementos.', 'Dificuldade em implementar a busca sequencial.', 'Tamanho fixo, que pode levar a desperdício de memória ou estouro.', 'Maior consumo de memória por elemento.'],
      correctAnswer: 'Tamanho fixo, que pode levar a desperdício de memória ou estouro.',
      type: 'objective'
    },
    {
      id: 'q5',
      question: '5. Uma Árvore Binária de Busca (ABB) degenerada se comporta de forma semelhante a qual estrutura de dados linear em termos de complexidade de tempo para operações de busca, inserção e remoção?',
      options: ['Pilha', 'Fila', 'Lista Encadeada', 'Array'],
      correctAnswer: 'Lista Encadeada',
      type: 'objective'
    },
    {
      id: 'q6',
      question: '6. Qual algoritmo de busca exige que a lista esteja ordenada para funcionar eficientemente?',
      options: ['Busca Sequencial', 'Busca Binária', 'Busca em Profundidade', 'Busca em Largura'],
      correctAnswer: 'Busca Binária',
      type: 'objective'
    },
    {
      id: 'q7',
      question: '7. A operação `dequeue()` é associada a qual estrutura de dados?',
      options: ['Pilha', 'Fila', 'Lista Duplamente Encadeada', 'Árvore AVL'],
      correctAnswer: 'Fila',
      type: 'objective'
    },
    {
      id: 'q8',
      question: '8. Qual das seguintes notações Big O representa a maior eficiência para grandes valores de $n$?',
      options: ['$\\mathcal{O}(n^2)$', '$\\mathcal{O}(n \\log n)$', '$\\mathcal{O}(n)$', '$\\mathcal{O}(\\log n)$'],
      correctAnswer: '$\\mathcal{O}(\\log n)$',
      type: 'objective'
    },
    {
      id: 'q9',
      question: '9. Em um grafo, se as arestas têm uma direção (ex: de A para B, mas não necessariamente de B para A), ele é chamado de:',
      options: ['Grafo Não Direcionado', 'Grafo Ponderado', 'Dígrafo', 'Grafo Completo'],
      correctAnswer: 'Dígrafo',
      type: 'objective'
    },
    {
      id: 'q10',
      question: '10. Qual algoritmo de ordenação utiliza a estratégia "dividir para conquistar" e é estável?',
      options: ['Quick Sort', 'Selection Sort', 'Merge Sort', 'Shell Sort'],
      correctAnswer: 'Merge Sort',
      type: 'objective'
    },
    {
      id: 'q11',
      question: '11. O que é o fator de balanceamento em uma Árvore AVL?',
      options: ['O número total de nós na árvore.', 'A diferença entre o número de nós na subárvore esquerda e direita.', 'A diferença de altura entre as subárvores esquerda e direita de um nó.', 'O número de rotações necessárias para balancear a árvore.'],
      correctAnswer: 'A diferença de altura entre as subárvores esquerda e direita de um nó.',
      type: 'objective'
    },
    {
      id: 'q12',
      question: '12. Qual método de representação de grafos é mais eficiente em espaço para grafos esparsos (com poucas arestas)?',
      options: ['Matriz de Adjacência', 'Lista de Adjacência', 'Lista de Arestas', 'Nenhuma das anteriores'],
      correctAnswer: 'Lista de Adjacência',
      type: 'objective'
    },
    {
      id: 'q13',
      question: '13. Para percorrer uma Árvore Binária de Busca e obter seus elementos em ordem crescente, qual tipo de travessia deve ser utilizado?',
      options: ['Pré-ordem', 'Em-ordem', 'Pós-ordem', 'Nenhuma das anteriores'],
      correctAnswer: 'Em-ordem',
      type: 'objective'
    },
    {
      id: 'q14',
      question: '14. Qual das seguintes operações tem complexidade $\\mathcal{O}(1)$ em um array?',
      options: ['Inserir um elemento no meio.', 'Remover um elemento no início.', 'Acessar um elemento por seu índice.', 'Buscar um elemento.'],
      correctAnswer: 'Acessar um elemento por seu índice.',
      type: 'objective'
    },
    {
      id: 'q15',
      question: '15. O ShellSort é uma melhoria de qual algoritmo de ordenação?',
      options: ['Bubble Sort', 'Quick Sort', 'Insertion Sort', 'Selection Sort'],
      correctAnswer: 'Insertion Sort',
      type: 'objective'
    },
    {
      id: 'q16',
      question: '16. Qual é a principal característica de uma lista encadeada circular?',
      options: ['Cada nó tem dois ponteiros.', 'O último nó aponta para NULL.', 'O último nó aponta para o primeiro nó.', 'Os elementos são armazenados em memória contígua.'],
      correctAnswer: 'O último nó aponta para o primeiro nó.',
      type: 'objective'
    },
    {
      id: 'q17',
      question: '17. A busca em profundidade (DFS) em grafos utiliza implicitamente qual estrutura de dados para gerenciar os vértices a serem visitados?',
      options: ['Fila', 'Pilha', 'Lista Encadeada', 'Árvore'],
      correctAnswer: 'Pilha',
      type: 'objective'
    },
    {
      id: 'q18',
      question: '18. Qual das seguintes afirmações sobre o Selection Sort é verdadeira?',
      options: ['É um algoritmo de ordenação estável.', 'Sua complexidade no melhor caso é $\\mathcal{O}(n)$.', 'Ele realiza muitas trocas de elementos.', 'Sua complexidade é sempre $\\mathcal{O}(n^2)$.'],
      correctAnswer: 'Sua complexidade é sempre $\\mathcal{O}(n^2)$.',
      type: 'objective'
    },
    {
      id: 'q19',
      question: '19. Se você precisa de acesso rápido por índice e o tamanho da coleção é conhecido e fixo, qual estrutura de dados linear seria mais apropriada?',
      options: ['Lista Encadeada Simples', 'Lista Duplamente Encadeada', 'Array (Lista Estática)', 'Fila'],
      correctAnswer: 'Array (Lista Estática)',
      type: 'objective'
    },
    {
      id: 'q20',
      question: '20. Em um Quick Sort, a escolha de um pivô que é sempre o menor ou maior elemento da sublista leva a qual complexidade de tempo?',
      options: ['$\\mathcal{O}(n \\log n)$', '$\\mathcal{O}(n^2)$', '$\\mathcal{O}(\\log n)$', '$\\mathcal{O}(n)$'],
      correctAnswer: '$\\mathcal{O}(n^2)$',
      type: 'objective'
    },
    {
      id: 'q21',
      question: '21. Qual é a complexidade de tempo para inserir um elemento no início de uma lista duplamente encadeada?',
      options: ['$\\mathcal{O}(1)$', '$\\mathcal{O}(\\log n)$', '$\\mathcal{O}(n)$', '$\\mathcal{O}(n^2)$'],
      correctAnswer: '$\\mathcal{O}(1)$',
      type: 'objective'
    },
    {
      id: 'q22',
      question: '22. Qual algoritmo de ordenação é conhecido por ser "in-place" (não requer espaço auxiliar significativo) e não é estável?',
      options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
      correctAnswer: 'Quick Sort',
      type: 'objective'
    },
    {
      id: 'q23',
      question: '23. Se você precisa processar elementos na ordem em que eles chegam (primeiro a entrar, primeiro a sair), qual estrutura de dados você usaria?',
      options: ['Pilha', 'Fila', 'Lista Encadeada', 'Árvore Binária de Busca'],
      correctAnswer: 'Fila',
      type: 'objective'
    },
    {
      id: 'q24',
      question: '24. Uma árvore onde cada nó tem no máximo dois filhos é chamada de:',
      options: ['Árvore AVL', 'Árvore Binária de Busca', 'Árvore Binária', 'Grafo'],
      correctAnswer: 'Árvore Binária',
      type: 'objective'
    },
    {
      id: 'q25',
      question: '25. Qual é o principal objetivo de uma Árvore AVL em comparação com uma ABB simples?',
      options: ['Reduzir o consumo de memória.', 'Garantir que as operações de busca, inserção e remoção tenham complexidade $\\mathcal{O}(\\log n)$ no pior caso.', 'Permitir que a árvore tenha mais de dois filhos por nó.', 'Facilitar a travessia em pré-ordem.'],
      correctAnswer: 'Garantir que as operações de busca, inserção e remoção tenham complexidade $\\mathcal{O}(\\log n)$ no pior caso.',
      type: 'objective'
    },
    {
      id: 'q26',
      question: '26. Qual das seguintes aplicações é mais adequada para a Busca em Largura (BFS) em grafos?',
      options: ['Detecção de ciclos.', 'Encontrar o caminho mais curto em grafos não ponderados.', 'Ordenação topológica.', 'Todas as anteriores.'],
      correctAnswer: 'Encontrar o caminho mais curto em grafos não ponderados.',
      type: 'objective'
    },
    {
      id: 'q27',
      question: '27. A notação $\\mathcal{O}(\\log n)$ é característica de algoritmos que:',
      options: ['Acessam cada elemento uma vez.', 'Dividem o problema em subproblemas menores a cada passo.', 'Realizam comparações em pares adjacentes.', 'Reorganizam a lista em cada iteração.'],
      correctAnswer: 'Dividem o problema em subproblemas menores a cada passo.',
      type: 'objective'
    },
    {
      id: 'q28',
      question: '28. Qual o nome do nó que não possui filhos em uma árvore?',
      options: ['Raiz', 'Pai', 'Folha', 'Filho'],
      correctAnswer: 'Folha',
      type: 'objective'
    },
    {
      id: 'q29',
      question: '29. Em uma fila implementada com um array circular, o que acontece quando a fila está cheia e você tenta adicionar um novo elemento?',
      options: ['O elemento é inserido no início.', 'O elemento é descartado.', 'Ocorre um erro de "fila cheia" (overflow).', 'A fila redimensiona automaticamente.'],
      correctAnswer: 'Ocorre um erro de "fila cheia" (overflow).',
      type: 'objective'
    },
    {
      id: 'q30',
      question: '30. Qual algoritmo de ordenação é mais eficiente para listas pequenas ou quase ordenadas?',
      options: ['Merge Sort', 'Quick Sort', 'Insertion Sort', 'Bubble Sort (com otimização)'],
      correctAnswer: 'Insertion Sort',
      type: 'objective'
    },
  ];

  // Original array of discursive questions (constant)
  const originalDiscursiveQuestions = [
    {
      id: 'q31',
      question: '31. Explique a diferença fundamental entre uma Pilha e uma Fila, e cite um exemplo de aplicação real para cada uma.',
      type: 'discursive'
    },
    {
      id: 'q32',
      question: '32. Descreva o funcionamento do algoritmo Quick Sort. Quais são os principais desafios na escolha do pivô e como isso afeta a complexidade do algoritmo?',
      type: 'discursive'
    },
    {
      id: 'q33',
      question: '33. Compare as vantagens e desvantagens de implementar uma lista em C utilizando arrays (lista estática) versus ponteiros (lista encadeada dinâmica).',
      type: 'discursive'
    },
    {
      id: 'q34',
      question: '34. Explique o conceito de Notação Big O ($\\mathcal{O}$) e por que ela é importante na análise de algoritmos. Dê um exemplo de um algoritmo com complexidade $\\mathcal{O}(n)$ e outro com $\\mathcal{O}(n^2)$.',
      type: 'discursive'
    },
    {
      id: 'q35',
      question: '35. Detalhe como funciona o algoritmo Merge Sort. Por que ele é considerado um algoritmo de ordenação estável e qual sua complexidade de tempo e espaço?',
      type: 'discursive'
    },
    {
      id: 'q36',
      question: '36. Descreva o processo de busca em uma Árvore Binária de Busca (ABB). Qual é a complexidade de busca no melhor e no pior caso para uma ABB?',
      type: 'discursive'
    },
    {
      id: 'q37',
      question: '37. Explique o que é uma Árvore AVL e qual a sua principal vantagem em relação a uma Árvore Binária de Busca comum. Como o balanceamento é mantido em uma AVL?',
      type: 'discursive'
    },
    {
      id: 'q38',
      question: '38. Compare a Busca em Profundidade (DFS) e a Busca em Largura (BFS) em grafos. Cite uma aplicação para cada algoritmo.',
      type: 'discursive'
    },
    {
      id: 'q39',
      question: '39. Discuta as duas principais formas de representação de grafos em C (Matriz de Adjacência e Lista de Adjacência). Quando cada uma delas é mais apropriada?',
      type: 'discursive'
    },
    {
      id: 'q40',
      question: '40. Explique o funcionamento do Selection Sort. Por que ele é considerado um algoritmo de ordenação "in-place" e qual sua estabilidade?',
      type: 'discursive'
    },
    {
      id: 'q41',
      question: '41. Descreva o funcionamento do Bubble Sort. Que otimização pode ser aplicada para melhorar seu desempenho no melhor caso?',
      type: 'discursive'
    },
    {
      id: 'q42',
      question: '42. Qual a diferença entre uma lista encadeada simples e uma lista duplamente encadeada? Cite uma situação em que uma lista duplamente encadeada seria mais vantajosa.',
      type: 'discursive'
    },
    {
      id: 'q43',
      question: '43. Explique o conceito de "nó folha", "raiz" e "altura" em uma árvore binária.',
      type: 'discursive'
    },
    {
      id: 'q44',
      question: '44. Considere uma lista encadeada simples. Descreva o algoritmo para inserir um novo nó no final da lista.',
      type: 'discursive'
    },
    {
      id: 'q45',
      question: '45. Em uma pilha, como você implementaria as operações `push` e `pop` usando um array em C? Considere o tratamento de overflow e underflow.',
      type: 'discursive'
    },
    {
      id: 'q46',
      question: '46. Em uma fila, como você implementaria as operações `enqueue` e `dequeue` usando um array circular em C? Considere o tratamento de overflow e underflow.',
      type: 'discursive'
    },
    {
      id: 'q47',
      question: '47. Explique o que é uma travessia "em-ordem" em uma árvore binária e qual o resultado dessa travessia em uma ABB.',
      type: 'discursive'
    },
    {
      id: 'q48',
      question: '48. Qual a diferença entre pesquisa sequencial e busca binária? Quando você usaria cada uma delas?',
      type: 'discursive'
    },
    {
      id: 'q49',
      question: '49. Descreva brevemente o conceito de "pivô" no Quick Sort e por que sua escolha é tão importante para a eficiência do algoritmo.',
      type: 'discursive'
    },
    {
      id: '50',
      question: '50. Em grafos, o que significa um grafo ser "ponderado"? Dê um exemplo de aplicação para um grafo ponderado.',
      type: 'discursive'
    },
  ];

  // Combine all questions into a single array
  // CORREÇÃO: Use useMemo para memorizar allQuestions
  const allQuestions = useMemo(() => {
    return [...originalObjectiveQuestions, ...originalDiscursiveQuestions];
  }, []); 

  // State for shuffled questions
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions on initial load and when "Tentar Novamente" is clicked
  useEffect(() => {
    setShuffledQuestions(shuffleArray([...allQuestions]));
  }, [allQuestions]); // Dependência correta para allQuestions

  // Handler for question changes (both objective and discursive)
  const handleChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = () => {
    let currentScore = 0;
    originalObjectiveQuestions.forEach(q => { // Use original objective questions to check answers
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 2;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  // Function to render MathJax equations
  const renderMathJax = (text) => {
    if (typeof window !== 'undefined' && window.MathJax) {
      // Ensure MathJax processes the new content
      setTimeout(() => window.MathJax.typesetPromise(), 0);
    }
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  // Function to fetch hint from Gemini API
  const fetchHint = async (questionId, questionText) => {
    setHintStates(prev => ({
      ...prev,
      [questionId]: { loading: true, hint: null, show: true }
    }));

    try {
      const chatHistory = [];
      const prompt = `Para a seguinte pergunta, forneça uma dica concisa e útil, sem revelar a resposta direta. A dica deve guiar o usuário para o conceito ou abordagem correta. Pergunta: ${questionText}`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const hintText = result.candidates[0].content.parts[0].text;
        setHintStates(prev => ({
          ...prev,
          [questionId]: { loading: false, hint: hintText, show: true }
        }));
      } else {
        setHintStates(prev => ({
          ...prev,
          [questionId]: { loading: false, hint: 'Não foi possível gerar a dica. Tente novamente.', show: true }
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar dica:", error);
      setHintStates(prev => ({
        ...prev,
        [questionId]: { loading: false, hint: 'Erro ao gerar a dica. Verifique sua conexão.', show: true }
      }));
    }
  };

  // Function to close hint
  const closeHint = (questionId) => {
    setHintStates(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], show: false }
    }));
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'} p-4 sm:p-8 font-inter transition-colors duration-300`}>
      {/* Header section */}
      <header className="mb-8 text-center relative">
        <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-800'} mb-2`}>Questionário de Revisão</h1>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Estruturas de Dados e Algoritmos em C</p>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`absolute top-0 right-0 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-600'} shadow-md hover:scale-110 transition-transform duration-200`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-4.275l-.707-.707M4.372 4.372l-.707-.707m15.325 15.325l-.707-.707M4.372 19.628l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      {/* Questionnaire section */}
      <div className={`max-w-4xl mx-auto rounded-xl shadow-2xl p-6 sm:p-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {shuffledQuestions.map(q => (
          <div
            key={q.id}
            className={`mb-12 p-6 rounded-lg shadow-lg relative transition-all duration-300 ease-in-out
              ${isDarkMode ? 'bg-gray-700 text-gray-100 hover:shadow-xl hover:scale-[1.01]' : 'bg-blue-50 text-gray-800 hover:shadow-xl hover:scale-[1.01]'}`
            }
          >
            <p className="text-lg font-semibold mb-4">{renderMathJax(q.question)}</p>
            {q.type === 'objective' ? (
              <div className="space-y-3">
                {q.options.map(option => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer p-3 rounded-md transition-colors duration-200 ease-in-out
                      ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-blue-100'}`
                    }
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      onChange={() => handleChange(q.id, option)}
                      checked={answers[q.id] === option}
                      disabled={submitted}
                      className={`form-radio h-5 w-5 ${isDarkMode ? 'text-indigo-400 border-gray-500' : 'text-indigo-600 border-gray-300'} rounded-full focus:ring-indigo-500`}
                    />
                    <span className="ml-3 text-base">{renderMathJax(option)}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                name={q.id}
                rows="6"
                onChange={(e) => handleChange(q.id, e.target.value)}
                value={answers[q.id] || ''}
                disabled={submitted}
                className={`w-full p-4 border rounded-lg resize-y ${isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-300 focus:ring-indigo-400 focus:border-indigo-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'} transition duration-200 ease-in-out`}
                placeholder="Digite sua resposta aqui..."
              ></textarea>
            )}
            
            {!submitted && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => fetchHint(q.id, q.question)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition duration-200 ease-in-out ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
                  disabled={hintStates[q.id]?.loading}
                >
                  {hintStates[q.id]?.loading ? 'Gerando Dica...' : 'Pedir Dica'}
                </button>
              </div>
            )}

            {/* Hint display */}
            {hintStates[q.id]?.show && (
              <div className={`mt-4 p-4 rounded-lg relative ${isDarkMode ? 'bg-purple-800 border-purple-600 text-purple-200' : 'bg-purple-100 border-purple-300 text-purple-800'}`}>
                <button
                  onClick={() => closeHint(q.id)}
                  className={`absolute top-2 right-2 font-bold text-lg ${isDarkMode ? 'text-purple-400 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'}`}
                >
                  &times; {/* 'x' character */}
                </button>
                <p className="font-semibold mb-2">Dica:</p>
                <p>{hintStates[q.id]?.hint}</p>
              </div>
            )}
          </div>
        ))}

        {/* Submit button */}
        {!submitted && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className={`px-8 py-4 font-bold rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out ${isDarkMode ? 'bg-indigo-700 text-white hover:bg-indigo-600 focus:ring-indigo-500' : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300'}`}
            >
              Finalizar Questionário
            </button>
          </div>
        )}

        {/* Display submitted answers and final note */}
        {submitted && (
          <div className={`mt-12 p-8 rounded-xl shadow-inner border ${isDarkMode ? 'bg-green-900 border-green-700 text-gray-100' : 'bg-green-50 border-green-200 text-gray-800'}`}>
            <h2 className={`text-3xl font-extrabold mb-6 text-center ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>Suas Respostas</h2>
            {Object.keys(answers).length > 0 ? (
              <div className="space-y-6">
                {/* Display score */}
                <div className={`p-5 rounded-lg shadow-md text-center mb-6 ${isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
                  <p className="font-bold text-2xl">
                    Sua pontuação nas questões objetivas: {score} / {originalObjectiveQuestions.length * 2}
                  </p>
                </div>
                {shuffledQuestions.map(q => ( // Iterate through shuffled questions to display answers
                  <div key={q.id} className={`p-5 rounded-lg shadow-sm border ${isDarkMode ? 'bg-gray-700 border-green-800 text-gray-100' : 'bg-white border-green-100 text-gray-800'}`}>
                    <p className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                      {renderMathJax(q.question)}
                    </p>
                    <p className="whitespace-pre-wrap">{renderMathJax(answers[q.id] || 'Não respondido.')}</p>
                    {q.type === 'objective' && (
                      <p className={`text-sm mt-2 ${answers[q.id] === q.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                        {answers[q.id] === q.correctAnswer ? 'Correto!' : `Incorreto. Resposta correta: ${renderMathJax(q.correctAnswer)}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nenhuma resposta foi fornecida.</p>
            )}

            {/* Final Note */}
            <div className={`mt-10 p-6 rounded-lg border text-center ${isDarkMode ? 'bg-yellow-900 border-yellow-700 text-yellow-200' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
              <p className="font-semibold text-xl mb-2">Nota Importante:</p>
              <p className="text-lg">
                Este questionário é uma ferramenta de autoavaliação. As questões objetivas valem 2 pontos cada.
                As respostas discursivas não são corrigidas automaticamente.
                Use-o para revisar e solidificar seus conhecimentos. A prática leva à perfeição!
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({}); // Clear answers when trying again
                  setScore(0); // Reset score
                  setHintStates({}); // Clear hint states
                  // Re-shuffle all questions for a new attempt
                  setShuffledQuestions(shuffleArray([...allQuestions]));
                }}
                className={`px-6 py-3 font-bold rounded-lg shadow-md hover:scale-105 transition duration-300 ease-in-out ${isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-600 focus:ring-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300'}`}
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tailwind CSS import */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* MathJax for rendering LaTeX equations */}
      <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </div>
  );
};

export default App;