import { NDVI, NDVIDate } from "@/types";

const getNDVIDates = (): NDVIDate[] => {
  return [];
};

const getNDVI = (): NDVI[] => {
  return [
    {
      id: "1",
      fieldId: "1",
      date: "20230621",
      pictureURL: "https://iili.io/HPP19Uv.png",
    },
    {
      id: "2",
      fieldId: "1",
      date: "20230619",
      pictureURL: "https://iili.io/HPPW3MP.png",
    },
    {
      id: "3",
      fieldId: "1",
      date: "20230616",
      pictureURL: "https://iili.io/HPPWqcg.png",
    },
    {
      id: "4",
      fieldId: "1",
      date: "20230614",
      pictureURL: "https://iili.io/HPPWNHb.png",
    },
    {
      id: "5",
      fieldId: "1",
      date: "20230417",
      pictureURL: "https://iili.io/HPPWLOv.png",
    },
  ].reverse();
};

export { getNDVIDates, getNDVI };
