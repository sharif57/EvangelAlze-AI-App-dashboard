import { Button, Spin, Alert, message } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Quill from "quill";
import {
  usePostPrivacyUpdateMutation,
  usePrivacyGetQuery,
} from "../../redux/features/userSlice";

// Import 'size' style attributor
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"];
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["image", "link"],
      [{ list: "bullet" }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format("align", value);
      },
    },
  },
};

const formats = [
  "size",
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];

const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [postPrivacyUpdate, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    usePostPrivacyUpdateMutation();
  const { data, isLoading, isError, error, refetch } = usePrivacyGetQuery();

  // Prefill content when data is fetched
  useEffect(() => {
    if (data?.data?.[0]?.description) {
      setContent(data.data[0].description);
    }
  }, [data]);

  // Handle form submission
  const handleUpdate = async () => {
    try {
      const payload = {
        title: data?.data?.[0]?.title || "Terms & Conditions", // Use fetched title or fallback
        description: content,
        type: "privacy",
      };
      await postPrivacyUpdate(payload).unwrap();
      message.success("Terms & Conditions updated successfully!");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to update Terms & Conditions.");
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[83vh]">
        <Spin size="large" tip="Loading terms & conditions..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <Alert
          message="Error"
          description={error?.data?.message || "Failed to load terms & conditions. Please try again later."}
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
        <FaAngleLeft onClick={() => navigate(-1)} />
        <h1>Terms & Condition</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition Edit
          </h3>
          <div className="w-full px-16">
            <div className="h-full border border-gray-400 rounded-md">
              <ReactQuill
                placeholder="Enter your updated terms & conditions..."
                theme="snow"
                value={content}
                onChange={(value) => setContent(value)}
                modules={modules}
                formats={formats}
                className="custom-quill-editor"
              />
            </div>
          </div>
          <div className="flex justify-end pt-8 pr-16">
            <Button
              onClick={handleUpdate}
              size="large"
              type="primary"
              loading={isUpdating}
              className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
            >
              Update
            </Button>
          </div>
          {isUpdateError && (
            <div className="px-16">
              <Alert
                message="Update Error"
                description={updateError?.data?.message || "Failed to update terms & conditions."}
                type="error"
                showIcon
                className="m-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditTermsConditions;