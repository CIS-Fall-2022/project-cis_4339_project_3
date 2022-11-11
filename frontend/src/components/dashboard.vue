<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <h3>Bar Chart - Receiving Data from backend</h3>
        <div>
          <div>
            <EnrollmentBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="count"
            ></EnrollmentBar>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
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
        <div>
<table>
    <thead class="thead-dark">
                  <tr>
                      <th>Event Name</th>
                      <th>Count</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="label in labels" :key="label">
                      <td>{{labels}}</td>
                      <td>{{count}}</td>
                  </tr>
              </tbody>
</table>
</div>
  </main>
</template>
<script>
import axios from "axios";
import EnrollmentBar from "@/components/BarChartComponent.vue";

export default {
  components: {
    EnrollmentBar
  },
  data() {
    return {
      eventName: [],
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

<style>

table, th, td {
  border: 1px solid;
}

</style>
