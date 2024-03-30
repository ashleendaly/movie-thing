import datetime
from typing import List
from sqlmodel import Session, create_engine, select, delete, insert, update
import pandas as pd

from apy.models.tblWantsToWatch import tblWantsToWatch
from apy.models.tblClubMembership import tblClubMembership
from apy.models.tblClubRanking import tblClubRanking
from apy.models.tblClub import tblClub


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

    def get_user_preferences(self, clubName: str) -> pd.DataFrame:
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
                        "user": movie.userID,
                        "item": movie.movieID,
                        "preference": movie.preference,
                    }
                    for [_, movie] in res
                ]
            )

            return data

    def write_results(self, clubName: str, data: pd.DataFrame):
        with Session(self.engine) as session:
            delete_old = delete(tblClubRanking).where(
                tblClubRanking.clubName == clubName
            )
            session.exec(delete_old)

            results = [
                {"movieID": item, "rank": rank, clubName: clubName}
                for (item, rank) in zip(data.index, data["borda-points"])
            ]

            insert_new = insert(tblClubRanking).values(results)

            session.exec(insert_new)

            update_date = (
                update(tblClub)
                .where(tblClub.clubName == clubName)
                .values({"resultsComputedOn": datetime.datetime.now()})
            )

            session.exec(update_date)

            return True
