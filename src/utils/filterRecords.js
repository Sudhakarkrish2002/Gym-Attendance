import { FILTER_TYPES } from '../constants.js';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const typeToRange = {
  [FILTER_TYPES[0]]: Infinity, // all
  [FILTER_TYPES[1]]: 1, // daily
  [FILTER_TYPES[2]]: 7, // weekly
  [FILTER_TYPES[3]]: 30, // monthly
  [FILTER_TYPES[4]]: 365 // annual
};

export const filterRecords = (records, filterType) => {
  const now = Date.now();
  const maxDays = typeToRange[filterType] ?? Infinity;

  if (maxDays === Infinity) {
    return [...records].sort((a, b) => b.timestamp - a.timestamp);
  }

  return [...records]
    .filter((record) => {
      const diffDays = (now - record.timestamp) / DAY_IN_MS;
      return diffDays < maxDays;
    })
    .sort((a, b) => b.timestamp - a.timestamp);
};
