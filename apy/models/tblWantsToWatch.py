from sqlmodel import Field, SQLModel


class tblWantsToWatch(SQLModel, table=True):
    __tablename__ = "WantsToWatch"

    preference: float
    userID: str = Field(primary_key=True)
    movieID: str = Field(primary_key=True)
