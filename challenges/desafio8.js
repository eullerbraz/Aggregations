db.air_alliances.aggregate(
  [
    {
      $unwind: "$airlines",
    },
    {
      $lookup: {
        from: "air_routes",
        let: {
          airlineName: "$airlines",
        },
        pipeline: [
          {
            $match: {
              airplane: {
                $in: ["747", "380"],
              },
              $expr: {
                $eq: ["$airline.name", "$$airlineName"],
              },
            },
          },
        ],
        as: "airRoute",
      },
    },
    {
      $addFields: {
        totalRotas: {
          $size: "$airRoute",
        },
      },
    },
    {
      $match: {
        totalRotas: {
          $gt: 0,
        },
      },
    },
    {
      $group: {
        _id: "$name",
        totalRotas: {
          $sum: "$totalRotas",
        },
      },
    },
    {
      $sort: {
        totalRotas: -1,
      },
    },
    {
      $limit: 1,
    },
  ],
);
