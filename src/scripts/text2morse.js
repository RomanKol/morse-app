import morse from './morse.json';

function text2morse(input, charSpacer = ' ', wordSpacer = '/', unkown = '#') {
  let text = input.toLowerCase()
    // Replace mutliple newlines with new page prosign
    .replace(/[\n\r]{3,}/g, '<bt>')
    // Replace two newlines weith new paragraph prosign
    .replace(/[\n\r]{2}/g, '<ar>')
    // Replace single newline with new line prosign
    .replace(/[\n\r]/g, '<aa>');

  const tokens = [];

  // Iterate over input text
  while (text.length > 0) {
    let tokenLengh = 1;

    // Check if string starts with prosign
    const prosign = text.match(/^<...?>/);
    if (prosign) tokenLengh = prosign[0].length;

    // Ad token to our tokens array
    tokens.push(text.slice(0, tokenLengh));

    // Update text with text without token
    text = text.slice(tokenLengh, text.length);
  }

  let signal = '';
  let i = 0;

  // Iterate over tokens
  while (i < tokens.length) {
    const token = tokens[i];
    const code = morse.find(item => item.character === token);

    // If code for token exists
    if (code) {
      // If not followed by whitespace, add a whitespace
      signal += tokens[i + 1] !== ' ' ? `${code.code} ` : code.code;

      // Else if token is whitespace
    } else if (token === ' ') {
      signal += wordSpacer;

      // Else print unkown
    } else {
      signal += unkown;
    }

    i += 1;
  }

  return signal.trim().replace(/\s\/\s/g, '/');
}

export default text2morse;
