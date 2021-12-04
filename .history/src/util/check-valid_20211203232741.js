export const isDuplicatedName = (nameLists, newName) => {
  return nameLists.includes(newName);
};

export const isInvalidStationNameLength = (newName) => {
  return newName.length >= 2;
};

export const isInvalidLineName = (lineName) => {
  return !lineName.match(/["호선"]/);
};
