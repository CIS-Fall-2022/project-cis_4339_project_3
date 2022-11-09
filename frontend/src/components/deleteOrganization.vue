<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Delete Organization</h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Organization</h2>
        <!-- Displays the Organization Name search field -->
        <div class="flex flex-col" >
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="organizationName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter organization name"
            />
          </label>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >Clear Search</button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >Search Organization</button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Organization List</h2>
      </div>
      <div class="flex flex-col col-span-1">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Name</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="organization in queryData" :key="organization._id">
              <td class="p-2 text-left">{{ organization.organizationName}}</td>
              <td><button
                  class="bg-red-700 text-white rounded p-1"
                  @click="deleteOrganization(organization._id)"
                  Type="submit"
              >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      queryData: [],
      organizationName: "",
    };
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/organizationdata/`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    window.scrollTo(0, 0);
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "";
      apiURL = import.meta.env.VITE_ROOT_API +
              `/organizationdata/search/?organizationName=${this.organizationName}&searchBy=name`;
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    clearSearch() {
      //Resets all the variables
      this.organizationName = "";

      //get all entries
      let apiURL = import.meta.env.VITE_ROOT_API + `/organizationdata/`;
      axios.get(apiURL).then((resp) => {
        this.queryData = resp.data;
      });
    },
    // added function to delete organization
    deleteOrganization(organizationID) {
      let text = "Are you sure you want to delete this Organization?\n\nClick OK to delete or Cancel to go back.";
      if (confirm(text) == true) {
        const apiURL = import.meta.env.VITE_ROOT_API + `/organizationdata/` + organizationID;
        axios.delete(apiURL).then(this.$router.go()); // this will refresh the page to show the client was deleted
      }
    },
  },
};
</script>