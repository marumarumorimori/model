import { useState } from "react";
import { authApi } from "@/api";

export const useSendEmail = () => {
  const [inputEmailModal, setInputEmailModal] = useState(false);
  const [error, setError] = useState("");
  const [sentModal, setSentModal] = useState(false);

  const sendMail = async (email: string) => {
    try {
      await authApi.sendEmail({ email });
      setInputEmailModal(false);
      setSentModal(true);
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.details[0].description);
      }
    }
  };

  return {
    sendMail,
    error,
    setError,
    inputEmailModal,
    setInputEmailModal,
    sentModal,
    setSentModal,
  };
};
