import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  // const saved = localStorage.getItem("tasks");
  // let tasks = reactive(saved ? JSON.parse(saved) : []);

  let tasks = reactive(JSON.parse(localStorage.getItem("tasks")) || []);

  let filterBy = ref("");

  let modalIsActive = ref(false);

  function setFilter(value) {
    filterBy.value = value;
  }

  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case "todo":
        return tasks.filter((task) => !task.completed);
      case "done":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  function addTask(newTask) {
    if (newTask.name && newTask.description) {
      newTask.id = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1;
      tasks.push(newTask);

      console.log(newTask);
    } else {
      alert("Nigga Please enter a MuthaFukin' task");
    }
  }

  function toggleEvent(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
    console.log("clicked", id);
  }

  function openModal() {
    modalIsActive.value = true;
    console.log(modalIsActive.value);
  }
  function closeModal() {
    modalIsActive.value = false;
    console.log(modalIsActive.value);
  }

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleEvent,
    modalIsActive,
    openModal,
    closeModal,
  };
});
