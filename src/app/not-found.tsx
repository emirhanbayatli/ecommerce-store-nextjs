import Link from "next/link";
import FuzzyText from "./components/FuzzyText";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FuzzyText
        baseIntensity={0.1}
        enableHover={false}
        fontSize={48}
        fontWeight="bold"
        color="black"
      >
        404 - Page Not Found
      </FuzzyText>
      <Link
        href={"/"}
        className="p-3 mt-8 bg-gray-400 hover:bg-gray-600 text-white rounded"
      >
        Go Home Page{" "}
      </Link>
    </main>
  );
}
