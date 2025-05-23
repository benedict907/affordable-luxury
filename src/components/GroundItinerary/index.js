import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteDay, deleteTask, setDays } from "../../redux/createPdfSlice";
import RichTextEditor from "../RichTextEditor";
import { MdDelete } from "react-icons/md";
const GroundItinerary = () => {
  // const [days, setDays] = useState([
  //   {
  //     dailyTasks: [{ time: "", task: "", description: "", bulletPoints: [] }],
  //   },
  // ]);
  const days = useAppSelector((state) => state.createPdf.groundItinerary);
  const dispatch = useAppDispatch();
  const handleAddDay = () => {
    dispatch(
      setDays([
        ...days,
        {
          dailyTasks: [
            { time: "", task: "", description: "", bulletPoints: [] },
          ],
        },
      ])
    );
  };

  const handleAddTask = (dayIndex) => {
    const updatedDays = days.map((day, index) => {
      if (index === dayIndex) {
        return {
          ...day,
          dailyTasks: [
            ...day.dailyTasks,
            { time: "", task: "", description: "", bulletPoints: [] },
          ],
        };
      }
      return day;
    });
    dispatch(setDays(updatedDays));
  };

  const handleInputChange = (dayIndex, taskIndex, field, value) => {
    const updatedDays = days.map((day, index) => {
      if (index === dayIndex) {
        const updatedTasks = day.dailyTasks.map((task, tIndex) => {
          if (tIndex === taskIndex) {
            return { ...task, [field]: value };
          }
          return task;
        });
        return { ...day, dailyTasks: updatedTasks };
      }
      return day;
    });
    dispatch(setDays(updatedDays));
  };

  const renderTasks = (tasks, dayIndex) => {
    return tasks?.map((task, taskIndex) => (
      <div key={taskIndex} className="mb-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium mb-2">Task {taskIndex + 1}</h3>
          {taskIndex > 0 ? (
            <MdDelete
              onClick={() => {
                dispatch(deleteTask({ taskIndex, dayIndex }));
              }}
              className="w-10 h-10 active:opacity-50"
            />
          ) : null}
        </div>

        <div className="mb-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor={`time-${dayIndex}-${taskIndex}`}
          >
            Time
          </label>
          <input
            type="text"
            id={`time-${dayIndex}-${taskIndex}`}
            name={`time-${dayIndex}-${taskIndex}`}
            disabled={taskIndex === 0}
            placeholder={
              taskIndex === 0 ? "Not able to add time for first task" : ""
            }
            value={task.time}
            onChange={(e) =>
              handleInputChange(dayIndex, taskIndex, "time", e.target.value)
            }
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor={`task-${dayIndex}-${taskIndex}`}
          >
            Task (Optional)
          </label>
          <input
            type="text"
            id={`task-${dayIndex}-${taskIndex}`}
            name={`task-${dayIndex}-${taskIndex}`}
            value={task.task}
            onChange={(e) =>
              handleInputChange(dayIndex, taskIndex, "task", e.target.value)
            }
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor={`description-${dayIndex}-${taskIndex}`}
          >
            Description (Optional)
          </label>
          <input
            type="text"
            id={`description-${dayIndex}-${taskIndex}`}
            name={`description-${dayIndex}-${taskIndex}`}
            value={task.description}
            onChange={(e) =>
              handleInputChange(
                dayIndex,
                taskIndex,
                "description",
                e.target.value
              )
            }
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor={`description-${dayIndex}-${taskIndex}`}
          >
            Bullet Points (Optional)
          </label>
          <RichTextEditor
            text={task.bulletPoints}
            onChangeText={(text) =>
              handleInputChange(dayIndex, taskIndex, "bulletPoints", text)
            }
          />
          {/* <input
            type="text"
            id={`bullet-${dayIndex}-${taskIndex}`}
            name={`bullet-${dayIndex}-${taskIndex}`}
            value={task.bulletPoints}
            onChange={(e) =>
              handleInputChange(dayIndex, taskIndex, "bullet", e.target.value)
            }
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          /> */}
        </div>
      </div>
    ));
  };

  const renderDays = () => {
    return days.map((day, dayIndex) => (
      <div key={dayIndex} className="mb-6 border p-4 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold mb-4">Day {dayIndex + 1}</h2>
          {dayIndex > 0 ? (
            <MdDelete
              onClick={() => {
                dispatch(deleteDay(dayIndex));
              }}
              className="w-10 h-10 active:opacity-50"
            />
          ) : null}
        </div>
        {renderTasks(day.dailyTasks, dayIndex)}
        <button
          type="button"
          onClick={() => handleAddTask(dayIndex)}
          className="w-full bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 mb-4"
        >
          Add Task
        </button>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg my-10">
      <h1 className="text-2xl font-bold mb-6">Ground Itinerary</h1>
      <form>
        {renderDays()}
        <button
          type="button"
          onClick={handleAddDay}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add New Day
        </button>
      </form>
    </div>
  );
};

export default GroundItinerary;
