export const getFormatFromMIME = (mime: string) => {
  const [format] = mime.split('/').reverse();
  return format;
}; // => 'png'

export const getTypeFromMIME = (mime: string) => {
  const [type] = mime.split('/');
  return type;
}; // => 'image'
