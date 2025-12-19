exports.getNextRevisionDate = (memoryScore) => {
  const now = new Date();

  if (memoryScore >= 80) now.setDate(now.getDate() + 7);
  else if (memoryScore >= 60) now.setDate(now.getDate() + 3);
  else if (memoryScore >= 40) now.setDate(now.getDate() + 1);
  else now.setDate(now.getDate());

  return now;
};
