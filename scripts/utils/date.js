import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function formatDateString(dateTime, formatString){
  return dayjs(dateTime).format(formatString);
}

export function dateTimeDiff(datetime1, datetime2){
  const date1 = dayjs(datetime1);
  const date2 = dayjs(datetime2);
  return date1.diff(date2);
}