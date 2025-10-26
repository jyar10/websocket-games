import Link from "next/link";
import { useRouter } from "next/router";

export const BackButton = () => {
  const path = useRouter();
  var n = path.asPath.lastIndexOf("/");
  var result = path.asPath.substring(0, n);
  return (
    <Link href={"/"} aria-current="page" replace={false} legacyBehavior>
      {"<Back"}
    </Link>
  );
};
