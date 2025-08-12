import { redirect } from "next/navigation";
import { stripe } from "@/utils/stripe";

interface SuccessProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function Success({ searchParams }: SuccessProps) {
  const { session_id } = searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center my-8 max-w-xl mx-auto"
      >
        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <p className="text-lg text-gray-700 ">
            We appreciate your business! A confirmation email will be sent to
            <span className="font-medium text-gray-900">{customerEmail}</span>.
          </p>

          <p className="text-gray-700">
            If you have any questions, please email
          </p>

          <a
            href="mailto:orders@example.com"
            className="text-blue-600 hover:underline font-medium"
          >
            orders@ecommerce.com
          </a>
        </div>
      </section>
    );
  }
}
