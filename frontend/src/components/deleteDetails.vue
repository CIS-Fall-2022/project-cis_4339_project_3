<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Delete Event Details</h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Event Information</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
<!--              <span style="color:#ff0000">*</span>-->
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.eventName"
              />
<!--              <span class="text-black" v-if="v$.event.eventName.$error">-->
<!--                <p-->
<!--                  class="text-red-700"-->
<!--                  v-for="error of v$.event.eventName.$errors"-->
<!--                  :key="error.$uid"-->
<!--                >{{ error.$message }}!</p>-->
<!--              </span>-->
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
<!--              <span style="color:#ff0000">*</span>-->
              <!-- Disabled the input box -->
              <input disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
                type="date"
              />
<!--              <span class="text-black" v-if="v$.event.date.$error">-->
<!--                <p-->
<!--                  class="text-red-700"-->
<!--                  v-for="error of v$.event.date.$errors"-->
<!--                  :key="error.$uid"-->
<!--                >{{ error.$message }}!</p>-->
<!--              </span>-->
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <!-- Disabled the text box -->
              <textarea disabled
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col grid-cols-3">
            <label>Services Offered at Event</label>
            <div>
              <label for="familySupport" class="inline-flex items-center">
              <!-- Disabled the checkbox -->
                <input
                  type="checkbox" disabled
                  id="familySupport"
                  value="Family Support"
                  v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <!-- Removed the "notchecked" parameter -->
                <span class="ml-2">Family Support</span>
              </label>
            </div>
            <div>
              <label for="adultEducation" class="inline-flex items-center">
                <!-- Disabled the checkbox -->
                <input
                  type="checkbox" disabled
                  id="adultEducation"
                  value="Adult Education"
                  v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <!-- Removed the "notchecked" parameter -->
                <span class="ml-2">Adult Education</span>
              </label>
            </div>
            <div>
              <label for="youthServices" class="inline-flex items-center">
                <!-- Disabled the checkbox -->
                <input
                  type="checkbox" disabled
                  id="youthServices"
                  value="Youth Services Program"
                  v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <!-- Removed the "notchecked" parameter -->
                <span class="ml-2">Youth Services Program</span>
              </label>
            </div>
            <div>
              <label for="childhoodEducation" class="inline-flex items-center">
                <!-- Disabled the checkbox -->
                <input
                  type="checkbox" disabled
                  id="childhoodEducation"
                  value="Early Childhood Education"
                  v-model="checkedServices"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <!-- Removed the "notchecked" parameter -->
                <span class="ml-2">Early Childhood Education</span>
              </label>
            </div>
          </div>
        </div>

        <!-- grid container -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Address</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line1"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line2"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.city"
              />
            </label>
          </div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.county"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <!-- Disabled the input box -->
              <input
                type="text" disabled
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.zip"
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div class="grid grid-cols-2   ">
          <div class="flex justify-end mt-10 mr-20">
            <button
              @click="deleteEvent"
              type="submit"
              class="bg-red-700 text-white rounded"
            >DELETE Event</button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 text-black rounded"
              @click="$router.go(-1)"
            >Go back</button>
          </div>
        </div>



        <!-- grid container -->
        <h3 class="italic text-center">All attendees must be removed before event can be deleted</h3>
        <hr class="mt-10 mb-10" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to delete an attendee from event</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">Phone Number</th>
                  <th class="p-4 text-left">City</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr
                  v-for="client in attendeeData"
                  :key="client._id"
                >
                  <td
                    class="p-2 text-left"
                  >{{ client.attendeeFirstName + " " + client.attendeeLastName }}</td>
                  <td class="p-2 text-left">{{ client.attendeePhoneNumber }}</td>
                  <td class="p-2 text-left">{{ client.attendeeCity }}</td>
                  <td><button
                      class="border border-red-700 bg-yellow-300 text-black rounded p-1"
                      @click="removeClient(client.attendeeID)"
                      Type="submit"
                  >Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, alpha, numeric } from "@vuelidate/validators";
import axios from "axios";
import { DateTime } from "luxon";

export default {
  props: ["id"],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },
  data() {
    return {
      attendeeIDs: [],
      attendeeData: [],
      checkedServices: [],
      event: {
        eventName: "",
        services: [],
        date: "",
        address: {
          line1: "",
          line2: "",
          city: "",
          county: "",
          zip: "",
        },
        description: "",
      },
    };
  },
  beforeMount() {
    axios
      .get(
        import.meta.env.VITE_ROOT_API + `/eventdata/id/${this.$route.params.id}`
      )
      .then((resp) => {
        let data = resp.data[0];
        this.event.eventName = data.eventName;
        console.log(data.date);
        this.event.date = DateTime.fromISO(data.date).plus({ days: 1 }).toISODate();
        this.event.description = data.description;
        this.checkedServices = data.services;
        this.event.address = data.address;
        this.attendeeIDs = data.attendees;
        for (let i = 0; i < this.attendeeIDs.length; i++) {
          axios
            .get(
              import.meta.env.VITE_ROOT_API +
                `/primarydata/id/${this.attendeeIDs[i]}`
            )
            .then((resp) => {
              let data = resp.data[0];
              this.attendeeData.push({
                attendeeID: this.attendeeIDs[i],
                attendeeFirstName: data.firstName,
                attendeeLastName: data.lastName,
                attendeeCity: data.address.city,
                attendeePhoneNumber: data.phoneNumbers.primaryPhone,
              });
            });
        }
      });
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    // added delete event method
    deleteEvent() {
      this.event.services = this.checkedServices;
      let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/${this.id}`;
      let lenArray = this.attendeeIDs;
      if (lenArray.length === 0) {
        axios.delete(apiURL, this.event).then(() => {
          alert("Event has been deleted.");
          this.$router.back().catch((error) => {
            console.log(error);
          });
        });
      } else {
        let text = "All clients must be removed before Event can be deleted.";
        if (alert(text) == true) {
          this.$router.go()
        }
      }
    },
    editClient(clientID) {
      this.$router.push({ name: "updateclient", params: { id: clientID } });
    },
    // added function to remove attendees from event
    removeClient(clientID) {
      let text = "Are you sure you want to remove this client from this event?\n\nClick OK to delete or Cancel to go back.";
      if (confirm(text) == true) {
        const apiURL = import.meta.env.VITE_ROOT_API + `/eventData/deleteAttendee/${this.id}/${clientID}`;
        axios.put(apiURL).then(this.$router.go(-1)); // this will refresh the page to show the client was removed from event list
      }
    },
  },
  // sets validations for the various data properties
  validations() {
    return {
      event: {
        eventName: { required },
        date: { required },
      },
    };
  },
};
</script>