db.trips.aggregate(
  [
    {
      $match: {
        startTime: {
          $gte: ISODate("2016-03-10T00:00:00"),
          $lte: ISODate("2016-03-10T23:59:59"),
        },
      },
    },
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
        _id: null,
        duracaoMediaEmMinutos: {
          $avg: "$duracao",
        },
      },
    },
    {
      $project: {
        _id: false,
        duracaoMediaEmMinutos: {
          $ceil: "$duracaoMediaEmMinutos",
        },
      },
    },
  ],
);
