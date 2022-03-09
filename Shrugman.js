class Shrugman {
    constructor() {
        this.gameOn = true;
        this.knownLettersList = [];
        this.playedWords = {
            movies: [],
            books: []
        };
        this.shrugmanEmoji = '¯\\_(:/)_/¯'
        this.attempts = this.shrugmanEmoji.length;
        this.stats = [];
        this.options = {
            movies: [
                'A Space Odyssey ', 'The Godfather', 'Citizen Kane', 'Saving Private Ryan', 'Raiders of the Lost Ark', 'La Dolce Vita', 'Seven Samurai',
                'In the Mood for Love' ,'There Will Be Blood', 'Singin`in the Rain', 'Good Fellas', 'North by Northwest', 'Mullholland Drive',
                'Bicycle Thieves', 'The Dark Knight', 'City Lights', 'Grand Illusion', 'His Girl Friday', 'The Red Shoes', 'Vertigo', 'Beau Travail'
            ],
            books: [
                'In Search of Lost Time', 'Ulysses', 'Don Quixote', 'One Hundred Years of Solitude', 'The Great Gatsby', 'Moby Dick', 'War and Peace',
                'Hamlet', 'The Odyssey', 'Madam Bovary', 'The Divine Comedy', 'Lolita', 'The Brothers', 'Crime', 'Wuthering Heights', 'The Catcher',
                'Pride and Prejudice', 'The Adventures of Huckleberry Finn', 'Anna Karenina'
            ]
        }

        this.category = Object.keys(this.options)[0];
        this.currentWord = this.getSecretWord(this.category);
    }

   // Set a category
    
    setCategory(category) {
        if (!this.options.hasOwnProperty(category)) {
            return false;
        }

        this.category = category;

        return true;
    }

    // Find a word to guess
    getSecretWord(category) {
        let randomIndex = Math.floor(Math.random() * this.options[category].length);
        let secretWord = this.options[category][randomIndex];

        if (this.playedWords[this.category] === this.options[this.category]) {
            this.playedWords[this.category] = [];
        }

        while (this.playedWords[this.category].includes(secretWord)) {
            randomIndex = Math.floor(Math.random() * this.options[category].length);
            secretWord = this.options[category][randomIndex];
        }

        this.playedWords[this.category].push(secretWord);

        return secretWord;
    }

    // Validate guess
    validateGuess(letter) {
        if (!letter) {
            return false;
        }

        if (letter.length !== 1) {
            return false;
        }

        return !this.knownLettersList.includes(letter.toLowerCase());
    }

    // Update game 
    update(letter) {
        this.knownLettersList.push(letter.toLowerCase());

        // LowerCase only if the letter is not included in the word
        if (!this.currentWord.toLowerCase().includes(letter)) {
            this.attempts--;
        }
    }

    showWord() {
        const characters = this.currentWord.split('');

        return characters.map((char) => {
            if (this.knownLettersList.includes(char.toLowerCase())) {
                return char;
            } else if (char === ' ') {
                return char;
            } else {
                return '_'
            }
        }).join('');
    }

    showShrugman() {
        const shrugEmoji = this.shrugmanEmoji.split('');

        return shrugEmoji.slice(0, shrugEmoji.length - this.attempts).join('');
    }

    // Status(win or loss)
    updateStats(gameResult) {
        this.stats.push({
            word: this.currentWord,
            result: gameResult ? 'win' : 'loss'
        });
    }

    // Check game status 
    isWinning() {
        return this.currentWord === this.showWord();
    }

    isGameOn() {
        if (this.attempts === 0) {
            return false;
        }

        if (this.isWinning()) {
            return false;
        }

        return true;
    }

    // Reset game
    reset() {
        this.knownLettersList = [];
        this.attempts = this.shrugmanEmoji.length;
        this.currentWord = this.getSecretWord(this.category);
    }
}

module.exports = Shrugman;