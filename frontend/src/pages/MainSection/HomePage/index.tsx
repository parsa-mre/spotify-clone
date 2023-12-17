import React from "react";
import TopBar from "../components/TopBar";
import SmallCard from "../components/SmallCard";
import BigCard from "../components/BigCard";
import SmallCardContainer from "../components/SmallCardContainer";
import BigCardContainer from "../components/BigCardContainer";

function HomePage() {
    return (
        <div className="h-[100vh] w-full bg-night flex-col rounded-lg overflow-x-auto">
            <TopBar />
            <SmallCardContainer />
            <BigCardContainer />
            <SmallCardContainer />
            <SmallCardContainer />
            <SmallCardContainer />
            <SmallCardContainer />
            <SmallCardContainer />
        </div>
    );
}

export default HomePage;
