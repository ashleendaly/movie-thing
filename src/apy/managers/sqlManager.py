from typing import List
from sqlmodel import Session, create_engine, select
import pandas as pd

from src.apy.models.tblWantsToWatch import tblWantsToWatch
from src.apy.models.tblClubMembership import tblClubMembership


class SqlManager:
    def __init__(self, connection_url):
        self.engine = create_engine(connection_url)

    def get_club_members(self, clubName: str) -> List[str]:
        with Session(self.engine) as session:
            query = select(tblClubMembership).where(
                tblClubMembership.clubName == clubName,
                tblClubMembership.isPresent == True,
            )

            club_memberships = session.exec(query)

            return [membership.userID for membership in club_memberships]

    def get_club_ranks(self, clubName: str) -> pd.DataFrame:
        with Session(self.engine) as session:
            query = select(tblClubMembership, tblWantsToWatch).where(
                tblClubMembership.clubName == clubName,
                tblClubMembership.isPresent == True,
                tblClubMembership.userID == tblWantsToWatch.userID,
            )
            res = session.exec(query)
            data = pd.DataFrame.from_records(
                [
                    {
                        "Query/Topic": 1,
                        "Voter": membership.userID,
                        "Item": movie.movieID,
                        "Score": movie.preference,
                        "Dataset": 1,
                    }
                    for [membership, movie] in res
                ]
            )

            return data
