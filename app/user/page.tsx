import { Metadata } from "next";

import logger from "@/lib/logger";
import { JSX } from "react";

export const metadata: Metadata = {
    title: 'User'
};

export default async function UserPage(): Promise<JSX.Element> {

    logger.info(`User Page: Page invoked`);

    return (
        <section className="max-w-[50ch] md:max-w-[75ch] mx-auto p-4 text-wrap transition-[max-width]">
            <h1 className="mb-8 text-3xl">User</h1>

            <div className="flex flex-col items-center mb-8">
                <img alt="Your user picture" className="border-2 border-gray-400 p-1 mb-2 rounded-full" height={100} width={100} />
                <h2 className="text-xl">Name</h2>
                <p className="text-gray-600">
                    Role
                </p>
            </div>

            <form>
                <button className="hover:bg-red-50 border-2 border-red-600 hover:text-red-800 cursor-pointer font-semibold p-2 rounded text-center text-red-700 transition-colors w-full" type="submit">Sign out</button>
            </form>
        </section>
    );
}