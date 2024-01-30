from pyflagr.Linear import CombSUM


class Aggregator:
    aggregator: CombSUM

    def __init__(self):
        self.aggregator = CombSUM(norm="borda")

    def aggregate(self, data):
        self.aggregator.aggregate(input_df=data)
