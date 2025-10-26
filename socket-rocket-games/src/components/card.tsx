import Link from "next/link";

type CardProps = {
  title: string;
  content: string;
  path?: string;
};
export const Card = (children: CardProps) => {
  return (
    <div className="darkCard block max-w-sm p-6 rounded-lg shadow ">
      <h5 className="hover:underline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Link
          href={children.path || "/"}
          aria-current="page"
          replace={false}
          legacyBehavior
        >
          {children.title}
        </Link>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {children.content}
      </p>
    </div>
  );
};
