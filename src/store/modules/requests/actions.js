export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const res = await fetch(
      `https://find-a-coach-a9143.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to send");
      throw error;
    }

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(
      `https://find-a-coach-a9143.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch requests");
      throw error;
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };
      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
