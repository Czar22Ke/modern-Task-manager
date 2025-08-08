<script setup>
import { ref, reactive, computed } from "vue";
import Task from "./components/Task.vue";
import Filter from "./components/Filter.vue";

const appName = "Task manager";

let tasks = reactive([
  {
    name: "Website design",
    description:
      "Define the style guide, branding and create the webdesign on Figma.",
    completed: true,
    id: 1,
  },
  {
    name: "Website development",
    description: "Develop the portfolio website using Vue JS.",
    completed: false,
    id: 2,
  },
  {
    name: "Hosting and infrastructure",
    description:
      "Define hosting, domain and infrastructure for the portfolio website.",
    completed: false,
    id: 3,
  },
  {
    name: "Composition API",
    description:
      "Learn how to use the composition API and how it compares to the options API.",
    completed: true,
    id: 4,
  },
  {
    name: "Pinia",
    description: "Learn how to setup a store using Pinia.",
    completed: true,
    id: 5,
  },
  {
    name: "Groceries",
    description: "Buy rice, apples and potatos.",
    completed: false,
    id: 6,
  },
  {
    name: "Bank account",
    description: "Open a bank account for my freelance business.",
    completed: false,
    id: 7,
  },
]);

let newTask = { completed: false };

let filterBy = ref("");

const filteredTasks = computed(() => {
  switch (filterBy.value) {
    case "todo":
      return tasks.filter((task) => !task.completed);
      break;
    case "done":
      return tasks.filter((task) => task.completed);
      break;
    default:
      return tasks;
  }
});

function addtask() {
  if (newTask.name && newTask.description) {
    newTask.id = Math.max(...tasks.map((task) => task.id)) + 1;
    tasks.push(newTask);
    newTask = { completed: false };

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

function setFilter(value) {
  filterBy.value = value;
}
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          {{ appName }}
        </h1>
      </div>
    </div>

    <Filter :filterBy="filterBy" @setFilter="setFilter" />

    <div class="tasks">
      <Task
        @toggleEvent="toggleEvent"
        v-for="(task, index) in filteredTasks"
        :task="task"
        :key="index"
      />
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <input
        type="text"
        name="title"
        placeholder="Enter a title..."
        v-model="newTask.name"
      /><br />
      <textarea
        name="description"
        rows="4"
        v-model="newTask.description"
        placeholder="Enter a description..."
      /><br />
      <button class="btn gray" @click="addtask()">Add Task</button>
    </div>
  </main>
  <div class="modal-wrapper" aria-modal="true" role="dialog" tabindex="-1">
    <div class="inner">
      <button class="close-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
          />
        </svg>
      </button>

      <div class="form">Your popup content goes here</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
  color: var(--black-color);

  .inner {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 600px;
    width: 90%;

    h3 {
      font-size: 16px;
      font-weight: 700;
      line-height: 21px;
      margin-bottom: 20px;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      background-color: var(--white-color);
    }

    .form {
      display: flex;
      flex-direction: column;
      max-width: 100%;

      label {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
      }

      input,
      select,
      textarea {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        border: 1px solid #c2c2c2;
        border-radius: 4px;
        padding: 8px 12px;
        margin-top: 5px;

        &::placeholder {
          color: #a6a6a6;
        }
      }

      .btn {
        width: fit-content;
        padding-inline: 23px;
      }
    }
  }
}
</style>
