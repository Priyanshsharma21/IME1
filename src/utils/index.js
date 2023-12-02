export const booksAggregatedData = (data) => {
  const aggregatedData = {};

  data.forEach((item) => {
    const date = item.date;
    if (!aggregatedData[date]) {
      aggregatedData[date] = {
        id: item.id,
        title: [item.title],
        author: [item.author],
        date: item.date,
        week_number: item.week_number,
        duration: item.duration,
      };
    } else {
      if (!aggregatedData[date].title.includes(item.title)) {
        aggregatedData[date].title.push(item.title);
      }
      if (!aggregatedData[date].author.includes(item.author)) {
        aggregatedData[date].author.push(item.author);
      }
      aggregatedData[date].duration += item.duration;
    }
  });

  return Object.values(aggregatedData);
};
