<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      organization: {
        organizationName: "",
      },
    };
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate();
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        let apiURL = import.meta.env.VITE_ROOT_API + `/organizationdata`;
        axios
          .post(apiURL, this.organization)
          .then(() => {
            alert("Organization has been successfully added.");
            this.$router.push("/findorganization");
            this.organization = {
              organizationName: "",
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // sets validations for the various data properties
  // Removed phone number array since there is only one phone number per field.
  // Each phone field will be treated separately
  validations() {
    return {
      organization: {
        organizationName: { required },
      },
    };
  },
};
</script>
<template>
  <main>
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Organization Intake Form</h1>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.passive="handleSubmitForm">
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Organization Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Organization Name</span>
              <span style="color:#ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="organization.organizationName"
              />
              <span class="text-black" v-if="v$.organization.organizationName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.organization.organizationName.$errors"
                  :key="error.$uid"
                >{{ error.$message }}!</p>
              </span>
            </label>
          </div>

          <!-- submit button -->
          <div class="flex justify-between mt-5 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">Add Organization</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
