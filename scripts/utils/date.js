import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function formatDateString(dateTime, formatString){
  return dayjs(dateTime).format(formatString);
}

export default formatDateString;