import wordsData from './words.json'; // Adjust the path if needed

/**
 * Checks if the given word is a common English word from the words.json file.
 * @param {string} word - The word to check.
 * @returns {boolean} - Returns true if the word is common, otherwise false.
 */
export const isCommonWord = (word) => {
    
    // Convert the input word to lowercase to ensure case-insensitive matching
    const lowerCaseWord = word.toLowerCase();

    // Check if the word exists in the list of common English words
    const isWordPresent = ((wordsData.words.some(
        (item) => item.englishWord.toLowerCase() === lowerCaseWord))
    );

    return isWordPresent;
};



