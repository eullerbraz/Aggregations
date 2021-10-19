db.movies.aggregate(
  [
    {
      $match: {
        countries: {
          $all: ["USA"],
        },
        "tomatoes.viewer.rating": {
          $gte: 3,
        },
      },
    },
    {
      $addFields: {
        intersection: {
          $setIntersection: [
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
            "$cast",
          ],
        },
      },
    },
    {
      $match: {
        intersection: {
          $ne: null,
        },
      },
    },
    {
      $addFields: {
        num_favs: {
          $size: "$intersection",
        },
      },
    },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    {
      $project: {
        _id: false,
        title: true,
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
  ],
);
