<template>
    <div v-if="routerName" class="logout" @click="logout">
      <span class="logout__text">Logout</span>
      <b-icon class="logout__icon" icon="box-arrow-right"></b-icon>
    </div>
</template>
<script>
export default {
  name: 'LogoutButton',
  computed: {
    routerName () {
      return this.$route.name !== 'login'
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.logout {
    position: fixed;
    z-index: 9999;
    top: -50px;
    right: 30px;
    height: 100px;
    width: auto;
    border-radius: 0 0 20px 20px;
    padding: 0 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(44, 62, 80, 0.9);
    cursor: pointer;
    transition: 0.5s;
    filter: drop-shadow(1px 1px 1px #000);

    @media (max-width: 992px) {
      right: 20px;
      padding: 0 0.5rem;
    }

    &:hover {
     top: 0;
    }

    &__text {
        color: #ffffff;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    &__icon {
        width: 25px;
        height: 25px;
        fill: #ffffff;
    }
}
</style>
