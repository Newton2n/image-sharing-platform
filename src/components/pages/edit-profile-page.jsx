"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Container, Input, Button, Popup } from "../index";
import service from "@/lib/appwrite/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthLoading from "../ui/loading/auth-loading";
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
        userData?.$id
      );
      const row = information?.rows[0];
      setUserInformation(row);

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

  //profile updated profile information
  const onProfileSubmit = async (data) => {
    try {
      await service.updateProfileInformationPost(userInformation?.$id, {
        ...data,
        userId: userData?.$id,
      });
      setSubmitResult(true);
      setSubmitResultMessage("Profile information updated successfully");
    } catch (error) {
      setSubmitResult(true);
      setSubmitResultMessage("Something went wrong");
    } finally {
      setTimeout(() => {
        setSubmitResult(false);
      }, 2000);
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

  //image file handle manually
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    try {
      const fileUpload = await service.fileUpload(file);
      if (fileUpload) {
        if (userInformation.profileImageId)
          await service.deleteFile(userInformation.profileImageId);

        await service.updateProfileInformationPost(userInformation.$id, {
          profileImageId: fileUpload?.$id,
        });
      }
      setSubmitResult(true);
      setSubmitResultMessage("Profile picture updated");
    } catch (error) {
      setSubmitResult(true);

      setSubmitResultMessage("Something went wrong");
    } finally {
      setTimeout(() => {
        setSubmitResult(false);
      }, 2000);
    }

    setImgPopup(false);
  };

  //profile img url
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  const profileImageId = userInformation?.profileImageId;
  //getting img url
  useEffect(() => {
    if (profileImageId)
      service.fileView(profileImageId).then((url) => setProfileImgUrl(url));
  }, [userInformation]);

  const [imgPopup, setImgPopup] = useState(false);
  const [resetPopup, setResetPopup] = useState(false);

  const openImgPopUp = () => setImgPopup(true);
  const openResetPopUp = () => setResetPopup(true);

  if(!userData) return <AuthLoading/>

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
                  className="object-cover h-full w-full"
                />
              </div>
              <span className="my-auto ml-5">
                <Button
                  className="bg-gray-200 text-gray-800"
                  onClick={openImgPopUp}
                >
                  {userInformation?.profileImageId
                    ? " Change"
                    : "Add profile picture"}
                </Button>
              </span>
            </div>
          </div>

          <form
            className="w-full flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onProfileSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && resetPopup) e.preventDefault();
            }}
          >
            <Input label="Name" {...register("fullName", { required: true })} />
            {errors.fullName && (
              <p className="text-red-600">{errors.fullName.message}</p>
            )}

            <Input label="About" {...register("about")} />
            <Input label="Username" {...register("userName")} />
            <Input label="Phone Number" {...register("phoneNumber")} />

            <Input
              label="Email"
              className={"mb-2"}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value) ||
                    "enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            {showButtons && !resetPopup && (
              <div className="w-full flex justify-end gap-3 mb-3">
                <Button
                  className="bg-gray-100 text-black"
                  type="button"
                  onClick={openResetPopUp}
                >
                  Reset
                </Button>
                <Button type="submit" className="bg-red-500 text-white">
                  Update
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
