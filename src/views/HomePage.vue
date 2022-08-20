<template>
  <div class="home">
    <CustomerList />
  </div>
</template>
<script>
import CustomerList from '../components/CustomerList'
export default {
  name: 'HomePage',
  components: { CustomerList }
}
</script>
