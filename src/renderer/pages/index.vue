<template>
    <div v-if="dashboard != null">
        <div class="admin">
            <div class="cards flex">
                <div class="card c1">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ dashboard.product }}</h1>
                            <span>Mahsulotlar</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c2">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ dashboard.thisDayProduct }}</h1>
                            <span>Sotilgan mahsulotlar</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c3">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ dashboard.orderThisDay }}</h1>
                            <span> Sotuvlar </span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c4">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ dashboard.thisDaySum }}</h1>
                            <span> Umimiy summa </span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
        </div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Sotuvlar</h4>
                </div>
            </div>

            <div>
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Raqami</th>
                                <th>To'lov turi</th>
                                <th>Summa</th>
                                <th>Vaqti</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in dashboard.orders" :key="item">
                                <td>
                                    {{ item.order }}
                                </td>
                                <td>
                                    <span v-if="item.payType == 1"> Naqd </span>
                                    <span v-else> Plastik karta </span>
                                </td>
                                <td>
                                    {{ item.price }}
                                </td>
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
                        :total="10"
                        :page-size="limit"
                        :current-page="page"
                        @current-change="changePagination"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <el-dialog title="Sotuvdagi mahsulotlar" :visible.sync="viewFull">
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th>Nomi</th>
                            <th>Olish narxi</th>
                            <th>Sotish narxi</th>
                            <th>Miqdori</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in viewProducts" :key="item">
                            <td>
                                {{ item.title }}
                            </td>

                            <td>
                                {{ item.perPrice }}
                            </td>
                            <td>
                                {{ item.price }}
                            </td>
                            <td>{{ item.count }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    layout: "admin",
    data() {
        return {
            dashboard: null,
            viewProducts: null,
            page: 1,
            limit: 10,
            viewFull: false,
        };
    },

    async mounted() {
        let dashboard = await this.$axios.get("dashboard/all");
        this.dashboard = dashboard.data;
    },
    methods: {
        changePagination() {},
        openFull(item) {
            this.viewProducts = item.product;
            this.viewFull = true;
        },
    },
};
</script>

<style lang="scss">
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin {
    margin-top: 10px;
    margin-bottom: 20px;
    .info {
        margin-bottom: 20px;
    }
    .card {
        border-radius: 5px;
        padding: 15px;
        width: calc((100% - 80px) / 4);
        .top {
            .stat {
                h1 {
                    margin: 0 !important;
                    color: #fff;
                    font-size: 38px;
                }
                span {
                    color: #fff;
                }
            }
        }
    }
    .c1 {
        background-color: #00c0ef !important;
    }
    .c2 {
        background-color: #00a65a !important;
    }
    .c3 {
        background-color: #f39c12 !important;
    }
    .c4 {
        background-color: #dd4b39 !important;
    }
}
</style>
