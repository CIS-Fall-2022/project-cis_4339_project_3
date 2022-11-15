<template>
    <h1 class="mr-20 text-3xl text-white">
        {{ orgName }}
    </h1>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            orgName: ""
        };
    },
    mounted() {
        let apiURL = import.meta.env.VITE_ROOT_API + `/organizationdata/id`;
        axios.get(apiURL).then((resp) => {
            let data = resp.data;
            this.orgName = data[0].organizationName;
        });
    },
};
</script>