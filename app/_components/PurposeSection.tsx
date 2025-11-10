import Link from "next/link";
import { JSX } from "react";

export default function PurposeSection(): JSX.Element {
    return (
        <section className="bg-gray-50 flex flex-col items-center justify-center px-4 py-16 text-gray-800">
            <div className="leading-relaxed md:max-w-[75ch] mb-4 text-center text-lg">
                <p>
                    I give you direct access to important information from all over the world - in your language.
                </p>
                <p>
                    Analyze complex texts in a focused way and at your own pace so you can form an opinion that is truly your own.
                </p>
            </div>
            <Link className="text-gray-500 underline hover:text-gray-800" href="/why">Read more about the why</Link>
        </section>
    );
}
