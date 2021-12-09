<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">
                        Mahsulot sotuvlar soni bo'yicha statistika
                    </h4>
                </div>
            </div>

            <div class="filter-box">
                <el-row :gutter="20">
                    <!-- <el-col :span="12">-</el-col> -->
                    <el-col :span="4">
                        <el-select
                            v-model="filter.sort"
                            placeholder="Soni bo'yicha saralash"
                            @change="changeSort"
                        >
                            <el-option
                                label="Eng ko'p sotilgan"
                                value="countDown"
                            >
                            </el-option>
                            <el-option label="Eng kam sotilgan" value="countUp">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="5"
                        ><div class="search flex" style="margin-right: 15px">
                            <form @submit.prevent="searchProduct">
                                <el-input
                                    placeholder="Izlash"
                                    v-model="filter.search"
                                >
                                    <el-button
                                        slot="append"
                                        type="primary"
                                        icon="el-icon-search"
                                    ></el-button
                                ></el-input>
                            </form>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            @click="clearFilter"
                            type="danger"
                            icon="el-icon-delete"
                            >Tozalash</el-button
                        >
                    </el-col>
                </el-row>
            </div>

            <div v-if="tableData != null">
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nomi</th>
                                <!-- <th>Miqdori</th> -->
                                <th>Sotuv soni</th>
                                <th>Narxi</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                style="border-bottom: 1px solid"
                                v-for="item in tableData"
                                :key="item"
                            >
                                <td>
                                    {{ item.title }}
                                </td>

                                <!-- <td>
                                    {{ item.realcount }}
                                </td> -->
                                <td>{{ item.assign.total }}</td>

                                <td>{{ item.price }} so'm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="pagination">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="length"
                        :page-size="filter.limit"
                        :current-page="filter.page"
                        @current-change="changePagination"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: null,
            filter: {
                page: 1,
                limit: 15,
                search: "",
                sort: "countDown",
            },

            length: 0,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        clearFilter() {
            this.filter.search = "";
            this.filter.sort = "";

            this.getData();
        },
        searchProduct() {
            this.getData();
            this.filter.page = 1;
        },
        async getData() {
            let products = await this.$axios.post("order/filter", this.filter);

            this.filter;
            this.tableData = products.data.data;
            this.length = products.data.count;
        },
        changeSort() {
            this.getData();
            this.filter.page = 1;
        },
        changePagination(page) {
            this.filter.page = page;
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.filter-box {
    margin-bottom: 25px;
}
.flex {
    display: flex;
    align-items: center;
}
</style>
