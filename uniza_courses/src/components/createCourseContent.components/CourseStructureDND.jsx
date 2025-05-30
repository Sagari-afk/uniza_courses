import { closestCorners, DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "./Column";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CourseStructureDND = ({ data, load }) => {
  const [topicOrderEdditing, setTopicOrderEdditing] = useState(false);
  const [courseStructure, setCourseStructure] = useState(
    data.topics
      .map((topic) => ({
        id: topic.order,
        topicId: topic.id,
        title: topic.title,
        subtopics: topic.subtopics,
      }))
      .sort((a, b) => a.id - b.id)
  );

  useEffect(() => {
    if (topicOrderEdditing) {
      handleEditTopicPos();
      setTopicOrderEdditing(false);
    }
  }, [courseStructure]);

  useEffect(() => {
    setCourseStructure(
      data.topics
        .map((topic) => ({
          id: topic.order,
          topicId: topic.id,
          title: topic.title,
          subtopics: topic.subtopics,
        }))
        .sort((a, b) => a.id - b.id)
    );
  }, [data]);

  const handleEditTopicPos = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/courseStructure/editTopicOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            courseId: data.id,
            topics: courseStructure,
          }),
        }
      );
      if (response.ok) {
        toast.success("Tema bola tosunuta");
      } else {
        throw new Error("Failed to edit topic possition");
      }
    } catch (error) {
      console.log(error);
      toast.error("Nastala chyba pri posuvani temy");
    }
  };

  const getTopicPos = (id) =>
    courseStructure.findIndex((topic) => topic.id === id);

  const handleDragEnd = ({ active, over }) => {
    if (!over || !active || active.id === over.id) {
      return;
    }
    setCourseStructure((courseStructure) => {
      const oldIndex = getTopicPos(active.id);
      const newIndex = getTopicPos(over.id);

      return arrayMove(courseStructure, oldIndex, newIndex);
    });
    setTopicOrderEdditing(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <Column topics={courseStructure} load={load} />
    </DndContext>
  );
};
export default CourseStructureDND;
