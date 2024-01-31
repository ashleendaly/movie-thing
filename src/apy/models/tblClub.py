import datetime
from sqlmodel import Field, SQLModel


class tblClub(SQLModel, table=True):
    __tablename__ = "Club"

    clubName: str = Field(primary_key=True)
    resultsComputedOn: datetime.datetime = Field(nullable=True)
    sessionActive: bool
    joinCode: str = Field(unique=True)
    joinable: bool
