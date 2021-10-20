db.trips.aggregate(
  [
    {
      $match: {
        birthYear: {
          $exists: true,
          $ne: "",
        },
      },
    },
    {
      $project: {
        anoNascimento: {
          $toInt: "$birthYear",
        },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: {
          $max: "$anoNascimento",
        },
        menorAnoNascimento: {
          $min: "$anoNascimento",
        },
      },
    },
    {
      $project: {
        _id: false,
      },
    },
  ],
);
