import React from "react";
import RichTextEditor from "../RichTextEditor";
import { setTravelTips } from "../../redux/createPdfSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function TravelTips() {
  const dispatch = useAppDispatch();
  const { travelTips } = useAppSelector((state) => state.createPdf);
  console.log("ggggg", travelTips);
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
      <h1 className="text-2xl font-bold mb-6">Travel Tips</h1>
      <form>
        <RichTextEditor
          text={travelTips}
          onChangeText={(text) => dispatch(setTravelTips(text))}
        />
      </form>
    </div>
  );
}
