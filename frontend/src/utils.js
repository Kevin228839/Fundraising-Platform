const TimeDiff = (from, to) => {
  const fromTime = parseInt(new Date(from).getTime() / 1000);
  const toTime = parseInt(new Date(to).getTime() / 1000);
  const timeDiff = Math.ceil((toTime - fromTime) / 3600 / 24);
  return timeDiff;
};

export {
  TimeDiff
};
