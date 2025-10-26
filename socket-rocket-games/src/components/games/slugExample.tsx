import { useRouter } from "next/router";

export default function ticTacToe() {
  let path = useRouter();
  return (
    <>
      <div className="h-screen bg-green-100">
        <div className="max-w-screen-xl m-auto">
          <div className="p-8">
            <div className="flex flex-col gap-y-10 ">
              <div className="flex justify-center">
                <h2 className="area-title">{path.pathname.split("/").pop()}</h2>
              </div>
              <div className="flex justify-center">Game</div>
              <div className="flex justify-center">
                <div className="flex gap-2">
                  <div>players</div>
                  <div>room</div>
                  <div>start</div>
                  <div>More</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
