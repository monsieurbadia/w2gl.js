export const isEmpty = object => 
  object === undefined || Object.keys( object ).length === 0
    ? true
    : false;