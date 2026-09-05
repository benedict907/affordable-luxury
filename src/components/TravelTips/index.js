import React from "react";
import RichTextEditor from "../RichTextEditor";
import { setTravelTips } from "../../redux/createPdfSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function TravelTips() {
  const dispatch = useAppDispatch();
  const { travelTips } = useAppSelector((state) => state.createPdf);

  return (
    <div className="card w-full max-w-4xl p-6 sm:p-8 mb-10">
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
