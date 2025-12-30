document.getElementById('mealPlanForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const days = document.getElementById('days').value;
    const resultDiv = document.getElementById('result');

    if (!days || days < 1 || days > 28) {
        resultDiv.innerHTML = '<p>Proszę wprowadzić liczbę dni w granicach od 1 do 28.</p>';
        return;
    }

    try {
        const apiKey = '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';
        const prompt = {
            "prompt": "Generuj plan posiłków na cały tydzień dla 1 osoby, która ma konsumpcję kkaloryczną wynoszącą 2000 kcal. Upewnij się, że plan nie zawiera laktozy i jest zbilansowany. Rozważ różne rodzaje danek, takie jak śniadania, obiady i kolacje.",
            "days": days,
            "number_of_people": 1,
            "calories": 2000,
            "lactose_free": true
        };

        // Używamy właściwego endpointa API Perplexity.io
        const apiUrl = 'https://api.perplexity.ai/chat/completions';

        console.log('Fetching data from:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(prompt)
        });

        if (!response.ok) {
            throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    } catch (error) {
        console.error('Błąd:', error.message);
        resultDiv.innerHTML = '<p>Wystąpił błąd podczas generowania planu.</p>';
    }
});