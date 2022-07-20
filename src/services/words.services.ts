import { data } from "../../app";
import { Word } from "../types/types";
import { v4 as uuidv4 } from "uuid";

function getWords(search?: string): Word[] {
    const allWords = ([] as Word[]).concat(...Object.values(data));

    if (!Boolean(search)) {
        return allWords;
    }

    const searchPrepared = search?.trim().toLowerCase() ?? "";

    return allWords.filter(word => word.text.includes(searchPrepared));
}

function addWord(text: string, groupId?: string): Word {

    // check if exists
    // we can get all words like this because word can only belong to single group and with no duplicates
    const allWords = ([] as Word[]).concat(...Object.values(data));

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

module.exports = {
    getWords,
    addWord
};