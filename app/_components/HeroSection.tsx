import { JSX } from "react";

export default function HeroSection(): JSX.Element {
    return (
        <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="mb-2 text-5xl">Text Review</h1>
            <div className="leading-relaxed text-gray-500 text-xl">
                <p>Language shapes our interactions.</p>
                <p>Texts carry meaning.</p>
            </div>
        </section>
    );
}
