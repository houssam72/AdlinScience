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
          />
          <!-- {/* </Link> */} -->
        </div>
        <!-- {/* <Link to='register'> */} -->

        <div className="lh-copy mt3" v-if="$route.name == 'connecter'">
          <p className="tc f6 link dim white db pointer" path="/services">
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
};
</script>

<style scoped>
.marginTop {
  margin-top: 10em;
}
</style>
