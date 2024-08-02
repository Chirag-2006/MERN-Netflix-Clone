import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrandingContent = () => {
  const [trandingContent, setTrandingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrandingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrandingContent(res.data.content);
    };

    getTrandingContent();
  }, [contentType]);

  return { trandingContent };
};

export default useGetTrandingContent;
