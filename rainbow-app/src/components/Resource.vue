<template>
  <div class="container-fluid mt-4 bg-transparent">
    <h1 class="h1 text-white">Resources Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table v-if="resources.length" class="table table-striped table-light">
          <thead class="bg-secondary text-white">
            <tr>
              <th class="border-top-0">Value</th>
              <th class="border-top-0">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in resources" :key="resource.id">
              <td>{{ resource.value }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateResourceToEdit(resource)">Edit</a> -
                <a href="#" @click.prevent="deleteResource(resource.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Resource ID#' + model.id : 'New Resource')">
          <form @submit.prevent="saveResource">
            <b-form-group label="Value">
              <b-form-textarea rows="4" v-model="model.value"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success" class="bg-secondary">Save Resource</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/api/',
  json: true
})

async function execute (method, resource, data) {
  return client({
    method,
    url: resource,
    data
  }).then(response => {
    return response.data;
  });
}

export default {
  data () {
    return {
      loading: false,
      resources: [],
      model: {}
    }
  },
  async created () {
    this.refreshResources()
  },
  methods: {
    async refreshResources () {
      this.loading = true
      try {
        this.resources = await execute('get', '/resources');
      }
      catch (err) {
        console.log(err);
      }
      finally{
        this.loading = false
      }
    },
    async populateResourceToEdit (resource) {
      this.model = Object.assign({}, resource)
    },
    async saveResource () {
      try {
        if (this.model.id) {
          await execute('put', `/resources/${this.model.id}`, this.model);
        } else {
          await execute('post', '/resources', this.model);
        }
        this.model = {}
        await this.refreshResources()
      }
      catch (err) {
        console.log(err);
      }
    },
    async deleteResource (id) {
      if (confirm('Are you sure you want to delete this Resource?')) {
        if (this.model.id === id) {
          this.model = {}
        }
        try{
          await execute('delete', `/resources/${id}`)
          await this.refreshResources()
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  }
}
</script>