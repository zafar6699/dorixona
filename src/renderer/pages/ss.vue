<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Statistika</h4>
                </div>
            </div>

            <div class="filter-box">
                <el-row :gutter="20">
                    <el-col :span="16"
                        ><div class="grid-content bg-purple"></div
                    ></el-col>
                    <el-col :span="8"
                        ><div class="grid-content bg-purple"></div
                    ></el-col>
                </el-row>
            </div>
            <div v-if="tableData != null">
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Sana</th>
                                <th>Soni</th>
                                <th>Summa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData" :key="item">
                                <td>
                                    {{ item._id }}
                                </td>
                                <td>
                                    {{ item.count }}
                                </td>
                                <td>{{ item.sum }} so'm</td>
                                <td>
                                    <div class="table-actions">
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
                                    </div>
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
                        :page-size="20"
                        :current-page="page"
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
            length: 0,
            page: 1,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            let statistics = await this.$axios.get(
                `statistic/all?page=${this.page}`
            );
            this.tableData = statistics.data.data;
            this.length = products.data.count;
        },
        changePagination(page) {
            this.page = page;
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
}
</style>
