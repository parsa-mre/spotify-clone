import { IoAlbumsOutline, IoAlbums } from "react-icons/io5";
import { HiOutlinePlus, HiArrowRight } from "react-icons/hi";
import SideBarButton from "../SideBarButton";
import { useState } from "react";
import LibraryFilter from "../LibraryFilter";

function LibraryBar() {
    const [selectedFilter, setSelectedFilter] = useState("");

    // const tempItems = [
    //     {name: "Liked Songs", caption: "134 songs", type: "playlist", },
    //     {name: "Midnights", caption: "Taylor Swift", type: "album", artwork: "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5", pinned: true}
    // ]

    // const savedAlbums = [];

    return (
        <div className="flex flex-col">
            <div className="flex justify-between w-full">
                <SideBarButton
                    label={"Your Library"}
                    icon={IoAlbumsOutline}
                    iconFill={IoAlbums}
                    isActive={false}
                    href="/search"
                />
                <div className="flex">
                    <button className="m-1 p-1 h-7 w-7 hover:white hover:bg-neutral-900 hover:rounded-full text-silver">
                        <HiOutlinePlus size={20} />
                    </button>
                    <button className="m-1 p-1 h-7 w-7 hover:white hover:bg-neutral-900 hover:rounded-full text-silver">
                        <HiArrowRight size={20} />
                    </button>
                </div>
            </div>
            <LibraryFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
        </div>
    );
}

export default LibraryBar;
