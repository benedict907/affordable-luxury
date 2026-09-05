import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deletePdf, getPdfs } from "../redux/clientSlice";
import { MdDelete } from "react-icons/md";
import ConfirmDelete from "../components/DeletePopup";

function SavedPdfs() {
  const dispatch = useAppDispatch();
  const { pdfs, deleteSuccess, loading } = useAppSelector(
    (state) => state.client
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const savedPdfs = pdfs?.filter((item) =>
    item?.confirmationDetails?.confirmationNumber
      ?.toLowerCase()
      .includes(searchTerm)
  );

  return (
    <div className="app-page">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="link mb-2 text-sm"
            >
              ← Back
            </button>
            <h1 className="page-title">Saved files</h1>
          </div>
          <input
            type="text"
            placeholder="Search by confirmation #"
            className="text-input w-full sm:w-72"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        <div className="card p-6 sm:p-8">
          {loading && !pdfs ? (
            <div className="rounded-[14px] border border-dashed border-stroke px-6 py-10 text-center">
              <p className="text-sm text-ink-faint">Loading your files…</p>
            </div>
          ) : savedPdfs?.length ? (
            <div className="flex flex-col gap-3">
              {savedPdfs.map((formList) => (
                <div
                  key={formList._id}
                  className="flex items-center gap-3"
                >
                  <div
                    onClick={() => {
                      navigate("/pdf-view", {
                        state: {
                          confirmationNumber:
                            formList.confirmationDetails.confirmationNumber,
                          passengerList:
                            formList.confirmationDetails.passengerList,
                          selectedForm: formList,
                          selectedStartDate:
                            formList.confirmationDetails.selectedStartDate,
                          flights: formList.flights,
                          selectedEndDate:
                            formList.confirmationDetails.selectedEndDate,
                        },
                      });
                    }}
                    className="tile flex-1 px-4 py-3.5 text-left"
                  >
                    <h3 className="truncate font-medium text-ink">
                      {formList.confirmationDetails.confirmationNumber}
                    </h3>
                  </div>

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
              <p className="text-sm text-ink-soft">No saved files found.</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDelete
        isOpen={isDialogOpen}
        onConfirm={onDeletePressed}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default SavedPdfs;
