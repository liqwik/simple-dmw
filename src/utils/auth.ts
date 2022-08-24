const crypto = require('crypto');

export const createPassword = (length = 16, chars?) => {
  if (!chars) {
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }

  const charsLength = chars.length;

  if (charsLength > 256) {
    throw new Error('chars length greater than 256 characters');
  }
  const randomBytes = crypto.randomBytes(length);
  const result = new Array(length);
  let cursor = 0;

  for (let i = 0; i < length; i++) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % charsLength];
  }

  return result.join('');
};
