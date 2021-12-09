<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Barcha sotuvlar (kunlik)</h4>
                </div>
            </div>
            <div class="filter-box">
                <el-row :gutter="20">
                    <!-- <el-col :span="12">-</el-col> -->
                    <el-col :span="6"> - </el-col>
                    <el-col :span="12">
                        <div class="block">
                            <el-date-picker
                                v-model="date"
                                type="daterange"
                                @change="changeSort"
                                align="right"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                unlink-panels
                                range-separator="dan gacha"
                                start-placeholder="Boshlang'ich sana"
                                end-placeholder="Tugash sana"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
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
                                <th>Sana</th>
                                <th>Sotuvlar soni</th>
                                <th>Summa</th>
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
                                    {{ item._id }}
                                </td>

                                <!-- <td>
                                    {{ item.realcount }}
                                </td> -->
                                <td>{{ item.count }}</td>

                                <td>{{ item.sum }} so'm</td>
                                <td>
                                    <router-link
                                        :to="{
                                            name: `statistics-oneday-id`,
                                            params: { id: item._id },
                                        }"
                                    >
                                        <el-button
                                            type="primary"
                                            icon="el-icon-view"
                                            size="mini"
                                            plain
                                            class="edit"
                                        ></el-button>
                                    </router-link>
                                </td>
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
            },

            length: 0,

            pickerOptions: {
                shortcuts: [
                    {
                        text: "Haftalik",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "1 oylik",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "3 oylik",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            date: "",
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        clearFilter() {
            this.date = "";

            this.getData();
        },
        searchProduct() {
            this.getData();
            this.filter.page = 1;
        },
        async getData() {
            let products = await this.$axios.post("statistic/orders", {
                page: this.filter.page,
                limit: this.filter.limit,
                start: this.date[0],
                end: this.date[1],
            });

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
