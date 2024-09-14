const {bookText} = require("./book-text");

// PROMPTS
// How many tokens are in bookText?
const tokenCount = bookText.length;
console.log(`There are ${tokenCount} number of tokens.`);

// What is the total number of characters in bookText?
const charCount = bookText.reduce((totalChar, word) => totalChar += word.length, 0);
console.log(`There are ${charCount} number of characters.`)

// What is the mean length of a token?
console.log(`The mean length of a token is ${charCount / tokenCount}`);

// What is the length of the longest token?
function getLongestToken(bookArr) {
    let longestToken = '';
    for (const token of bookArr) {
        if (token.length > longestToken.length) {
            longestToken = token;
        }
    }
    return longestToken
}
const longestToken = getLongestToken(bookText);
console.log(`The longest token is ${longestToken} at ${longestToken.length} characters.`)

// How many tokens are longer than 4 characters?
console.log(`There are ${bookText.filter((token) => token.length > 4).length} tokens longer than 4 characters`);

// How many tokens start with the letter "s" (case-insensitive)?
console.log(`There are ${bookText.filter((token) => token[0] === 's').length} tokens that start with "s".`);

// Do more tokens start with the letter "s" or "t"?
const sStartCount = bookText.filter((token) => token[0] === 's').length;
const tStartCount = bookText.filter((token) => token[0] === 't').length;
if (sStartCount === tStartCount) {
    console.log('There are the same number of tokens than tokens that start with "s" as starts with "t".');
}
else if (sStartCount > tStartCount) {
    console.log(`There are more tokens that start with "s" (${sStartCount}) than tokens that start with "t" (${tStartCount}).`)
}
else {
    console.log(`There are fewer tokens that start with "s" (${sStartCount}) than tokens that start with "t" (${tStartCount}).`)
}

// What are the 5 most frequent tokens that appear in the text, and how many times do they each appear?
console.log(`The 5 most freqent tokens that appear in the text are:`);
console.log(getFrequentTokens(bookText, 5));
function getTokenCountByToken(bookArr) {
    let tokenCounts = {};
    for (const token of bookArr) {
        if (!tokenCounts[token]) {
            tokenCounts[token] = 1;
        }
        else {
            tokenCounts[token]++;
        }
    }
    return tokenCounts;
}
function getFrequentTokens(bookArr, numTokens) {
    const tokenCounts = getTokenCountByToken(bookArr);
    let topTokens = {};

    // Keep track of minFreq and minToken in topTokens and update whenever topTokens is updated
    let minFreq = Infinity;
    let minToken = '';

    // Go through each token in book and update topTokens if it meets criteria
    for (const token in tokenCounts) {

        // Initialize topTokens with first ${numTokens} tokens
        if (Object.keys(topTokens).length < numTokens) {
            topTokens[token] = tokenCounts[token];
            if (topTokens[token] < minFreq) {
                minFreq = topTokens[token];
                minToken = token;
            }
        }

        // Else, go through criteria and update
        else {
            if (tokenCounts[token] > minFreq) {
                topTokens[token] = tokenCounts[token];
                delete topTokens[minToken];

                // Update minFreq and minToken
                minFreq = Infinity;
                for (const topToken in topTokens) {
                    if (topTokens[topToken] < minFreq) {
                        minFreq = topTokens[topToken];
                        minToken = topToken;
                    }
                }
            }
            else if (tokenCounts[token] === minFreq) {
                topTokens[token] = tokenCounts[token];
            }

            // Check if topTokens size exceeds numTokens
            if (Object.keys(topTokens).length > numTokens) {

                // if minFreq only occurs once, we can chop it off. Otherwise, we should keep duplicates.
                let duplicates = false;
                for (const topToken in topTokens) {
                    if (topTokens[topToken] === minFreq && topToken !== minToken) {
                        duplicates = true;
                    }
                }
                if (!duplicates) {
                    delete topTokens[minToken];

                    // Update minFreq and minToken
                    minFreq = Infinity;
                    for (const topToken in topTokens) {
                        if (topTokens[topToken] < minFreq) {
                            minFreq = topTokens[topToken];
                            minToken = topToken;
                        }
                    }
                }
            }
        }
    }

    return topTokens;
}

// What are the 5 most frequent characters that appear in the text, and how many times do they each appear?
console.log(`The 5 most freqent characters that appear in the text are:`);
console.log(getFrequentCharacters(bookText, 5));
function getCharacterCountByCharacter(bookArr) {
    let characterCounts = {};
    for (const token of bookArr) {
        for (let i=0; i<token.length; i++) {
            const char = token[i];
            if (!characterCounts[char]) {
                characterCounts[char] = 1;
            }
            else {
                characterCounts[char]++;
            }
        }
    }
    return characterCounts;
}
function getFrequentCharacters(bookArr, numCharacters) {
    const characterCounts = getCharacterCountByCharacter(bookArr);
    let topCharacters = {};

    // Keep track of minFreq and minCharacter in topCharacter and update whenever topCharacter is updated
    let minFreq = Infinity;
    let minCharacter = '';

    // Go through each character in book and update topCharacters if it meets criteria
    for (const char in characterCounts) {

        // Initialize topCharacters with first ${numCharacters} characters
        if (Object.keys(topCharacters).length < numCharacters) {
            topCharacters[char] = characterCounts[char];
            if (topCharacters[char] < minFreq) {
                minFreq = topCharacters[char];
                minCharacter = char;
            }
        }

        // Else, go through criteria and update
        else {
            if (characterCounts[char] > minFreq) {
                topCharacters[char] = characterCounts[char];
                delete topCharacters[minCharacter];

                // Update minFreq and minCharacter
                minFreq = Infinity;
                for (const topCharacter in topCharacters) {
                    if (topCharacters[topCharacter] < minFreq) {
                        minFreq = topCharacters[topCharacter];
                        minCharacter = topCharacter;
                    }
                }
            }
            else if (characterCounts[char] === minFreq) {
                topCharacters[char] = characterCounts[char];
            }

            // Check if topCharacters size exceeds numCharacters
            if (Object.keys(topCharacters).length > numCharacters) {

                // if minFreq only occurs once, we can chop it off. Otherwise, we should keep duplicates.
                let duplicates = false;
                for (const topCharacter in topCharacters) {
                    if (topCharacters[topCharacter] === minFreq && topCharacter !== minCharacter) {
                        duplicates = true;
                    }
                }
                if (!duplicates) {
                    delete topCharacters[minCharacter];

                    // Update minFreq and minCharacter
                    minFreq = Infinity;
                    for (const topCharacter in topCharacters) {
                        if (topCharacters[topCharacter] < minFreq) {
                            minFreq = topCharacters[topCharacter];
                            minCharacter = topCharacter;
                        }
                    }
                }
            }
        }
    }

    return topCharacters;
}

// How many tokens do not contain any vowels?
console.log(`The number of tokens without vowels are: ${getTokensWithoutVowelsCount(bookText)}`);
function getTokensWithoutVowelsCount(bookArr) {
    return bookArr.filter((token) => !hasVowel(token)).length;
}
function hasVowel(token) {
    for (let i=0; i<token.length; i++) {
        if (token[i] === 'a' || token[i] === 'e' || token[i] === 'i' || token[i] === 'o' || token[i] === 'u') {
            return true;
        }
    }
    return false;
}

// EXTENSIONS
// What is the most frequent vowel in the text?
// If a token were to be randomly picked, what is the probability that token contains a vowel?
// What is the mean and standard deviation of the number of vowels in each token?
// This will require getting external data. What percentage of the tokens are verbs?