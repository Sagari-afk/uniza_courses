import { closestCorners, DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "./Column";
import { arrayMove } from "@dnd-kit/sortable";

const CourseStructureDND = ({ data }) => {
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

  const handleEditTopicPos = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courseStructure/editTopicOrder",
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
        alert("Tema bola tosunuta");
      } else {
        alert("Nastala chyba");
      }
    } catch (error) {
      console.log(error);
      alert("Nastala chyba");
    }
  };

  const getTopicPos = (id) =>
    courseStructure.findIndex((topic) => topic.id === id);

  const handleDragEnd = ({ active, over }) => {
    if (active.id === over.id) {
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
      <Column topics={courseStructure} />
    </DndContext>
  );
};
export default CourseStructureDND;
