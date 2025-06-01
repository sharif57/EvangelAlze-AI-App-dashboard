import { useState, useEffect } from "react";
import { Button, Form, Input, Spin, Alert, message } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import { FaAngleLeft } from "react-icons/fa6";
import {
  useUserProfileQuery,
  useUserProfileUpdateMutation,
} from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const EditMyProfile = () => {
  const [form] = Form.useForm();
  const [userProfileUpdate, { isLoading: isUpdating }] = useUserProfileUpdateMutation();
  const { data, isLoading, isError, error, refetch } = useUserProfileQuery();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const apiUrl = import.meta.env.VITE_IMAGE_API || "";

  // Set initial form values when data is fetched
  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        name: data.data.name || "N/A",
        email: data.data.email || "N/A",
        phone: data.data.phone || "N/A",
      });
      // Set initial image preview
      const imageUrl = data.data.image ? `${apiUrl}${data.data.image}` : dashProfile;
      setImagePreview(imageUrl);
    }
  }, [data, form, apiUrl]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("data", JSON.stringify({ name: values.name }));

      await userProfileUpdate(formData).unwrap();
      message.success("Profile updated successfully!");
      navigate("/settings/profile");
      refetch(); // Refresh profile data after update
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please fill in all required fields.");
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

  // Profile data for display
  const profileData = {
    name: data?.data?.name || "N/A",
    email: data?.data?.email || "N/A",
    phone: data?.data?.phone || "N/A",
    profile: imagePreview || dashProfile,
    role: data?.data?.role || "N/A",
  };

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Personal Information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
            Personal Information
          </h3>
          <div className="w-full">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="col-span-3 space-y-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                  <div className="my-2 relative">
                    <img
                      src={profileData.profile}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-black"
                      onError={(e) => (e.target.src = dashProfile)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
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
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
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
                <Form.Item className="flex justify-end pt-4">
                  <Button
                    htmlType="submit"
                    size="large"
                    type="primary"
                    loading={isUpdating}
                    className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;