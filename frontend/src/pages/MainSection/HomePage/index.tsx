import React from "react";
import TopBar from "../components/TopBar";
import SmallCard from "../components/SmallCard";

function HomePage() {
    return (
        <div className="h-full w-full bg-night flex-1 flex-grow rounded-lg">
            <TopBar />
            <SmallCard
                label="mint rjfnr ergl e erlgkerejr gergj"
                image="https://i.scdn.co/image/ab67706f00000002c084102a056a6619474fbfc1"
            />
        </div>
    );
}

export default HomePage;
