<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>

    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h3 class="text-2xl font-bold">Event Attendence Chart</h3>
        
        <div class="flex flex-col col-span-2">
          <AttendeesBar
            v-if="!loading && !error"
            :label="labels"
            :chart-data="count"
          ></AttendeesBar>
        </div>

        <!-- Start of loading animation -->
        <div class="mt-40" v-if="loading">
          <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
            Loading...
          </p>
        </div>
        <!-- End of loading animation -->

        <!-- Start of error alert -->
        <div class="mt-12 bg-red-50" v-if="error">
          <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
            {{ error.title }}
          </h3>
          <p class="p-4 text-lg font-bold text-red-900">
            {{ error.message }}
          </p>
        </div>

      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Chart Data in Table -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Event Table Data</h2>
      </div>

      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Count</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in queryData" :key="event._id">
              <td class="p-2 text-left">{{event.eventName}}</td>
              <td class="p-2 text-left">{{event.count}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </main>
</template>

<script>
import axios from "axios";
import AttendeesBar from "@/components/BarChartComponent.vue";
export default {
  components: {
    AttendeesBar
  },
  data() {
    return {
      queryData: [],
      labels: [],
      count: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/eventdata/eventgraph`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.queryData = response.data;
        this.labels = response.data.map((item) => item.eventName);
        this.count = response.data.map((item) => item.count);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>