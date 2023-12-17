import React from "react";
import BigCard from "../BigCard";

const BigCardContainer = () => {
    const data = [
        {
            label: "All Out 2010s",
            image: "https://i.scdn.co/image/ab67706f000000027bcd851d16216fae85f63a28",
            description: "The biggest songs of the 2010s.",
            contentType: "playlist",
            contentID: 21234,
        },
        {
            label: "Todays Top Hits",
            image: "https://i.scdn.co/image/ab67706f00000002bd24f51b79902a11ad51a7d8",
            description: "Tate McRae is on top of the Hottest 50!",
            contentType: "playlist",
            contentID: 21233,
        },
        {
            label: "Rock Classics",
            image: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e",
            description:
                "Rock legends & epic songs that continue to inspire generations. Cover: Foo Fighters",
            contentType: "playlist",
            contentID: 219,
        },
        {
            label: "Chill Hits",
            image: "https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe",
            description: "Kick back to the best new and recent chill hits.",
            contentType: "playlist",
            contentID: 2125,
        },
        {
            label: "All Out 80s",
            image: "https://i.scdn.co/image/ab67706f000000027876fe166a29b8e6b8db14da",
            description:
                "The biggest songs of the 1980s. Cover: Michael Jackson.",
            contentType: "playlist",
            contentID: 21445,
        },
        {
            label: "Viva Latino",
            image: "https://i.scdn.co/image/ab67706f0000000205d69dc4ac893f2aba002077",
            description:
                "Today's top Latin hits, elevando nuestra música. Cover: Arcángel",
            contentType: "playlist",
            contentID: 21145,
        },
    ];
    return (
        <div className="p-4 w-full">
            <div className="flex content-between justify-between items-center mb-4">
                <p className="text-white text-2xl font-bold">
                    Today's Big Hits
                </p>
                <button className="hover:underline text-silver">
                    Show all
                </button>
            </div>

            <div className="flex flex-nowrap gap-3">
                {data.map((cardInfo, idx) => (
                    <BigCard
                        image={cardInfo.image}
                        label={cardInfo.label}
                        description={cardInfo.description}
                        contentID={cardInfo.contentID}
                        contentType={cardInfo.contentType}
                        key={cardInfo.contentType + cardInfo.contentID}
                    />
                ))}
            </div>
        </div>
    );
};

export default BigCardContainer;
