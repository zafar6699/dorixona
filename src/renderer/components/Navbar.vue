<template>
    <div>
        <div class="left-navbar">
            <div class="nav-logo">
                <h2 class="logo-title">Ushop</h2>
            </div>

            <div class="nav-menu">
                <el-menu class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <router-link
                            router-link-exact-active
                            exact
                            :to="{ name: 'index' }"
                        >
                            <span class="icon-menu">
                                <i class="el-icon-s-home"></i>
                            </span>
                            <span>Dashboard</span>
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link
                            router-link-exact-active
                            :to="{ name: 'products' }"
                        >
                            <span class="icon-menu">
                                <i class="el-icon-box"></i>
                            </span>
                            <span>Mahsulotlar</span>
                        </router-link>
                    </el-menu-item>

                    <el-submenu index="1">
                        <template slot="title">
                            <span class="icon-menu">
                                <i class="el-icon-s-data"></i>
                            </span>
                            <span>Statistika</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link
                                    router-link-exact-active
                                    :to="{ name: 'statistics-salecount' }"
                                >
                                    Sotuvlar soni
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="1-1">
                                <router-link
                                    router-link-exact-active
                                    :to="{ name: 'statistics-byday' }"
                                >
                                    Kunlik sotuvlar
                                </router-link>
                            </el-menu-item>

                            <!-- <el-menu-item index="1-3">
                                <router-link
                                    router-link-router-link-exact-active-link
                                    :to="{ name: 'users-client' }"
                                >
                                    Clients
                                </router-link>
                            </el-menu-item> -->
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="4">
                        <router-link
                            router-link-exact-active
                            :to="{ name: 'users' }"
                        >
                            <span class="icon-menu">
                                <i class="el-icon-user"></i>
                            </span>
                            <span>Foydalanuvchilar</span>
                        </router-link>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <header>
            <div class="header-inner">
                <div class="header-left">
                    <el-button
                        icon="el-icon-back"
                        @click="$router.go(-1)"
                        circle
                    ></el-button>
                </div>

                <router-link :to="{ name: 'cash' }">Kassa</router-link>

                <div class="header-right">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ $store.state.user.name }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user"
                                >Profile</el-dropdown-item
                            >
                            <el-dropdown-item icon="el-icon-s-tools"
                                >Settings</el-dropdown-item
                            >
                            <span> </span>
                            <el-button
                                @click="logOut"
                                class="danger-text"
                                icon="el-icon-switch-button"
                                >Log out</el-button
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
        };
    },
    methods: {
        async logOut() {
            await this.$store.dispatch("logOut");
            this.$router.push("/login");
        },
        async logOut2() {
            await this.$store.dispatch("logOut");
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickScreen() {
            let elem = document.getElementById("admin-app");
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        },
    },
};
</script>

<style lang="scss">
.header-left {
    a {
        font-size: 28px;
        color: #000;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
