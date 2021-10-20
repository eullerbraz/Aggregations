db.trips.aggregate(
  [
    {
      $addFields: {
        diaMaisViajadado: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: "$diaMaisViajadado",
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: false,
        diaMaisViajadado: "$_id",
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
    {
      $lookup: {
        from: "trips",
        let: {
          diaMaisViajadado: "$diaMaisViajadado",
        },
        pipeline: [
          {
            $addFields: {
              diaDaSemana: {
                $dayOfWeek: "$startTime",
              },
            },
          },
          {
            $match: {
              $expr: {
                $eq: ["$diaDaSemana", "$$diaMaisViajadado"],
              },
            },
          },
          {
            $group: {
              _id: "$startStationName",
              totalDeViagens: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              totalDeViagens: -1,
            },
          },
          {
            $limit: 1,
          },
        ],
        as: "trips",
      },
    },
    {
      $unwind: "$trips",
    },
    {
      $project: {
        nomeEstacao: "$trips._id",
        total: "$trips.totalDeViagens",
      },
    },
  ],
);
