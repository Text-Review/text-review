import { JSX } from "react";
import FeatureCard, { FeatureCardData } from "./FeatureCard";

const FEATURES: Array<FeatureCardData & { id: string }> = [
    {
        id: "text-hub",
        image: { alt: "Hub for Texts", src: "/centralization-icon.svg" },
        title: "Central Place",
        description: "I collect various texts in this place."
    },
    {
        id: "official-texts",
        image: { alt: "Official Documents Icon", src: "/official-icon.svg" },
        title: "Official Texts",
        description: "The texts are from official sources."
    }
];

export default function FeatureSection(): JSX.Element {

    return (
        <section className="px-4 py-16">
            <h2 className="mb-8 text-center text-3xl">Features</h2>
            <ul className="flex flex-col md:flex-row items-center md:items-start gap-8 gap-x-16 justify-center">

                {FEATURES.map((feature) => (
                    <li key={feature.id}>
                        <FeatureCard image={feature.image} title={feature.title} description={feature.description} />
                    </li>
                ))}

            </ul>
        </section>
    );
}
