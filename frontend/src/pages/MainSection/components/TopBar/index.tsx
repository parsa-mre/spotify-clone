import React from "react";
import {
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineUserGroup,
    HiOutlineUser,
    HiOutlineBell,
} from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useCurrentUserStore from "../../../../store/user.store";
import SmallCard from "../SmallCard";

const TopBar = () => {
    const navigate = useNavigate();
    const currentUser = useCurrentUserStore();

    return (
        <div className="w-full h-[50px] px-5 py-4 rounded-t-md bg-gray-600 flex items-center justify-between">
            <div className=" inline-flex gap-2">
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition"
                >
                    <HiOutlineChevronLeft size={22} />
                </button>
                <button
                    onClick={() => {
                        navigate(+1);
                    }}
                    className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition"
                >
                    <HiOutlineChevronRight size={22} />
                </button>
            </div>
            <div className="inline-flex gap-2">
                <button className="bg-white hidden sm:block px-4 h-8 rounded-full font-bold text-sm">
                    Explore Premium
                </button>
                {currentUser.username ? (
                    <>
                        <button className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition">
                            <HiOutlineBell size={22} />
                        </button>
                        <button className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition">
                            <HiOutlineUserGroup size={22} />
                        </button>
                        <button className="p-1 h-7 w-7 justify-center items-center flex rounded-full text-neutral-300 bg-eerie shadow-md hover:text-whitehover:bg-neutral-700 pointer-events-auto transition">
                            <HiOutlineUser size={22} />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                navigate("/auth/login");
                            }}
                            className="bg-malachite px-4 h-8 rounded-full font-bold text-sm"
                        >
                            Log In
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TopBar;
