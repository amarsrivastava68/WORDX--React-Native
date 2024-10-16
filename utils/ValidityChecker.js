import wordsData from './words.json'; // Adjust the path if needed


export const isCommonWord = (word) => {
    
    const lowerCaseWord = word.toLowerCase();

    const isWordPresent = ((wordsData.words.some(
        (item) => item.englishWord.toLowerCase() === lowerCaseWord))
    );

    return isWordPresent;
};



