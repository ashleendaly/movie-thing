import { AddClubButton } from "./(home)/add-club-button";
import { UserClubs } from "./(home)/user-clubs";

export default async function Home() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 px-10">
      <div className="pt-10">
        <AddClubButton />
      </div>
      <UserClubs />
    </div>
  );
}
