<template>
  <div>
    <article
      class="br3 ba b--white w-100 w-50-m w-25-l shadow-5 center marginTop"
    >
      <div className="pa4 black-80">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className=" tc f1 fw6 ph0 mh0 white">
            {{ $route.name == "connecter" ? "Se connecter" : "S’inscrire" }}
          </legend>
          <div className="mt3">
            <label
              className="tl db fw6 lh-copy f5 white"
              htmlFor="email-address"
            >
              Email:
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
              type="email"
              name="email-address"
              id="email-address"
              v-model="Email"
            />
          </div>
          <div className="mv3">
            <label className="tl db fw6 lh-copy f5 white" htmlFor="password">
              Password:
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--white"
              type="password"
              name="password"
              id="password"
              v-model="Password"
            />
          </div>
        </fieldset>
        <div>
          <!-- {/* <Link to='/Acceuil'> */} -->
          <input
            className="white sat b ph3 pv2 input-reset ba b--white
          bg-transparent grow pointer f6 dib"
            type="submit"
            :value="
              $route.name == 'connecter' ? 'Je me connecte' : 'S’inscrire'
            "
            @click="loginOrSignUp"
          />
          <!-- {/* </Link> */} -->
        </div>
        <!-- {/* <Link to='register'> */} -->

        <div className="lh-copy mt3" v-if="$route.name == 'connecter'">
          <p
            className="tc f6 link dim white db pointer"
            path="/inscrire"
            @click="
              () => {
                $router.push({ name: 'inscrire' });
              }
            "
          >
            S’inscrire
          </p>
        </div>

        <!-- {/* </LiZnk> */} -->
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "signinRegister",
  data() {
    return {
      Email: "",
      Password: "",
    };
  },
  methods: {
    loginOrSignUp() {
      // Handle the click event here
      if (this.$route.name == "connecter") {
        console.log("Se connecter Button clicked!");
        fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.Email,
            password: this.Password,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            // Handle the response from the server
            if (result.token) {
              localStorage.setItem("token", result.token);
              localStorage.setItem("exp", result.exp);
              this.$router.push({ name: "room" });
            } else {
              alert("Server Error");
            }
            console.log("Response:", result);
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            alert("Server Error");
            console.error("Error:", error);
          });
      } else if (this.$route.name == "inscrire") {
        fetch("http://localhost:3000/user/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.Email,
            password: this.Password,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.message == "user created") {
              this.$router.push({ name: "connecter" });
            } else if (result.message == "Mail exists") {
              alert(result.message);
            } else {
              alert("Error Server1");
            }
            // Handle the response from the server
            console.log("Response:", result);
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            alert("Server Error2");
            console.error("Error:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.marginTop {
  margin-top: 10em;
}
</style>
