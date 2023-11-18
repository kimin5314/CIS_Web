<template>
  <div>
    <h1>学生注册</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">姓名:</label>
        <input type="text" id="name" v-model="registerInfo.studentName" required>
      </div>
      <div class="form-group">
        <label for="studentNumber">学号:</label>
        <input type="text" id="studentNumber" v-model="registerInfo.studentNumber" required>
      </div>
      <div class="form-group">
        <label for="admissionDate">入学日期:</label>
        <input type="date" id="admissionDate" v-model="registerInfo.admissionDate" required>
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="registerInfo.password" required>
      </div>
      <div class="form-group">
        <label for="password">确认密码:</label>
        <input type="password" id="confirm-password" v-model="registerInfo.confirmPassword" required>
      </div>
      <div class="form-group">
        <label>性别:</label>
        <input type="radio" id="male" value="male" v-model="registerInfo.gender">
        <label for="male">男</label>
        <input type="radio" id="female" value="female" v-model="registerInfo.gender">
        <label for="female">女</label>
      </div>

      <div class="form-group">
        <button type="submit">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import conf from "@/config/server.config.js";

export default {
  data() {
    return {
      registerInfo: {
        action: "register",
        studentName: "",
        studentNumber: "",
        admissionDate: "",
        gender: "male",
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    register() {
      if (this.registerInfo.password !== this.registerInfo.confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }

      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(this.registerInfo),
      })
          .then((res) => res.text())
          .then((res) => {
            if (res === "success") {
              this.$router.push("/login");
            }
          })
          .catch((err) => {
                alert(err);
              }
          );
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
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
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .form-group {
    width: 100%;
  }

  form {
    width: 90%;
  }
}
</style>


