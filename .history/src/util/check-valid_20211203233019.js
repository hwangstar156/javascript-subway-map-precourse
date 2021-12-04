export const isDuplicatedStationName = (nameLists, newName) => {
  return nameLists.includes(newName);
};

export const isDuplicatedLineName = 

export const isInvalidStationNameLength = (newName) => {
  return newName.length >= 2;
};

export const isInvalidLineName = (lineName) => {
  return !lineName.match(/["호선"]/);
};
