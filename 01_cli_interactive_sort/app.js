const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');

const rl = readline.createInterface({input, output});

const sortForClient = () => {
    rl.question(
        'Hello. Enter 10 words or numbers separated by spaces. If you want to exit the program, click the Exit and Enter button.',
        (value) => {
            const valueLength = value.trim().split(' ').length;
            if (value === "") {
                console.log('by-by');
                process.exit();
            } else if (valueLength < 10) {
                console.log(
                    `You entered ${valueLength} words or numbers, but need 10 words or numbers separated by spaces. Try again.`);
                sortForClient();
            } else {
                selectionOptionForSorting(value.split(' '))
            }
        });
};

const selectionOptionForSorting = (arr) => {
    rl.question(
        'How would you like to sort values: ' +
        '\n     1. Sort the words alphabetically (from A-Z)' +
        '\n     2. Show numbers from smaller to larger' +
        '\n     3. Show numbers from larger to smaller' +
        '\n     4. Display words in ascending order by number of letters in the word' +
        '\n     5. Show only unique words' +
        '\n     6. Display only unique values from the set of words and numbers entered by the user\n',
        (value) => {
            let correctArr = []
            for (const item of arr) {
                if (isNaN(item)) {
                    correctArr.push(item)
                } else {
                    correctArr.push(+item)
                }
            }

            let arrNumbers = [];
            let arrString = [];
            for (const arrElement of correctArr) {
                if (typeof arrElement === 'number') {
                    arrNumbers.push(arrElement)
                } else {
                    arrString.push(arrElement)
                }
            }

            switch (value.trim()) {
                case '1':
                    const sortAlphabetically = arr.sort((a, b) => a - b);
                    console.log('1', sortAlphabetically)
                    break;
                case '2':
                    const numbersFromLesser = arrNumbers.sort((a, b) => a - b);
                    console.log('2', numbersFromLesser)
                    break;
                case '3':
                    const numbersFromBigger = arrNumbers.sort((a, b) => b - a);
                    console.log('3', numbersFromBigger)
                    break;
                case '4':
                    const newArr = arrString.sort((a, b) => a.length - b.length);
                    console.log('4', newArr)
                    break;
                case '5':
                    const uniqueWords = [...new Set(arrString)];
                    console.log('5', `You unique words is - ${uniqueWords}`)

                    break;
                case '6':
                    const uniqueNumbersLength = [...new Set(arrNumbers)].length;
                    const uniqueWordsLength = [...new Set(arrString)].length;
                    console.log('6',
                        `You enter unique ${uniqueNumbersLength} - numbers, unique ${uniqueWordsLength} - words`)
                    break;
                default :
                    console.log('Select an option from 1 to 6');
                    selectionOptionForSorting(arr);
            }
            sortForClient();
        });
}

sortForClient();

