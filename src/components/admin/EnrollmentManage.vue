<script>
import conf from "@/config/server.config";

export default {
  data() {
    return {
      enrollments: [{
        enrollmentId: 0,
        studentId: 0,
        courseId: 0,
        grade: 0,
        enrollmentDate: "",
      }]
    }
  },
  name: "EnrollmentManage",
  mounted() {
    this.getAllEnrollments();
  },
  methods: {
    getAllEnrollments() {
      fetch(conf.getUrl() + "enrollment" + "?studentNumber=all", {
        method: "GET",
      })
          .then((res) => res.json())
          .then((res) => {
            this.enrollments = res["enrollmentList"];
          })
          .catch((err) => {
            console.log(err);
          });
    },

    // eslint-disable-next-line no-unused-vars
    modifyEnrollment(enrollmentId) {
      alert("not implemented yet!");
    },
  }
}
</script>

<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>选课ID</th>
        <th>学生ID</th>
        <th>课程ID</th>
        <th>成绩</th>
        <th>选课日期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="enrollment in enrollments" :key="enrollment.enrollmentId">
        <td>{{ enrollment.enrollmentId }}</td>
        <td>{{ enrollment.studentId }}</td>
        <td>{{ enrollment.courseId }}</td>
        <td>{{ enrollment.grade }}</td>
        <td>{{ enrollment.enrollmentDate }}</td>
        <td>
          <button @click="modifyEnrollment(enrollment.enrollmentId)">修改</button>
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