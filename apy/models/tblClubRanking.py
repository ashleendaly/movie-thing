from sqlmodel import Field, SQLModel


class tblClubRanking(SQLModel, table=True):
    __tablename__ = "ClubRanking"

    movieID: str = Field(primary_key=True)
    clubName: str = Field(primary_key=True)
    rank: int
