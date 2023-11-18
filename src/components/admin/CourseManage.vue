<script>
import conf from "@/config/server.config";

export default {
  name: "CourseManage",
  data() {
    return {
      courses: [{
        courseId: 0,
        courseName: "",
        courseNumber: "",
        instructor: "",
        credits: 0,
        description: "",
      }],
      newCourse: {
        courseId: 0,
        courseName: "",
        courseNumber: "",
        instructor: "",
        credits: 0,
        description: "",
      },
      showAdd: false,
      showModify: false
    };
  },
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

    modifyCourse() {
      fetch(conf.getUrl() + "course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "modify",
          courseId: this.newCourse.courseId,
          courseName: this.newCourse.courseName,
          courseNumber: this.newCourse.courseNumber,
          instructor: this.newCourse.instructor,
          credits: this.newCourse.credits,
          description: this.newCourse.description,
        })
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getCourses();
            this.showModify = false;
          })
          .catch((err) => {
            alert("修改课程失败!")
            console.log(err);
          })
    },

    addCourse() {
      fetch(conf.getUrl() + "course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          courseName: this.newCourse.courseName,
          courseNumber: this.newCourse.courseNumber,
          instructor: this.newCourse.instructor,
          credits: this.newCourse.credits,
          description: this.newCourse.description,
        })
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getCourses();
            this.showAdd = false;
          })
          .catch((err) => {
            alert("添加课程失败!")
            console.log(err);
          })
    },

    setCourseInfo(course) {
      this.newCourse.courseId = course.courseId;
      this.newCourse.courseName = course.courseName;
      this.newCourse.courseNumber = course.courseNumber;
      this.newCourse.instructor = course.instructor;
      this.newCourse.credits = course.credits;
      this.newCourse.description = course.description;
      this.showModify = true;
    },

    dropCourse(course) {
      fetch(conf.getUrl() + "course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(
            {
              action: "drop",
              courseId: course.courseId
            }
        ),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getCourses();
          })
          .catch((err) => {
            alert("删除课程失败!")
            console.log(err);
          })
    }
  }
}
</script>

<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>课程ID</th>
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
        <td>{{ course.courseId }}</td>
        <td>{{ course.courseName }}</td>
        <td>{{ course.courseNumber }}</td>
        <td>{{ course.instructor }}</td>
        <td>{{ course.credits }}</td>
        <td>{{ course.description }}</td>
        <td class="action">
          <button @click="setCourseInfo(course)">修改</button>
          <button @click="dropCourse(course)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button class="add" @click="showAdd = true">添加课程</button>

    <div v-if="showAdd" class="modal">
      <div class="modal-content">
        <span class="close" @click="showAdd = false">&times;</span>
        <form @submit.prevent="addCourse">
          <div class="form-group">
            <label for="courseName">课程名称</label>
            <input type="text" id="courseName" v-model="newCourse.courseName">
          </div>
          <div class="form-group">
            <label for="courseNumber">课程编号</label>
            <input type="text" id="courseNumber" v-model="newCourse.courseNumber">
          </div>
          <div class="form-group">
            <label for="instructor">讲师</label>
            <input type="text" id="instructor" v-model="newCourse.instructor">
          </div>
          <div class="form-group">
            <label for="credits">学分</label>
            <input type="number" id="credits" v-model="newCourse.credits">
          </div>
          <div class="form-group">
            <label for="description">描述</label>
            <input type="text" id="description" v-model="newCourse.description">
          </div>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>

    <div v-if="showModify" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModify = false">&times;</span>
        <form @submit.prevent="modifyCourse">
          <div class="form-group">
            <label for="courseName">课程名称</label>
            <input type="text" id="courseName" v-model="newCourse.courseName">
          </div>
          <div class="form-group">
            <label for="courseNumber">课程编号</label>
            <input type="text" id="courseNumber" v-model="newCourse.courseNumber">
          </div>
          <div class="form-group">
            <label for="instructor">讲师</label>
            <input type="text" id="instructor" v-model="newCourse.instructor">
          </div>
          <div class="form-group">
            <label for="credits">学分</label>
            <input type="number" id="credits" v-model="newCourse.credits">
          </div>
          <div class="form-group">
            <label for="description">描述</label>
            <input type="text" id="description" v-model="newCourse.description">
          </div>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
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

.action {
  display: flex;
  justify-content: space-around;
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

.add {
  width: 10%;
  background-color: #007bff;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;
}

form {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  margin: 10px auto;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
}

input[type="text"],
input[type="number"] {
  display: block;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
}

.close {
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
  }
}
</style>