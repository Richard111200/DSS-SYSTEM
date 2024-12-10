const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const actionAnimeRecommendations = [
    {
        title: "Demon Slayer",
        description: "Demon Slayer follows Tanjiro Kamado, a young boy who becomes a demon slayer after his family is slaughtered by demons, and his sister Nezuko is turned into one. The series is known for its stunning animation and emotional storytelling.",
        details: {
            type: "TV",
            episodes: 26,
            status: "Completed",
            genres: ["Action", "Adventure", "Fantasy"],
            producer: "Ufotable",
            duration: "23 mins per episode",
            rating: "8.6/10"
        }
    },
    {
        title: "Naruto",
        description: "Naruto is about a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the village leader. It’s filled with action, adventure, and themes of friendship and perseverance.",
        details: {
            type: "TV",
            episodes: 220,
            status: "Completed",
            genres: ["Action", "Adventure", "Fantasy"],
            producer: "Pierrot",
            duration: "23 mins per episode",
            rating: "8.3/10"
        }
    },
    {
        title: "Jujutsu Kaisen",
        description: "Jujutsu Kaisen follows Yuji Itadori, a high school student who becomes involved in the world of Jujutsu Sorcerers after ingesting a cursed object. It’s known for its thrilling action sequences and deep character development.",
        details: {
            type: "TV",
            episodes: 24,
            status: "Ongoing",
            genres: ["Action", "Horror", "Supernatural"],
            producer: "MAPPA",
            duration: "24 mins per episode",
            rating: "8.7/10"
        }
    },
    {
        title: "Eminence in Shadow",
        description: "Eminence in Shadow follows Cid Kagenou, a boy who dreams of being a mastermind behind the scenes. He trains in secret to become a powerful shadow, building an organization that he believes will help him fulfill his ambitions.",
        details: {
            type: "TV",
            episodes: 20,
            status: "Ongoing",
            genres: ["Action", "Comedy", "Fantasy"],
            producer: "Nexus",
            duration: "24 mins per episode",
            rating: "8.0/10"
        }
    },
    {
        title: "Solo Leveling",
        description: "Solo Leveling is about Sung Jin-Woo, the weakest hunter who unexpectedly gains the ability to level up in a world filled with monsters. He rises from the bottom to the top, facing powerful foes along the way.",
        details: {
            type: "TV",
            episodes: 12,
            status: "Upcoming",
            genres: ["Action", "Fantasy", "Adventure"],
            producer: "A-1 Pictures",
            duration: "24 mins per episode",
            rating: "N/A"
        }
    }
];

let lastChosenAnime;

// Load chat history from localStorage
function loadChatHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    savedHistory.forEach(({ message, isUser }) => addMessage(message, isUser));
}

// Save chat history to localStorage
function saveChatHistory() {
    const messages = Array.from(document.querySelectorAll('.chat-message')).map((msg) => ({
        message: msg.innerText,
        isUser: msg.classList.contains('user-message'),
    }));
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', isUser ? 'user-message' : 'bot-message');
    messageElement.innerText = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom

    // Save updated chat history
    saveChatHistory();
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Random first input response
    if (lowerCaseMessage.includes('action')) {
        const recommendations = actionAnimeRecommendations.map((anime, index) => `${index + 1}. ${anime.title}`).join('\n');
        lastChosenAnime = null; // Reset last chosen anime
        return `Here are some action anime recommendations:\n${recommendations}\nPlease choose a number from 1 to 5.`;
    }

    const chosenIndex = parseInt(lowerCaseMessage) - 1;
    if (chosenIndex >= 0 && chosenIndex < actionAnimeRecommendations.length) {
        lastChosenAnime = actionAnimeRecommendations[chosenIndex];
        return `${lastChosenAnime.description}\nAsk me more about its extra details like type, episodes, status, genres, producer, duration and rating.`;
    }

    if (lastChosenAnime) {
        if (lowerCaseMessage.includes("type")) {
            return `The type of ${lastChosenAnime.title} is ${lastChosenAnime.details.type}.`;
        }
        if (lowerCaseMessage.includes("episodes")) {
            return `There are ${lastChosenAnime.details.episodes} episodes of ${lastChosenAnime.title}.`;
        }
        if (lowerCaseMessage.includes("status")) {
            return `The status of ${lastChosenAnime.title} is ${lastChosenAnime.details.status}.`;
        }
        if (lowerCaseMessage.includes("genres")) {
            return `The genres of ${lastChosenAnime.title} are ${lastChosenAnime.details.genres.join(", ")}.`;
        }
        if (lowerCaseMessage.includes("producer")) {
            return `The producer of ${lastChosenAnime.title} is ${lastChosenAnime.details.producer}.`;
        }
        if (lowerCaseMessage.includes("duration")) {
            return `The duration per episode of ${lastChosenAnime.title} is ${lastChosenAnime.details.duration}.`;
        }
        if (lowerCaseMessage.includes("rating")) {
            return `The rating of ${lastChosenAnime.title} is ${lastChosenAnime.details.rating}.`;
        }
    }

    return "I didn't understand that. Please ask me something else or choose an anime.";
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, false);
        userInput.value = ''; // Clear input field
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Load chat history when the page loads
loadChatHistory();
