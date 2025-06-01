import { useState, useEffect } from "react";
import { Button, Form, Input, Spin, Alert } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { useUserProfileQuery } from "../../redux/features/userSlice";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, error } = useUserProfileQuery();
  const [form] = Form.useForm();

  const apiUrl = import.meta.env.VITE_IMAGE_API || "";
  console.log(apiUrl,'apiUrl');
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        name: data.data.name || "N/A",
        email: data.data.email || "N/A",
        phone: data.data.phone || "N/A",
      });
    }
  }, [data, form]);

  // Profile data with fallbacks and single URL construction
  const profileData = {
    name: data?.data?.name || "N/A",
    email: data?.data?.email || "N/A",
    phone: data?.data?.phone || "N/A",
    profile: data?.data?.image ? `${apiUrl}${data.data.image}` : "",
    role: data?.data?.role || "N/A",
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[83vh]">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <Alert
          message="Error"
          description={error?.data?.message || "Failed to load profile data. Please try again later."}
          type="error"
          showIcon
          className="m-4"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Personal Information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal Information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                <Button
                  onClick={() => navigate("edit")}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                form={form}
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name: profileData.name,
                  email: profileData.email,
                  phone: profileData.phone,
                }}
              >
                <div className="col-span-3 space-y-6">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                    <div className="my-2">
                      <img
                        src={profileData.profile}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-black"
                        onError={(e) => (e.target.src = '')} // Fallback if image fails
                      />
                    </div>
                    <h5 className="text-lg text-[#222222]">Profile</h5>
                    <h4 className="text-2xl text-[#222222]">{profileData.role}</h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg text-[#222222] font-medium"
                    label="Phone Number"
                    name="phone"
                  >
                    <PhoneCountryInput value={profileData.phone} disabled />
                  </Form.Item>
                </div>
              </Form>
            </div>
            <PasswordChangeModalForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;