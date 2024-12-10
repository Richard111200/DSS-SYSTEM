let selectedAnime = localStorage.getItem('selectedAnime') || null;

document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.toLowerCase().trim();
    const chatWindow = document.getElementById('chat-window');

    if (!userInput) return;

    // Append user message to the chat
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.innerText = userInput;
    chatWindow.appendChild(userMessage);
    document.getElementById('user-input').value = '';

    // Process user input
    if (userInput.includes('isekai')) {
        showAnimeRecommendations(chatWindow);
    } else if (userInput.match(/[1-5]/)) {
        selectedAnime = userInput.match(/[1-5]/)[0];
        localStorage.setItem('selectedAnime', selectedAnime);  // Save to localStorage
        respondWithDescription(selectedAnime, chatWindow);
    } else if (selectedAnime && isExtraDetailRequest(userInput)) {
        respondWithExtraDetails(selectedAnime, userInput, chatWindow);
    } else {
        showDefaultResponse(chatWindow);
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
});

function showAnimeRecommendations(chatWindow) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.innerHTML = `
        Here are some isekai anime recommendations:
        <br>1. Welcome to Demon School! Iruma-kun
        <br>2. The Rising of the Shield Hero
        <br>3. How Not to Summon a Demon Lord
        <br>4. The Strongest Sage with the Weakest Crest
        <br>5. Wise Man's Grandchild
        <br><br>Choose 1 to 5 for more details.
    `;
    chatWindow.appendChild(botMessage);
}

function respondWithDescription(selectedAnime, chatWindow) {
    const animeDescriptions = {
        "1": "A story of a human boy in a demon school, where he navigates challenges while hiding his identity.",
        "2": "An isekai adventure of a hero with a shield, facing betrayal and rising against odds.",
        "3": "A socially awkward gamer gets summoned to another world, where he pretends to be a powerful demon lord.",
        "4": "A reincarnated sage aims to gain strength to combat a great evil, facing challenges with his allies.",
        "5": "A man reincarnated in a magical world, trained by a wise sage, becomes overpowered and battles evil."
    };

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.innerHTML = `
        <strong>Description:</strong> ${animeDescriptions[selectedAnime]}
        <br><br>Feel free to ask for more details like episodes, genre, type, status, producer, duration, or rating.
    `;
    chatWindow.appendChild(botMessage);
}

function isExtraDetailRequest(userInput) {
    const detailsKeywords = ["episodes", "genre", "type", "status", "producer", "duration", "rating"];
    return detailsKeywords.some(keyword => userInput.includes(keyword));
}

function respondWithExtraDetails(selectedAnime, userInput, chatWindow) {
    const animeDetails = {
        "1": {
            type: "TV",
            episodes: "23",
            status: "Ongoing",
            genre: "Comedy, Fantasy",
            producer: "NHK",
            duration: "23 mins per episode",
            rating: "7.8"
        },
        "2": {
            type: "TV",
            episodes: "25",
            status: "Completed",
            genre: "Action, Adventure, Drama",
            producer: "Kadokawa",
            duration: "24 mins per episode",
            rating: "8.0"
        },
        "3": {
            type: "TV",
            episodes: "12",
            status: "Completed",
            genre: "Ecchi, Comedy, Fantasy",
            producer: "Kodansha",
            duration: "23 mins per episode",
            rating: "7.2"
        },
        "4": {
            type: "TV",
            episodes: "12",
            status: "Completed",
            genre: "Fantasy, Action",
            producer: "Aniplex",
            duration: "24 mins per episode",
            rating: "6.9"
        },
        "5": {
            type: "TV",
            episodes: "12",
            status: "Completed",
            genre: "Isekai, Fantasy, Magic",
            producer: "Silver Link",
            duration: "24 mins per episode",
            rating: "6.8"
        }
    };

    const detailKeyMap = {
        "episodes": "Episodes",
        "genre": "Genre",
        "type": "Type",
        "status": "Status",
        "producer": "Producer",
        "duration": "Duration",
        "rating": "Rating"
    };

    const detailKey = Object.keys(detailKeyMap).find(key => userInput.includes(key));
    const detailValue = animeDetails[selectedAnime][detailKey];

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.innerHTML = `
        <strong>${detailKeyMap[detailKey]}:</strong> ${detailValue}
    `;
    chatWindow.appendChild(botMessage);
}

function showDefaultResponse(chatWindow) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.innerText = "I didn't understand that. Please ask for isekai anime recommendations or choose 1-5 for details.";
    chatWindow.appendChild(botMessage);
}
