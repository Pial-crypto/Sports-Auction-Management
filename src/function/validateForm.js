import * as yup from "yup";

// ✅ স্ট্রং পাসওয়ার্ড চেকের জন্য Regex (কমপক্ষে ৮ ডিজিট, ১ বড় হাতের, ১ ছোট হাতের, ১ সংখ্যা, ১ স্পেশাল ক্যারেক্টার)
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ✅ Yup স্কিমা তৈরি করলাম
export const validateForm = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .matches(passwordRegex, "Password must be at least 8 characters with an uppercase, lowercase, number & special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().oneOf(["organizer", "player", "manager"], "Invalid role").required("Role is required"),
});
