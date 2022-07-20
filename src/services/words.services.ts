import { data } from "../../app";
import { Word } from "../types/types";
import { v4 as uuidv4 } from "uuid";

function extractAllWords() {
    // we can get all words like this because word can only belong to single group and with no duplicates
    return ([] as Word[]).concat(...Object.values(data));
}

function getWords(search?: string): Word[] {
    const allWords = extractAllWords();

    if (!Boolean(search)) {
        return allWords;
    }

    const searchPrepared = search?.trim().toLowerCase() ?? "";

    return allWords.filter(word => word.text.includes(searchPrepared));
}

function getSynonyms(wordText: string): Word[] {
    const allWords = extractAllWords();

    const word = allWords.find(w => w.text === wordText);

    if (!word) {
        throw new Error("Word not found.");
    }

    return data[word.groupId].filter(w => w.text !== wordText);
}

function addWord(text: string, groupId?: string): Word {

    const allWords = extractAllWords();

    // check if exists
    const exists = allWords.find(word => word.text === text) !== undefined;

    if (exists) {
        throw new Error("Word already exists.");
    }

    if (groupId && !data[groupId]) {
        throw new Error("Synonyms group does not exist.");
    }


    if (groupId) {      // Adding synonym

        const newSynonym = { text, groupId };
        data[groupId].push(newSynonym);
        return newSynonym;

    } else {            // Adding new word

        const newGroupId = uuidv4();
        const newWord = { text, groupId: newGroupId };
        data[newGroupId] = [newWord];
        return newWord;
    }
}

function updateWord(word: string, newText: string) {
    const allWords = extractAllWords();

    const wordToUpdate = allWords.find(w => w.text === word);

    if (!wordToUpdate) {
        throw new Error("Word not found.");
    }

    // direct mutation (myb different way?)
    wordToUpdate.text = newText;

    return wordToUpdate;
}

function deleteWord(wordText: string) {

    let synonymGroupId = null;
    let requestedWorkIdx = null;

    for (const [groupId, words] of Object.entries(data)) {
        const wordIdx = words.findIndex(w => w.text === wordText);

        if (wordIdx !== -1) {
            synonymGroupId = groupId;
            requestedWorkIdx = wordIdx;
            break;
        }
    }

    if (!synonymGroupId || requestedWorkIdx === null) {
        throw new Error("Word not found.");
    }

    data[synonymGroupId].splice(requestedWorkIdx, 1);

    // remove groupId key if there are no words left for that group
    if (data[synonymGroupId].length === 0) {
        delete data[synonymGroupId];
    }

    return;
}

module.exports = {
    getWords,
    getSynonyms,
    addWord,
    updateWord,
    deleteWord
};