import { AddClubButton } from "./(home)/add-club/button";
import { UserClubs } from "./(home)/user-clubs";

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-start gap-4 px-10">
      <AddClubButton className="w-full pt-10" />
      <UserClubs />
    </div>
  );
}
