from typing import List
from sqlmodel import Session, create_engine, select

from src.apy.models.clubMembership import ClubMembership
from src.apy.models.sql.tblClubMembership import tblClubMembership

class SqlRepository:

    def __init__(self, connection_url):
        self.engine = create_engine(connection_url)

    def get_club_members(self, clubName: str) -> List[str]:
        with Session(self.engine) as session:
            print("connected")
            query = select(tblClubMembership).where(tblClubMembership.clubName == clubName)
            print("made query")
            club_memberships = session.exec(query)
            print("executed query")
            return [
                ClubMembership.from_sql(sql_club_memberships=membership).userID for membership in club_memberships
            ]
        
    
