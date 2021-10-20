db.trips.aggregate(
  [
    {
      $addFields: {
        diaDaSemana: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: "$diaDaSemana",
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: false,
        diaDaSemana: "$_id",
        total: "$total",
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
