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
      },
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
};
