<template>
  <div class="customer text-center">
    <div>
      <b-card
        :title="customer.name ? customer.name : `${customer.first_name} ${customer.last_name}`"
        :sub-title="customer.job ? `${customer.job}` : 'Customer'"
        :img-src="customer.avatar"
        :img-alt="customer.first_name"
        img-top
        class="mb-4"
      >
        <b-card-text>
          {{ customer.email }}
        </b-card-text>
        <div>
          <div class="holdBtns">
            <b-button
              variant="success"
              :id="customer.id"
              @click="handleOpenUpdate(`update - ${customer.id}`)"
              >Update</b-button
            >
            <b-button
              variant="danger"
              :id="customer.id"
              @click="handleOpenDelete(`delete - ${customer.id}`)"
              >Delete</b-button
            >
          </div>
          <!--update-->
          <b-modal
            :id="`update - ${customer.id}`"
            hide-footer
            no-close-on-backdrop
            hide-header-close
          >
            <template #modal-title> Update {{customer.first_name}}'s data </template>
            <div class="d-block text-center">
              <input
                v-model="updatedInfo.newName"
                type="text"
                placeholder="New name"
                class="form-control mb-3"
              />
              <input
                v-model="updatedInfo.job"
                type="text"
                placeholder="Job title"
                class="form-control"
              />
            </div>
            <div class="holdSubmitBtns">
              <b-button
                :disabled="!updatedInfo.newName || !updatedInfo.job"
                variant="success"
                @click="updateCustomer(updatedInfo, `update - ${customer.id}`)"
                >Update</b-button
              >
              <b-button @click="handleCloseUpdate(`update - ${customer.id}`)"
                >Cancel</b-button
              >
            </div>
          </b-modal>

          <!--delete-->
          <b-modal
            :id="`delete - ${customer.id}`"
            hide-footer
            no-close-on-backdrop
            hide-header-close
          >
            <template #modal-title>
              Delete {{customer.first_name}}
            </template>
            <div class="d-block text-left">
              Are you sure you want to delete <strong>{{ customer.first_name }}</strong>?
            </div>
            <div class="holdSubmitBtns">
              <b-button
                variant="danger"
                @click="deleteCustomer(updatedInfo.customerID, `delete - ${customer.id}`)"
                >Delete</b-button
              >
              <b-button @click="handleCloseDelete(`delete - ${customer.id}`)"
                >Cancel</b-button
              >
            </div>
          </b-modal>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerCard',
  props: {
    customer: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      updatedInfo: {
        customerID: this.customer.id,
        newName: '',
        job: ''
      }
    }
  },
  methods: {
    handleOpenUpdate (id) {
      this.$bvModal.show(id)
    },
    handleCloseUpdate (id) {
      this.$bvModal.hide(id)
    },
    handleOpenDelete (id) {
      this.$bvModal.show(id)
    },
    handleCloseDelete (id) {
      this.$bvModal.hide(id)
    },
    updateCustomer (updatedInfo, id) {
      this.$emit('update', updatedInfo)
      this.handleCloseUpdate(id)
    },
    deleteCustomer (customerID, id) {
      this.$emit('delete', customerID)
      this.handleCloseDelete(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.customer {
  .card {
    align-items: center;
    padding: 1rem 0;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    .card-body {
      padding: 0.5rem 0;
      min-width: 200px;
    }
  }
}

.holdBtns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.holdSubmitBtns {
  margin-top: 1.5rem;
  display: flex;
  justify-content: end;
  align-items: center;

  button:not(:last-child) {
    margin: 0 0.5rem;
  }
}
</style>
