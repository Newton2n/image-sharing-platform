"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Container, Input, Button, Popup } from "../index";
import service from "@/lib/appwrite/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthLoading from "../ui/loading/auth-loading";
import ButtonLoader from "../ui/loading/button-loader";
import InputError from "../ui/error/input-error";
import { isValidPhoneNumber } from "libphonenumber-js";

function EditProfile() {
  const router = useRouter();
  const userData = useSelector((state) => state.auth.userData);
  const [userInformation, setUserInformation] = useState();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      about: "",
      userName: "",
    },
  });

  // Control button visibility independently
  const [showButtons, setShowButtons] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  //Verify auth
  useEffect(() => {
    if (userData) {
      setIsAuthor(true);
    } else {
      const wait = setTimeout(() => {
        if (!isAuthor) router.replace("/login");
      }, 500);
      return () => clearTimeout(wait);
    }
  }, [userData]);

  //update and reset button show
  useEffect(() => {
    setShowButtons(isDirty);
  }, [isDirty]);

  //Fetching user details
  useEffect(() => {
    const getInformation = async () => {
      if (!userData?.$id) return;

      const information = await service.getProfileInformationQuery(
        userData?.$id,
      );
      const row = information?.rows[0];
      setUserInformation(row);
      setProfileImageId(row?.profileImageId);
      // set baseline
      reset({
        fullName: row?.fullName || "",
        email: row?.email || "",
        phoneNumber: row?.phoneNumber || "",
        about: row?.about || "",
        userName: row?.userName || "",
      });
    };

    getInformation();
  }, [userData?.$id, reset]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [submitResult, setSubmitResult] = useState(false);
  const [submitResultMessage, setSubmitResultMessage] = useState("");
  const [isFIleSubmitLoading, setIsFileSubmitLoading] = useState(false);
  const [isProfileSubmitLoading, setIsProfileSubmitLoading] = useState(false);

  //profile updated profile information
  const onProfileSubmit = async (data) => {
    setIsProfileSubmitLoading(true);
    try {
      await service.updateProfileInformationPost(userInformation?.$id, {
        ...data,
        userId: userData?.$id,
      });
      setSubmitResult(true);
      setSubmitResultMessage("Profile information updated successfully");
    } catch (error) {
      setSubmitResult(true);
      setSubmitResultMessage(error?.message);
    } finally {
      setIsProfileSubmitLoading(false);
      setTimeout(() => {
        setSubmitResult(false);
      }, 2500);
    }

    // Update baseline after save
    reset(data);
  };

  //for reset user changes
  const handleReset = () => {
    if (!userInformation) return;

    reset({
      fullName: userInformation?.fullName || "",
      email: userInformation?.email || "",
      phoneNumber: userInformation?.phoneNumber || "",
      about: userInformation?.about || "",
      userName: userInformation?.userName || "",
    });
  };

  //profile img url
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  const [profileImageId, setProfileImageId] = useState(
    userInformation?.profileImageId,
  );

  //image file handle manually
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsFileSubmitLoading(true);
    setSelectedFile(file);
    try {
      const fileUpload = await service.fileUpload(file); //upload new image
      if (fileUpload) {
        if (userInformation.profileImageId) {
          await service.deleteFile(userInformation.profileImageId); // delete old image
        }
        setProfileImageId(fileUpload?.$id);
        await service.updateProfileInformationPost(userInformation.$id, {
          profileImageId: fileUpload?.$id,
        });
      }
      setSubmitResult(true);
      setSubmitResultMessage("Profile picture updated");
    } catch (error) {
      setSubmitResult(true);
      setSubmitResultMessage(error?.message); // result in ui
    } finally {
      setIsFileSubmitLoading(false);
      setTimeout(() => {
        setSubmitResult(false);
      }, 2500);
    }

    setImgPopup(false);
  };

  //getting img url
  useEffect(() => {
    const getFileUrlResponse = async () => {
      if (profileImageId) {
        await service
          .fileView(profileImageId)
          .then((url) => setProfileImgUrl(url));
      }
    };
    getFileUrlResponse();
  }, [userInformation, profileImageId]);

  const [imgPopup, setImgPopup] = useState(false);
  const [resetPopup, setResetPopup] = useState(false);

  const openImgPopUp = () => setImgPopup(true);
  const openResetPopUp = () => setResetPopup(true);

  if (!userData) return <AuthLoading />;

  return (
    <Container>
      {imgPopup && (
        <Popup //image popup
          isOpen={imgPopup}
          title={
            userInformation?.profileImageId
              ? "Change your picture"
              : "Add your picture"
          }
          confirmText="Choose photo"
          cancelText="Cancel"
          message={"Please select a  picture under 2 MB"}
          onCancel={() => setImgPopup(false)}
          onConfirm={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = handleFileSelect;
            input.click();
          }}
        />
      )}

      {resetPopup && (
        <Popup //reset popup
          isOpen={resetPopup}
          title="Are you sure to reset all information"
          confirmText="Yes"
          cancelText="Cancel"
          onCancel={() => setResetPopup(false)}
          onConfirm={() => {
            setResetPopup(false); // close popup first
            setTimeout(() => handleReset(), 10); // reset after render
          }}
        />
      )}

      <div className="w-full dark:bg-black">
        <div className="w-5/6 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-y-5">
          {submitResult && (
            <div className=" mx-auto py-1 dark:text-pink-200">
              {submitResultMessage}
            </div>
          )}
          <div className="w-full flex flex-col items-start">
            <p className="text-black dark:text-white py-1">Photo</p>
            <div className="w-full flex">
              <div className="relative w-20 h-20 rounded-full border border-black dark:border-white overflow-hidden">
                <Image
                  src={
                    profileImgUrl && typeof profileImgUrl === "string"
                      ? profileImgUrl
                      : "/image/initial-profile-pic2.webp"
                  }
                  alt="profile picture"
                  fill
                  sizes="80px"
                  className="object-cover h-full w-full"
                />
              </div>
              <span className="my-auto ml-5">
                <Button
                  disabled={isFIleSubmitLoading}
                  className={`bg-gray-200 text-gray-800 flex justify-center items-center gap-2 ${isFIleSubmitLoading ? "cursor-not-allowed opacity-65" : "cursor-pointer"}`}
                  onClick={openImgPopUp}
                >
                  {/* {userInformation?.profileImageId
                    ? " Change"
                    : "Add profile picture"} */}
                  {userInformation?.profileImageId ? (
                    isFIleSubmitLoading ? (
                      <>
                        {" "}
                        <ButtonLoader color="text-black" /> Changing{" "}
                      </>
                    ) : (
                      "Change"
                    )
                  ) : isFIleSubmitLoading ? (
                    <>
                      {" "}
                      <ButtonLoader /> Adding profile picture{" "}
                    </>
                  ) : (
                    "Add profile picture"
                  )}
                </Button>
              </span>
            </div>
          </div>

          <form
            className="w-full  flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onProfileSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && resetPopup) e.preventDefault();
            }}
          >
            <Input
              label="Name"
              {...register("fullName", {
                required: true,
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name should only contain letters and spaces",
                },
              })}
            />
            {errors.fullName && (
              <InputError
                message={errors.fullName.message || "Please use your real name"}
              />
            )}

            <Input
              label="About"
              {...register("about", {
                required: "Please tell us a little about yourself",
                minLength: {
                  value: 10,
                  message: "Your bio should be at least 10 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Bio cannot exceed 200 characters",
                },
              })}
            />
            {errors.about && (
              <InputError
                message={
                  errors.about.message ||
                  "Your bio should be at least 15 characters and less than 200 characters"
                }
              />
            )}
            <Input
              label="Username"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username cannot exceed 20 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Usernames can only contain letters, numbers, and underscores",
                },
              })}
            />
            {errors.userName && (
              <InputError
                message={
                  errors.userName.message ||
                  "Usernames can only contain letters, numbers, and underscores"
                }
              />
            )}
            <Input
              label="Phone Number"
              placeholder={"+CountryCode (e.g. +44...)"}
              {...register("phoneNumber", {
                validate: (value) =>
                  !value ||
                  isValidPhoneNumber(value) ||
                  "Please enter a valid international phone number with country code",
              })}
            />
            {errors?.phoneNumber && (
              <InputError
                message={
                  errors?.phoneNumber?.message ||
                  "International format required. Please start with '+' and your country code"
                }
              />
            )}
            <Input
              label="Email"
              className={"mb-2"}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value) ||
                    "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <InputError
                message={errors.email.message || "Enter a valid email address"}
              />
            )}

            {showButtons && !resetPopup && (
              <div className="w-full flex justify-end gap-3 mb-3">
                <Button
                  className="bg-gray-100 text-black cursor-pointer"
                  type="button"
                  onClick={openResetPopUp}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isProfileSubmitLoading}
                  className={`bg-red-500 text-white flex items-center justify-center gap-2 ${isProfileSubmitLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  {isProfileSubmitLoading ? (
                    <>
                      Updating <ButtonLoader />
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
