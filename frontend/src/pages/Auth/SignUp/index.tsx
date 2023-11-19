import { useFormik } from "formik";
import * as yup from "yup";
import { AiFillExclamationCircle, AiOutlineDown } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import {
    emailRegex,
    currentYear,
    genderOptions,
    monthOptions,
} from "../constants";
import { register } from "../../../services/Auth";
import useAuthStore from "../../../store/auth.store";

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Invalid email")
        .matches(emailRegex, "Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    gender: yup.string().required("Gender is required"),
    month: yup.string().required("Month is required"),
    day: yup
        .number()
        .typeError("Must be a number")
        .required("Day is required")
        .integer("Day must be an integer")
        .min(1, "Day must be at least 1")
        .max(31, "Day cannot be greater than 31"),
    year: yup
        .number()
        .typeError("Must be a number")
        .required("Year is required")
        .integer("Year must be an integer")
        .min(1900, "Year must be at least 1900")
        .max(currentYear, `Year cannot be greater than ${currentYear}`),
    termsAgreed: yup.boolean().oneOf([true], "You must agree to the terms"),
});

const SignUp = () => {
    const authStore = useAuthStore();

    const trySignUp = async (values) => {
        const { termsAgreed, name, day, month, year, ...other } = values;
        const registerData = {
            ...other,
            birth_date: year + "-" + month + "-" + day,
            username: name,
            country: "US",
        };
        console.log(registerData);
        const response = await register(registerData);
        if (response.status == 200) {
            const authToken = response.data?.auth;
            authStore.setToken(authToken);
        } else {
            console.log("error accured");
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            day: "",
            year: "",
            gender: "",
            month: "",
            termsAgreed: false,
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: trySignUp,
    });

    return (
        <div className="flex gap-2 flex-col content-stretch items-center justify-items-center justify-stretch min-h-[100vh] pb-[10rem] bg-white">
            <div className="max-w-sm">
                <div className="flex items-center justify-center h-20">
                    <svg
                        role="img"
                        viewBox="0 0 78 24"
                        aria-label="Spotify"
                        aria-hidden="false"
                        data-encore-id="logoSpotify"
                        className="h-16 p-2 md:h-19 md:p-3"
                    >
                        <title>Spotify</title>
                        <path d="M18.616 10.639c-3.77-2.297-9.99-2.509-13.59-1.388a1.077 1.077 0 0 1-1.164-.363 1.14 1.14 0 0 1-.119-1.237c.136-.262.37-.46.648-.548 4.132-1.287 11-1.038 15.342 1.605a1.138 1.138 0 0 1 .099 1.863 1.081 1.081 0 0 1-.813.213c-.142-.02-.28-.07-.403-.145Zm-.124 3.402a.915.915 0 0 1-.563.42.894.894 0 0 1-.69-.112c-3.144-1.983-7.937-2.557-11.657-1.398a.898.898 0 0 1-.971-.303.952.952 0 0 1-.098-1.03.929.929 0 0 1 .54-.458c4.248-1.323 9.53-.682 13.14 1.595a.95.95 0 0 1 .3 1.286Zm-1.43 3.267a.73.73 0 0 1-.45.338.712.712 0 0 1-.553-.089c-2.748-1.722-6.204-2.111-10.276-1.156a.718.718 0 0 1-.758-.298.745.745 0 0 1-.115-.265.757.757 0 0 1 .092-.563.737.737 0 0 1 .457-.333c4.455-1.045 8.277-.595 11.361 1.338a.762.762 0 0 1 .241 1.028ZM11.696 0C5.237 0 0 5.373 0 12c0 6.628 5.236 12 11.697 12 6.46 0 11.698-5.372 11.698-12 0-6.627-5.238-12-11.699-12h.001Zm20.126 11.078c-2.019-.494-2.379-.84-2.379-1.57 0-.688.633-1.151 1.572-1.151.91 0 1.814.352 2.76 1.076a.131.131 0 0 0 .187-.03l.987-1.426a.139.139 0 0 0-.025-.185c-1.127-.928-2.396-1.378-3.88-1.378-2.18 0-3.703 1.342-3.703 3.263 0 2.06 1.315 2.788 3.585 3.352 1.932.457 2.258.84 2.258 1.524 0 .757-.659 1.229-1.72 1.229-1.18 0-2.141-.408-3.216-1.364a.13.13 0 0 0-.188.016l-1.106 1.35a.137.137 0 0 0 .013.188c1.252 1.147 2.79 1.752 4.451 1.752 2.35 0 3.869-1.317 3.869-3.356 0-1.723-1.003-2.676-3.465-3.29Zm10.487 2.31c0 1.454-.874 2.47-2.125 2.47-1.235 0-2.169-1.061-2.169-2.47 0-1.41.933-2.47 2.17-2.47 1.23 0 2.124 1.038 2.124 2.47Zm-1.706-4.354c-1.018 0-1.854.412-2.543 1.256v-.95a.136.136 0 0 0-.038-.095.132.132 0 0 0-.093-.04h-1.81a.131.131 0 0 0-.093.04.136.136 0 0 0-.039.096v10.546c0 .076.06.137.133.137h1.809a.132.132 0 0 0 .093-.041.136.136 0 0 0 .038-.096v-3.329c.69.794 1.525 1.18 2.543 1.18 1.893 0 3.808-1.494 3.808-4.35 0-2.858-1.915-4.354-3.808-4.354Zm8.72 6.839c-1.297 0-2.274-1.068-2.274-2.486 0-1.422.943-2.455 2.244-2.455 1.305 0 2.288 1.069 2.288 2.487 0 1.422-.949 2.454-2.258 2.454Zm0-6.838c-2.438 0-4.347 1.926-4.347 4.383 0 2.432 1.896 4.338 4.317 4.338 2.445 0 4.36-1.92 4.36-4.369 0-2.44-1.901-4.353-4.33-4.353Zm9.535.17h-1.99V7.117a.136.136 0 0 0-.08-.126.13.13 0 0 0-.052-.01h-1.809a.133.133 0 0 0-.093.04.136.136 0 0 0-.038.095v2.087h-.87a.131.131 0 0 0-.122.085.139.139 0 0 0-.01.052v1.595c0 .074.06.135.132.135h.87v4.126c0 1.667.809 2.513 2.404 2.513.648 0 1.186-.138 1.694-.434a.135.135 0 0 0 .067-.117V15.64a.137.137 0 0 0-.063-.115.13.13 0 0 0-.129-.006c-.349.18-.685.263-1.061.263-.58 0-.84-.271-.84-.876V11.07h1.99a.13.13 0 0 0 .094-.04.136.136 0 0 0 .039-.096V9.339a.137.137 0 0 0-.039-.096.132.132 0 0 0-.094-.04v.001Zm6.934.007v-.255c0-.755.281-1.092.914-1.092.376 0 .68.077 1.019.194a.13.13 0 0 0 .118-.02.135.135 0 0 0 .056-.11V6.365a.137.137 0 0 0-.026-.081.133.133 0 0 0-.068-.05 4.852 4.852 0 0 0-1.502-.22c-1.67 0-2.554.965-2.554 2.788v.393h-.87a.132.132 0 0 0-.093.04.136.136 0 0 0-.038.096v1.603c0 .075.059.136.132.136h.87v6.364c0 .075.058.135.131.135h1.809c.072 0 .131-.06.131-.135V11.07h1.69l2.586 6.362c-.294.669-.583.802-.977.802-.319 0-.654-.098-.998-.29a.133.133 0 0 0-.105-.01.135.135 0 0 0-.078.072l-.612 1.38a.137.137 0 0 0 .056.175 3.733 3.733 0 0 0 1.932.508c1.334 0 2.073-.638 2.724-2.355l3.137-8.317a.14.14 0 0 0-.014-.126.131.131 0 0 0-.108-.06h-1.883a.132.132 0 0 0-.126.092l-1.928 5.651L69.006 9.3a.133.133 0 0 0-.124-.088h-3.09v.001Zm-4.02-.008h-1.809a.132.132 0 0 0-.093.041.136.136 0 0 0-.038.096v8.094c0 .075.06.135.132.135h1.809c.072 0 .131-.06.131-.135V9.34a.136.136 0 0 0-.038-.096.133.133 0 0 0-.094-.04Zm-.896-3.685a1.295 1.295 0 0 0-.919.393c-.243.25-.379.586-.377.937a1.342 1.342 0 0 0 .377.938 1.304 1.304 0 0 0 .92.393c.346-.002.677-.143.92-.393s.379-.587.377-.938c0-.735-.581-1.33-1.296-1.33h-.002Zm15.918 4.49h-.331v.434h.331c.165 0 .264-.083.264-.216 0-.142-.099-.217-.264-.217Zm.215.619.36.517h-.304l-.323-.474h-.279v.474h-.254v-1.37h.595c.31 0 .515.163.515.436a.412.412 0 0 1-.31.417Zm-.282-1.31c-.652 0-1.146.532-1.146 1.183 0 .65.49 1.175 1.139 1.175.652 0 1.147-.532 1.147-1.183 0-.65-.492-1.174-1.14-1.174Zm-.007 2.488a1.259 1.259 0 0 1-.904-.384 1.296 1.296 0 0 1-.368-.92c0-.717.563-1.314 1.279-1.314a1.259 1.259 0 0 1 .903.384 1.295 1.295 0 0 1 .369.921c0 .717-.563 1.314-1.279 1.314Z"></path>
                    </svg>
                </div>
                <p className="text-2xl  font-extrabold text-center">
                    Sign up for free to start listening.
                </p>
                <p className="text-xl mb-6 font-bold text-center">
                    Sign up with your email address
                </p>
                <form onSubmit={formik.handleSubmit}>
                    {/* Email */}
                    <div className="form-group mb-3">
                        <p className="font-bold"> What's your email?</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email."
                            className="appearance-none my-2 p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-600 inline-flex gap-1 items-center">
                                <AiFillExclamationCircle size={16} />{" "}
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    {/* Name */}
                    <div className="form-group mb-3">
                        <p className="font-bold"> What should we call you? </p>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter a profile name."
                            value={formik.values.name}
                            className="appearance-none my-2 p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-600 inline-flex gap-1 items-center">
                                <AiFillExclamationCircle size={16} />{" "}
                                {formik.errors.name}
                            </div>
                        )}
                    </div>
                    {/* Password */}
                    <div className="form-group mb-3">
                        <p className="font-bold"> Create a password. </p>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password."
                            value={formik.values.password}
                            className={twMerge(
                                "appearance-none my-2 p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control",
                                formik.touched.password &&
                                    formik.errors.password
                                    ? "border-red-600 focus:border-red-600"
                                    : ""
                            )}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-600 inline-flex gap-1 items-center">
                                <AiFillExclamationCircle size={16} />{" "}
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                    {/* Birthdate */}
                    <div className="mb-3">
                        <p className="font-bold mb-2">
                            {" "}
                            What's your date of birth?{" "}
                        </p>
                        <div className="grid grid-cols-[2fr_6fr_4fr] grid-rows-[1.25rem_1fr] gap-2 auto-rows-min mb-2">
                            <p>Day</p>
                            <p>Month</p>
                            <p>Year</p>
                            <input
                                type="text"
                                id="day"
                                name="day"
                                placeholder="DD"
                                value={formik.values.day}
                                className="appearance-none p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className="relative">
                                <select
                                    id="month"
                                    name="month"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.month}
                                    className="appearance-none p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control"
                                >
                                    <option value="" label="Month" />
                                    {monthOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="h-full absolute inset-y-0 right-0 flex justify-center items-center pr-4 pointer-events-none ">
                                    <BsChevronDown size={16} />
                                </div>
                            </div>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                placeholder="YYYY"
                                value={formik.values.year}
                                className="appearance-none p-2 border-[1px] border-neutral-500 focus:border-[2px] focus:border-black focus:outline-none h-12 w-full rounded-md bg-white form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="flex flex-col  justify-start gap-1">
                            {formik.touched.day && formik.errors.day && (
                                <div className="text-red-600 inline-flex gap-1 items-center">
                                    <AiFillExclamationCircle size={16} />{" "}
                                    {formik.errors.day}
                                </div>
                            )}
                            {formik.touched.month && formik.errors.month && (
                                <div className="text-red-600 inline-flex gap-1 items-center">
                                    <AiFillExclamationCircle size={16} />{" "}
                                    {formik.errors.month}
                                </div>
                            )}
                            {formik.touched.year && formik.errors.year && (
                                <div className="text-red-600 inline-flex gap-1 items-center">
                                    <AiFillExclamationCircle size={16} />{" "}
                                    {formik.errors.year}
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="font-bold mb-2">What's your gender?</p>
                    <div className="flex flex-wrap gap-8 mb-3">
                        {genderOptions.map((option) => (
                            <div
                                className="flex gap-2 flex-nowrap items-center"
                                key={option.value}
                            >
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="gender"
                                    value={option.value}
                                    checked={
                                        formik.values.gender === option.value
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className=" w-5 h-5 accent-malachite"
                                />
                                <label htmlFor={option.value}>
                                    {option.label}
                                </label>
                            </div>
                        ))}
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-600 inline-flex gap-1 items-center">
                                <AiFillExclamationCircle size={16} />{" "}
                                {formik.errors.gender}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group mb-3">
                        <div className="inline-flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="termsAgreed"
                                name="termsAgreed"
                                placeholder="Create a password."
                                value={formik.values.password}
                                className="h-6 w-6 accent-malachite m-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />{" "}
                            <p className="text-sm">
                                I agree to the Spotify Terms and Conditions of
                                Use and Privacy Policy.
                            </p>
                        </div>

                        {formik.touched.termsAgreed &&
                            formik.errors.termsAgreed && (
                                <div className="text-red-600 inline-flex gap-1 items-center">
                                    <AiFillExclamationCircle size={16} />{" "}
                                    {formik.errors.termsAgreed}
                                </div>
                            )}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="px-9 py-4 text-lg font-bold rounded-full bg-malachite"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
