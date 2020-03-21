// import http from "./httpService";

// const apiEndpoint = "/fire";

function getFiresByUserId(userId) {
  return [
    {
      evidences: [],
      status: "pending",
      _id: "5e6e60e05c3aec29801a4c0d",
      longtitude: 105.527138,
      latitude: 21.013412,
      createdAt: "2020-03-15T17:07:44.952Z"
    },
    {
      evidences: [],
      status: "pending",
      _id: "5e6e60e05c3aec29801a4c0f",
      longtitude: 105.527138,
      latitude: 21.013412,
      createdAt: "2020-03-17T17:09:03.130+00:00"
    },
    {
      evidences: [],
      status: "pending",
      _id: "5e6e60e05c3aec29801a4c0g",
      longtitude: 105.527138,
      latitude: 21.013412,
      createdAt: "2020-03-21T04:49:56.048+00:00"
    }
  ];
}

export { getFiresByUserId };
