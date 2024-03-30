import pandas as pd


def aggregate_borda(data: pd.DataFrame):
    k = len(data["item"].unique())

    def add_points(l):
        l["borda-points"] = k - l["preference"].rank(ascending=True)
        return l

    return (
        pd.concat([add_points(rankings) for _, rankings in data.groupby("user")])[
            ["item", "borda-points"]
        ]
        .groupby("item")
        .sum()
        .sort_values(by="borda-points")
    )
