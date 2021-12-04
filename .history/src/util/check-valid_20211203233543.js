export const isDuplicatedStationName = (nameLists, newName) => {
  return nameLists.includes(newName);
};

export const isDuplicatedLineName = (lineLists, newName) => {
  return lineLists.some((line) => line.lineName === newName);
};

export const isInvalidStationNameLength = (newName) => {
  return newName.length >= 2;
};

export const isInvalidLineName = (lineName) => {
  return !lineName.match(/^[1-9]"호선"$/);
};
