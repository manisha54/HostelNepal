import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../Statistic";
import getUserFromCookie from "../utils/getUserFromCookie";

const initialState = {
  isLoading: false,
  formData: {
    name: "",
    gender: "",
    role: "CUSTOMER",
    address: "",
    emergency_no: "",
    emergency_contact: "",
    relation: "",
    resident_address: "",
    user_image: null,
  },
};

function userProfileReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        formData: { ...state.formData, ...action.payload },
      };
    case "FETCH_FAIL":
      return { ...state, isLoading: false };
    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
}

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);
  const {
    isLoading,
    formData: {
      name,
      gender,
      role,
      address,
      emergency_no,
      emergency_contact,
      relation,
      resident_address,
      user_image,
    },
  } = state;

  useEffect(() => {
    async function fetchProfile() {
      const user = getUserFromCookie("hostelNepalCookie");
      if (user && user.role === "user") {
        dispatch({ type: "FETCH_START" });
        try {
          const { data } = await axios.get(`${url}/user/profile`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          dispatch({ type: "FETCH_SUCCESS", payload: data });
          dispatch({ type: "UPDATE_FORM_DATA", payload: data });
        } catch (error) {
          console.error("Error fetching profile:", error);
          dispatch({ type: "FETCH_FAIL" });
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Error fetching profile");
          }
        }
      }
    }
    fetchProfile();
  }, []);

  const submitUserProfile = () => {
    dispatch({ type: "FETCH_START" });

    const formData = new FormData();
    formData.append("email", name);
    formData.append("phone", gender);
    formData.append("profile", role);
    formData.append(" ", address);
    formData.append(" ", emergency_no);
    formData.append(" ", emergency_contact);
    formData.append(" ", relation);
    formData.append(" ", resident_address);
    formData.append(" ", user_image);

    axios
      .post(`${url}/user/profile-setup`, formData, {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      })
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });

        console.log("Profile set successfully", response.data);

        toast.success("Profile set successfully!");
      })
      .catch((error) => {
        dispatch({ type: "FETCH_FAIL" });

        console.error("Error setting profile:", error);

        toast.error("Failed to set profile. Please try again.");
      });
  };

  const updateFormData = (formData) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: formData });
  };

  return (
    <UserProfileContext.Provider
      value={{ isLoading, state, submitUserProfile, updateFormData, Favorite }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

UserProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
