db.trips.aggregate(
  [
    {
      $addFields: {
        duracao: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            1000 * 60,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$bikeid",
        duracaoMedia: {
          $avg: "$duracao",
        },
      },
    },
    {
      $project: {
        _id: false,
        bikeId: "$_id",
        duracaoMedia: {
          $ceil: "$duracaoMedia",
        },
      },
    },
    {
      $sort: {
        duracaoMedia: -1,
      },
    },
    {
      $limit: 5,
    },
  ],
);
