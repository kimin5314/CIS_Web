<script>
import conf from "@/config/server.config";

export default {
  data() {
    return {
      students: [{
        studentId: 0,
        studentName: "",
        studentNumber: "",
        admissionDate: "",
        gender: "",
        password: "",
        isOnline: "",
      }],
      newStudent: {
        studentId: 0,
        studentName: "",
        studentNumber: "",
        admissionDate: "",
        gender: "",
        password: "",
        isOnline: "",
      },
      showAdd: false,
      showModify: false
    }
  },
  name: "StudentManage",
  mounted() {
    this.getAllStudents();
  },
  methods: {
    getAllStudents() {
      fetch(conf.getUrl() + "/student" + "?studentNumber=all", {
        method: "GET",
      })
          .then((res) => res.json())
          .then((res) => {
            this.students = res["studentList"];
          })
          .catch((err) => {
            console.log(err);
          });
    },

    modifyStudent() {
      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(
            {
              action: "modify",
              studentId: this.newStudent.studentId,
              studentName: this.newStudent.studentName,
              studentNumber: this.newStudent.studentNumber,
              admissionDate: this.newStudent.admissionDate,
              gender: this.newStudent.gender,
              password: this.newStudent.password,
              isOnline: this.newStudent.isOnline
            }
        ),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getAllStudents();
            this.showModify = false;
          })
          .catch((err) => {
            alert("修改学生失败!")
            console.log(err);
          })
    },

    addStudent() {
      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(
            {
              action: "add",
              studentName: this.newStudent.studentName,
              studentNumber: this.newStudent.studentNumber,
              admissionDate: this.newStudent.admissionDate,
              gender: this.newStudent.gender,
              password: this.newStudent.password,
              isOnline: this.newStudent.isOnline
            }
        ),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getAllStudents();
            this.showAdd = false;
          })
          .catch((err) => {
            alert("添加学生失败!")
            console.log(err);
          })
    },

    setStudentInfo(student) {
      this.newStudent.studentId = student.studentId;
      this.newStudent.studentName = student.studentName;
      this.newStudent.studentNumber = student.studentNumber;
      this.newStudent.admissionDate = student.admissionDate;
      this.newStudent.gender = student.gender;
      this.newStudent.password = student.password;
      this.newStudent.isOnline = student.isOnline;
      this.showModify = true;
    },

    dropStudent(student) {
      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(
            {
              action: "drop",
              studentId: student.studentId
            }
        ),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            this.getAllStudents();
          })
          .catch((err) => {
            alert("删除学生失败!")
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
        <th>学生ID</th>
        <th>学生姓名</th>
        <th>学号</th>
        <th>注册日期</th>
        <th>性别</th>
        <th>密码</th>
        <th>是否在线</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in students" :key="student.studentId">
        <td>{{ student.studentId }}</td>
        <td>{{ student.studentName }}</td>
        <td>{{ student.studentNumber }}</td>
        <td>{{ student.admissionDate }}</td>
        <td>{{ student.gender }}</td>
        <td>{{ student.password }}</td>
        <td>{{ student.isOnline }}</td>
        <td class="action">
          <button @click="setStudentInfo(student)">修改</button>
          <button @click="dropStudent(student)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button class="add" @click="showAdd = true">添加学生</button>
  </div>

  <div v-if="showAdd" class="modal">
    <div class="modal-content">
      <span class="close" @click="showAdd = false">&times;</span>
      <form @submit.prevent="addStudent">
        <div class="form-group">
          <label for="studentName">姓名</label>
          <input type="text" id="studentName" v-model="newStudent.studentName">
        </div>
        <div class="form-group">
          <label for="studentNumber">学号</label>
          <input type="text" id="studentNumber" v-model="newStudent.studentNumber">
        </div>
        <div class="form-group">
          <label for="admissionDate">入学日期</label>
          <input type="date" id="admissionDate" v-model="newStudent.admissionDate">
        </div>
        <div class="form-group">
          <label>性别</label>
          <input type="radio" id="male" value="male" v-model="newStudent.gender">
          <label for="male">男</label>
          <input type="radio" id="female" value="female" v-model="newStudent.gender">
          <label for="female">女</label>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="newStudent.password">
        </div>
        <div class="form-group">
          <label>是否在线</label>
          <input type="radio" id="online" value="true" v-model="newStudent.isOnline">
          <label for="online">在线</label>
          <input type="radio" id="offline" value="false" v-model="newStudent.isOnline">
          <label for="offline">离线</label>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>

  <div v-if="showModify" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModify = false">&times;</span>
      <form @submit.prevent="modifyStudent">
        <div class="form-group">
          <label for="studentName">姓名</label>
          <input type="text" id="studentName" v-model="newStudent.studentName">
        </div>
        <div class="form-group">
          <label for="studentNumber">学号</label>
          <input type="text" id="studentNumber" v-model="newStudent.studentNumber">
        </div>
        <div class="form-group">
          <label for="admissionDate">入学日期</label>
          <input type="date" id="admissionDate" v-model="newStudent.admissionDate">
        </div>
        <div class="form-group">
          <label>性别</label>
          <input type="radio" id="male" value="male" v-model="newStudent.gender">
          <label for="male">男</label>
          <input type="radio" id="female" value="female" v-model="newStudent.gender">
          <label for="female">女</label>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="newStudent.password">
        </div>
        <div class="form-group">
          <label>是否在线</label>
          <input type="radio" id="online" value="true" v-model="newStudent.isOnline">
          <label for="online">在线</label>
          <input type="radio" id="offline" value="false" v-model="newStudent.isOnline">
          <label for="offline">离线</label>
        </div>
        <button type="submit">提交</button>
      </form>
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

form {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
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
input[type="password"],
input[type="date"] {
  display: block;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
}

input[type="radio"] {
  margin-right: 10px;
}

input[type="radio"] + label {
  display: inline-block;
  margin-right: 20px;
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