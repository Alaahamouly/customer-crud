<template>
  <div class="list">
    <b-container>
      <div class="list__notification">
        <b-alert
          :show="dismissCountDown"
          variant="success"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p v-if="deleteNotification">
            Customer has been deleted successfully
          </p>
          <p v-else>
            Customer's Data updated successfully with a new name:
            <strong>{{ customerNewName }}</strong> and a job title:
            <strong>{{ customerJob }}</strong>
          </p>
        </b-alert>
      </div>
      <b-row v-if="customers.length">
        <b-col sm="12" lg="4" v-for="customer in customers" :key="customer.id">
          <CustomerCard
            :customer="customer"
            @update="updateCustomer"
            @delete="deleteCustomer"
          />
        </b-col>
      </b-row>
      <b-row
        v-else-if="loading"
        class="d-flex justify-content-center align-items-center"
        ><h3>Loading ...</h3></b-row
      >
      <b-row v-else class="d-flex justify-content-center align-items-center"
        ><h3>No data to preview</h3></b-row
      >
    </b-container>
    <b-pagination
      v-if="customers.length"
      pills
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="onChangingPage"
    ></b-pagination>
  </div>
</template>
<script>
import axios from 'axios'
import CustomerCard from '../components/CustomerCard'
export default {
  name: 'CustomerList',
  components: { CustomerCard },
  data () {
    return {
      customers: [],
      customerID: null,
      customerNewName: '',
      customerJob: '',
      dismissSecs: 5,
      dismissCountDown: 0,
      deleteNotification: false,
      currentPage: 1,
      rows: null,
      perPage: 6,
      loading: false
    }
  },
  mounted () {
    this.loading = true
    this.getCustomers(this.currentPage)
  },
  methods: {
    onChangingPage () {
      this.getCustomers(this.currentPage)
      console.log('page changed')
    },
    async getCustomers (page) {
      this.loading = true
      const response = await axios.get(`/api/users?page=${page}`)
      if (response.status === 200) {
        this.loading = false
        this.customers = response.data.data
        this.rows = response.data.total
        this.perPage = response.data.per_page
      } else {
        this.loading = false
        this.customers = []
      }
    },
    async updateCustomer (updatedInfo) {
      this.customerID = updatedInfo.customerID
      this.customerNewName = updatedInfo.newName
      this.customerJob = updatedInfo.job
      const response = await axios.put(`/api/users/${this.customerID}`, {
        name: this.customerNewName,
        job: this.customerJob
      })
      if (response.status === 200) {
        this.deleteNotification = false
        this.showAlert()
        const customer = response.data
        const foundIndex = this.customers.findIndex(
          (customerItem) => customerItem.id === updatedInfo.customerID
        )
        if (foundIndex !== -1) {
          const existingCust = this.customers[foundIndex]
          this.customers.splice(foundIndex, 1, { ...customer, ...existingCust })
        }
      }
    },
    async deleteCustomer (customerID) {
      const response = await axios.delete(`api/users/${customerID}`)
      if (response.status === 204) {
        this.deleteNotification = true
        this.showAlert()

        const index = this.customers.findIndex((customerItem) => {
          return customerItem.id === customerID
        })
        if (index !== -1) this.customers.splice(index, 1)
      }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  &__notification {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 5%;
    left: 30%;
    z-index: 999;

    @media (max-width: 992px) {
      left: auto;
    }

    .alert {
      padding: 1rem 1rem 0;
      filter: drop-shadow(1px 1px 2px #000);
      min-width: 565px;
      text-align: center;

      @media (max-width: 992px) {
        min-width: 70%;
      }
    }
  }
}
</style>
