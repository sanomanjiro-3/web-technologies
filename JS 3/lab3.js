const countVowels = (str) => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    return [...str].filter(char => vowels.includes(char)).length;
};