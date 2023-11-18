<script>
import conf from "@/config/server.config";

export default {
  data() {
    return {
      courses: [{
        courseId: 0,
        courseName: "",
        courseNumber: "",
        instructor: "",
        credits: NaN,
        description: "",
      }]
    };
  },
  name: "EnrollmentPage",
  mounted() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      fetch(conf.getUrl() + "course", {
        method: "GET",
      })
          .then((res) => res.json())
          .then((res) => {
            this.courses = res["courseList"];
          })
          .catch((err) => {
            console.log(err);
          });
    },
    enrollCourse(courseId) {
      fetch(conf.getUrl() + "enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify({
          action: "enroll",
          studentNumber: sessionStorage.getItem("studentNumber"),
          courseId: courseId,
        }),
      }).then((res) => res.text())
          .then((res) => {
            if (res === "success") {
              alert("选课成功");
            } else {
              alert(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
  }
}
</script>

<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>课程名称</th>
        <th>课程编号</th>
        <th>讲师</th>
        <th>学分</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="course in courses" :key="course.courseId">
        <td>{{ course.courseName }}</td>
        <td>{{ course.courseNumber }}</td>
        <td>{{ course.instructor }}</td>
        <td>{{ course.credits }}</td>
        <td>{{ course.description }}</td>
        <td>
          <button @click="enrollCourse(course.courseId)">选课</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}

th, td {
  border: 1px solid #ddd;
  padding-left: 10px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
  padding: 10px 10px;
}

button {
  width: 80%;
  background-color: #007bff;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
  }
}
</style>