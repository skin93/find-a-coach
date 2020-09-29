export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    const res = await fetch(
      `https://find-a-coach-a9143.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    //  const data = await res.json();

    if (!res.ok) {
      // error
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const res = await fetch(
      `https://find-a-coach-a9143.firebaseio.com/coaches.json`
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Failed to fetch");
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };
      coaches.push(coach);
    }
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
