<template>
    <div id="admin-app">
        <Navbar />
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
    components: {
        Navbar,
    },
};
</script>

<style></style>
