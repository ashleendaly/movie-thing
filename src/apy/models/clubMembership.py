from pydantic import BaseModel

from src.apy.models.sql.tblClubMembership import tblClubMembership


class ClubMembership(BaseModel):
    clubName: str
    userID: str
    isPresent: bool

    @classmethod
    def from_sql(cls, sql_club_membership: tblClubMembership) -> "ClubMembership":
        return cls(
            clubName=sql_club_membership.clubName,
            userID=sql_club_membership.userID,
            isPresent=sql_club_membership.isPresent,
        )
