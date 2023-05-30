export const convertFavorite = (favorite: number) => {
  if (favorite > 1000) {
    return Math.floor(favorite / 1000) + "K";
  }

  return favorite;
};
