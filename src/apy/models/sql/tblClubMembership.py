from sqlmodel import Field, SQLModel


class tblClubMembership(SQLModel, table=True):
    clubName: str = Field(primary_key=True)
    userID: str
    isPresent: bool
