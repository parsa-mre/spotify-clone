import MainSection from "./pages/MainSection";
import SideBar from "./pages/SideBar";

function App() {
    return (
        <div className="flex p-2 gap-2 flex-col content-stretch items-stretch justify-items-stretch justify-stretch h-[100vh]">
            <div className="flex-1 flex gap-2">
                <SideBar />
                <MainSection />
            </div>
            <div className="h-16 flex-grow-0"></div>
        </div>
    );
}

export default App;
