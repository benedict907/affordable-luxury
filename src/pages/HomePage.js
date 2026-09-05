import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deletePdf, getPdfs } from "../redux/clientSlice";
import { MdEdit } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { logoutSuccess } from "../redux/authSlice";
import ConfirmDelete from "../components/DeletePopup";
import { FaRegCopy } from "react-icons/fa";
import { savePdf } from "../redux/createPdfSlice";
import ConfirmCopy from "../components/ConfirmCopy";

function HomePage() {
  const dispatch = useAppDispatch();
  const { pdfs, deleteSuccess, loading } = useAppSelector(
    (state) => state.client
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const navigate = useNavigate();

  // RequireAuth guarantees we're logged in by the time this renders.
  useEffect(() => {
    dispatch(getPdfs());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getPdfs());
    }
  }, [deleteSuccess, dispatch]);

  const onDeletePressed = () => {
    dispatch(deletePdf(selectedItem))
      .unwrap()
      .then((res) => {
        if (res?.message) alert(res.message);
      })
      .catch((err) => alert(err?.message ?? "Something went wrong."));
    setIsDialogOpen(false);
  };

  const copyPdf = (formList) => {
    const {
      imageName,
      main,
      hotelItinerary,
      flights,
      transportation,
      emergencyContacts,
      groundItinerary,
      importantPoints,
      travelTips,
      customBulletPoint,
    } = formList;

    let updatedMain = structuredClone(main);
    updatedMain.title = `Copy of ${main.title}`;
    const formData = new FormData();

    formData.append("main", JSON.stringify(updatedMain));

    formData.append("flights", JSON.stringify(flights));
    formData.append("importantPoints", JSON.stringify(importantPoints));
    formData.append("travelTips", JSON.stringify(travelTips));
    formData.append("customBulletPoint", JSON.stringify(customBulletPoint));
    formData.append("emergencyContacts", JSON.stringify(emergencyContacts));
    formData.append("image", imageName);

    // Append arrays: each element as separate entry
    hotelItinerary.forEach((hotelItinerary, index) =>
      formData.append(`hotelItinerary`, JSON.stringify(hotelItinerary))
    );
    groundItinerary.forEach((groundItinerary, index) =>
      formData.append(`groundItinerary`, JSON.stringify(groundItinerary))
    );
    transportation.forEach((transportation) =>
      formData.append(`transportation`, JSON.stringify(transportation))
    );
    dispatch(savePdf(formData))
      .unwrap()
      .then(() => dispatch(getPdfs()))
      .catch((err) => alert(err?.error ?? "Something went wrong."));
  };

  const draftPdfs = pdfs?.filter(
    (item) =>
      item?.confirmationDetails === undefined ||
      item?.confirmationDetails === null
  );

  return (
    <div className="app-page">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Affordable Luxury
            </p>
            <h1 className="page-title mt-1">Your vouchers</h1>
          </div>
          <button
            onClick={() => dispatch(logoutSuccess())}
            className="btn-icon"
            title="Log out"
            aria-label="Log out"
          >
            <SlLogout className="h-5 w-5" />
          </button>
        </div>

        {/* Drafts panel */}
        <div className="card p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Drafts</h2>
            <span className="text-sm text-ink-faint">
              {draftPdfs?.length || 0} file{draftPdfs?.length === 1 ? "" : "s"}
            </span>
          </div>

          {loading && !pdfs ? (
            <div className="rounded-[14px] border border-dashed border-stroke px-6 py-10 text-center">
              <p className="text-sm text-ink-faint">Loading your files…</p>
            </div>
          ) : draftPdfs?.length ? (
            <div className="flex flex-col gap-3">
              {draftPdfs.map((formList) => (
                <div
                  key={formList._id ?? formList.main.title}
                  className="flex items-center gap-3"
                >
                  <div
                    onClick={() =>
                      navigate("/add-details", {
                        state: { selectedForm: formList },
                      })
                    }
                    className="tile flex-1 px-4 py-3.5 text-left"
                  >
                    <h3 className="truncate font-medium text-ink">
                      {formList.main.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedItem(formList);
                      setIsCopyDialogOpen(true);
                    }}
                    className="btn-icon"
                    title="Duplicate"
                    aria-label="Duplicate"
                  >
                    <FaRegCopy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      navigate("/create-pdf", { state: formList });
                    }}
                    className="btn-icon"
                    title="Edit"
                    aria-label="Edit"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(formList._id);
                      setIsDialogOpen(true);
                    }}
                    className="btn-icon is-danger"
                    title="Delete"
                    aria-label="Delete"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[14px] border border-dashed border-stroke px-6 py-10 text-center">
              <p className="text-sm text-ink-soft">No drafts yet.</p>
              <p className="mt-1 text-sm text-ink-faint">
                Create your first voucher to get started.
              </p>
            </div>
          )}

          {/* Primary actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/create-pdf")}
              className="btn btn-primary"
            >
              + Create PDF
            </button>
            <button
              onClick={() => navigate("/view-saved")}
              className="btn btn-secondary"
            >
              View Saved PDFs
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="btn btn-ghost ml-auto"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <ConfirmDelete
        isOpen={isDialogOpen}
        onConfirm={onDeletePressed}
        onCancel={() => setIsDialogOpen(false)}
      />

      <ConfirmCopy
        isOpen={isCopyDialogOpen}
        onConfirm={() => {
          copyPdf(selectedItem);
          setIsCopyDialogOpen(false);
        }}
        onCancel={() => setIsCopyDialogOpen(false)}
      />
    </div>
  );
}

export default HomePage;
