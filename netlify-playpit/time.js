exports.handler = async (event, context) => {
  const now = new Date();
  const timeString = now.toLocaleString(); // Get local time
  return {
    statusCode: 200,
    body: JSON.stringify({
      time: timeString,
    }),
  };
};