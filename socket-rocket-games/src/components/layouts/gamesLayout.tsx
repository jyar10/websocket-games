import { ReactElement } from "react";
import { BackButton } from "@/components/backButton";

export default function GamesLayout({ children }: any) {
  return (
    <>
      <div className="h-full bg-green-100">
        <div className="max-w-screen-xl m-auto">
          <div className="p-8">
            <BackButton />
            <div className="flex flex-col gap-y-2 ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
