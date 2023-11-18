<template>
  <div>
    <h1>admin, welcome!</h1>
    <nav class="navbar">
      <ul class="nav-menu">
        <li>
          <router-link to="/student-manage">学生管理</router-link>
        </li>
        <li>
          <router-link to="/course-manage">课程管理</router-link>
        </li>
        <li>
          <router-link to="/enrollment-manage">选课管理</router-link>
        </li>
      </ul>
      <div class="logout-section">
        <a href="#" @click="logout">登出</a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import conf from "@/config/server.config";

export default {
  name: "AdminPage",
  mounted() {
    window.addEventListener("beforeunload", this.logout);
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.logout);
  },
  methods: {
    logout() {
      fetch(conf.getUrl() + "student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "logout",
          studentNumber: sessionStorage.getItem("studentNumber"),
        }),
      })
          .then((res) => res.text())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      this.$router.push("/login");
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("studentName");
      sessionStorage.removeItem("studentNumber");
    },
  }
}
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-menu li {
  margin: 0 20px;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover,
.logout-section a:hover {
  background-color: #0056b3;
}

.logout-section a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>