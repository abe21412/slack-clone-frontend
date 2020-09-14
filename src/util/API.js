export const createChannel = async (channel, userID) => {
  try {
    const body = JSON.stringify({ channel, userID });
    const res = await fetch("http://localhost:8080/api/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (res.status !== 201) {
      const textResponse = await res.text();
      throw new Error(textResponse);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
