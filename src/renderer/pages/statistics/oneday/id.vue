<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">{{ $route.params.id }}</h4>
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
                                <th>Sotuv nomeri</th>
                                <th>Mahsulotlar soni</th>
                                <th>Summa</th>
                                <th>Vaqti</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData" :key="item">
                                <td>
                                    {{ item.order }}
                                </td>
                                <td>{{ item.product.length }}</td>
                                <td>{{ item.price }} so'm</td>
                                <td>
                                    {{ item.createdAt.slice(0, 10) }}
                                    -
                                    {{ item.createdAt.substr(11, 5) }}
                                </td>

                                <td>
                                    <div class="table-actions">
                                        <el-button
                                            @click="openFull(item)"
                                            type="primary"
                                            icon="el-icon-view"
                                            size="mini"
                                            plain
                                            class="edit"
                                        ></el-button>
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
                        :page-size="filter.limit"
                        :current-page="filter.page"
                        @current-change="changePagination"
                    >
                    </el-pagination>
                </div>
            </div>

            <el-dialog
                title="Mahsulotlar"
                width="900px"
                :visible.sync="viewFull"
            >
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nomi</th>
                                <th>Soni</th>
                                <th>Narxi</th>
                                <th>Summa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in viewProducts" :key="item">
                                <td class="tit-name-modal">
                                    {{ item.title }}
                                </td>

                                <td>
                                    {{ item.realcount }}
                                </td>
                                <td>{{ item.price }} so'm</td>
                                <td>{{ item.price * item.realcount }} so'm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </el-dialog>
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
                day: "",
            },

            length: 0,
            viewFull: false,
        };
    },

    async mounted() {
        this.filter.day = this.$route.params.id;
        this.getData();
    },

    methods: {
        async getData() {
            let statistics = await this.$axios.post(
                `statistic/oneday`,
                this.filter
            );
            this.tableData = statistics.data.data;
            this.length = statistics.data.count;
        },
        changePagination(page) {
            this.filter.page = page;
            this.getData();
        },
        openFull(item) {
            this.viewProducts = item.product;
            this.viewFull = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
}
.tit-name-modal {
    width: 300px;
}
</style>
