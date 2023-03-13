export interface Messages {
  [key: string]: string;
}

export const defaultFilePath = (config: Recordable) => {
  const messages: Messages = {};
  Object.keys(config).forEach((key) => {
    const name: RegExpMatchArray | null = key.match(/^\.\/([\s\S]+)\/([\s\S]+)\.ts$/);
    if (name) {
      const valueName = name[2];
      const value = config[key].default || {};
      messages[valueName] = value;
    }
  });

  return messages;
};
