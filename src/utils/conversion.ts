export const bytesToGbs = (bytes: number, decimals: number = 0) => {
  return (bytes / 1024 ** 3).toFixed(decimals);
};

export const bytesToKbs = (bytes: number, decimals: number = 0) => {
  return (bytes / 1024).toFixed(decimals);
};
