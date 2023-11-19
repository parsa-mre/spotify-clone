import SideBarButton from "./components/SideBarButton";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import LibraryBar from "./components/LibraryBar";

function SideBar() {
    return (
        <div className="flex flex-col gap-2 bg-blue h-full w-[16rem]">
            <div className="bg-night w-full flex-grow-0 rounded-lg p-2">
                <SideBarButton
                    label={"Home"}
                    icon={GoHome}
                    iconFill={GoHomeFill}
                    isActive={true}
                    href="/home"
                />
                <SideBarButton
                    label={"Search"}
                    icon={RiSearchLine}
                    iconFill={RiSearchFill}
                    isActive={false}
                    href="/search"
                />
            </div>
            <div className="bg-night p-2 w-full flex-grow overflow-x-auto rounded-lg">
                <LibraryBar />
            </div>
        </div>
    );
}

export default SideBar;
