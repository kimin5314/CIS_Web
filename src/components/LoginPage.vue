<template>
  <div>
    <h1>学生登录</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">学号:</label>
        <input type="text" id="username" v-model="loginInfo.studentNumber" required>
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="loginInfo.password" required>
      </div>
      <div class="form-group">
        <button type="submit">登录</button>
      </div>
      <div class="form-group">
        <button type="button" @click="$router.push('/register')">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import conf from "@/config/server.config.js";

export default {
  data() {
    return {
      loginInfo: {
        action: "login",
        studentNumber: "",
        password: ""
      },
    };
  },
  methods: {
    login() {
      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json,charset=utf-8",
        },
        body: JSON.stringify(this.loginInfo),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
            if (res === 'success') {
              sessionStorage.setItem("studentNumber", this.loginInfo.studentNumber);
              sessionStorage.setItem("isLoggedIn", "true");
              this.$router.push("/personal");
            } else if (res === 'admin') {
              sessionStorage.setItem("studentNumber", this.loginInfo.studentNumber);
              sessionStorage.setItem("isLoggedIn", "true");
              this.$router.push("/admin");
            } else {
              alert(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
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
input[type="password"] {
  display: block;
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
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
