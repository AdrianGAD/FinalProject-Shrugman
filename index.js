const prompt = require('prompt-sync')({sigint:true});
const colors = require('colors');
const Shrugman = require('./Shrugman');

const game = new Shrugman();

// Cleanup screen and display word
console.clear();
let name = prompt(colors.rainbow('Enter your name: '));
console.log(colors.rainbow('Hello:'), colors.bgBlue(name));
let gameStart = prompt( colors.green('Do you want to start the game? (y/n) '));

        if (gameStart === 'y') {
            console.clear();
            console.log(`\n${game.showWord()}\n`);
            console.log(colors.rainbow(`\n${game.showShrugman()}\n`));
        } else {
            console.log(colors.bold.white('👋 Bye and see you next round.'));
        }

// Select category
let category = prompt(colors.blue('Choose one category: movies 🎥, books 📕 '));
while (!game.setCategory(category)) {
    category = prompt('Choose category: movies or books ');
}

console.clear();
console.log(colors.green(`\n${game.showWord()}\n`));
console.log(colors.rainbow(`\n${game.showShrugman()}\n`));
while (game.isGameOn()) {
    let guess = prompt(colors.bold.white('Guess a letter '));

    while (!game.validateGuess(guess)) {
        guess = prompt(colors.bold.white('Guess a letter '));
    }

    game.update(guess);
    console.clear();
    console.log(`\n${game.showWord()}\n`);
    console.log(colors.rainbow(`\n${game.showShrugman()}\n`));

    if (!game.isGameOn()) {
        const isWinning = game.isWinning();
        game.updateStats(isWinning);

        if (isWinning) {
            console.log(colors.white(colors.bgGreen ('🏆 We have a winner 🏆')));
        } else {
            console.log(colors.green('🍀 Maybe next time: ', colors.bold.white(game.currentWord)));
        }

        let anotherRound = prompt('Another round (y/n)? ');

        if (anotherRound === 'y') {
            game.reset()
            console.clear();
            console.log(`\n${game.showWord()}\n`);
            console.log(colors.rainbow(`\n${game.showShrugman()}\n`));
        } else {
            console.clear();
            // console.log(colors.bold.white(`\n${game.getFormattedStats()}\n`));
            console.log(colors.bold.white('👋 Bye and see you next round.'));
        }
    }
}

console.log(colors.red(colors.bgYellow (`Congrats! This is the end`)));