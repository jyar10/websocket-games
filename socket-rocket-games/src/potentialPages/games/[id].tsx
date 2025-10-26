import { useRouter } from "next/router";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../pages/_app";
import GamesLayout from "@/components/layouts/gamesLayout";
import SlugExample from "@/components/games/slugExample";

const games: NextPageWithLayout = () => {
  const router = useRouter();
  switch (router.query.id) {
    case "Tic-Tac-Toe":
      return <SlugExample />;
    default:
      return <div>empty</div>;
  }
};

games.getLayout = function getLayout(page: ReactElement) {
  return <GamesLayout>{page}</GamesLayout>;
};

export default games;
