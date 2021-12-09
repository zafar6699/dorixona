<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Mahsulotlar</h4>
                </div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="dialogFormVisible = true">
                        <i class="el-icon-plus"></i> Mahsulot
                        qo'shish</el-button
                    >
                </div>
            </div>

            <div class="filter-box">
                <el-row :gutter="20">
                    <el-col :span="12">-</el-col>
                    <el-col :span="4">
                        <el-select
                            v-model="filter.sort"
                            placeholder="Soni bo'yicha saralash"
                            @change="changeSort"
                        >
                            <el-option label="Eng ko'p sonli" value="countDown">
                            </el-option>
                            <el-option label="Eng kam sonli" value="countUp">
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
                                <th>Kod</th>
                                <th>Miqdori</th>
                                <th>Sotish narxi</th>
                                <th>Joylashgan o'rni</th>
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

                                <td>
                                    {{ item.code }}
                                </td>
                                <td>
                                    {{ parseInt(item.count / item.boxcount) }}
                                    <span v-if="item.count % item.boxcount != 0"
                                        >-</span
                                    >
                                    <span
                                        v-if="item.count % item.boxcount != 0"
                                    >
                                        ({{ item.count % item.boxcount }})
                                    </span>
                                </td>
                                <td>{{ item.price }} so'm</td>
                                <!-- <td>
                                    {{ item.createdAt.slice(0, 10) }}
                                </td> -->
                                <td>
                                    <span v-if="item.sector == ''"> - </span>
                                    <span v-else> {{ item.sector }} </span>
                                </td>
                                <td>
                                    <div class="table-actions">
                                        <router-link
                                            :to="`products/come/` + item._id"
                                        >
                                            <el-button
                                                type="success"
                                                icon="el-icon-download"
                                                size="mini"
                                                plain
                                                class="edit"
                                                >Prixod</el-button
                                            >
                                        </router-link>
                                        <el-button
                                            @click="openModalEdit(item)"
                                            type="primary"
                                            icon="el-icon-edit"
                                            size="mini"
                                            plain
                                            class="edit"
                                        ></el-button>

                                        <el-popconfirm
                                            title="Ma`lumotni o'chirmoqchimisiz?"
                                            confirm-button-text="Ha"
                                            cancel-button-text="Yo'q"
                                            cancel-button-type="danger"
                                            @confirm="confirmDelete(item._id)"
                                        >
                                            <el-button
                                                slot="reference"
                                                type="danger"
                                                icon="el-icon-delete"
                                                size="mini"
                                                plain
                                            ></el-button>
                                        </el-popconfirm>
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
        </el-card>

        <el-dialog title="Mahsulot qo'shish" :visible.sync="dialogFormVisible">
            <el-form
                :model="product"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content">
                            <el-form-item label="Mahsulot nomi" prop="title">
                                <el-input v-model="product.title"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Status" prop="status">
                            <el-switch v-model="product.status"></el-switch>
                        </el-form-item>
                    </el-col>

                    <el-col :span="16">
                        <el-form-item label="Mahsulot raqami" prop="code">
                            <el-input v-model="product.code"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Karobkadagi soni" prop="boxcount">
                            <el-input
                                v-model="product.boxcount"
                                v-mask="'##############'"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Mahsulot joylashgan o'rni">
                            <el-input v-model="product.sector"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"
                    >Bekor qilish</el-button
                >
                <el-button type="success" @click="submitForm('ruleForm')"
                    >Saqlash</el-button
                >
            </span>
        </el-dialog>

        <el-dialog title="Mahsulotni o'zgartirish" :visible.sync="dialogEdit">
            <el-form
                :model="productEdit"
                :rules="rulesEdit"
                ref="ruleFormEdit"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content">
                            <el-form-item label="Mahsulot nomi" prop="title">
                                <el-input
                                    v-model="productEdit.title"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Kassada ko'rsatish" prop="status">
                            <el-switch v-model="productEdit.status"></el-switch>
                        </el-form-item>
                    </el-col>

                    <el-col :span="16">
                        <el-form-item label="Mahsulot raqami" prop="code">
                            <el-input v-model="productEdit.code">
                                <!-- <el-button slot="append" @click="generateCode"
                                    >Kod yaratish</el-button
                                > -->
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Karobkadagi soni" prop="boxcount">
                            <el-input
                                v-model="productEdit.boxcount"
                                v-mask="'##############'"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Mahsulot joylashgan o'rni">
                            <el-input v-model="productEdit.sector"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">Bekor qilish</el-button>
                <el-button type="success" @click="submitEdit('ruleFormEdit')"
                    >O'zgartirish</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
let { remote } = require("electron");
// console.log(process.versions.electron);
const { PosPrinter } = remote.require("electron-pos-printer");
export default {
    data() {
        return {
            search: "",
            dialogFormVisible: false,
            dialogEdit: false,
            tableData: null,

            filter: {
                page: 1,
                limit: 15,
                search: "",
                sort: "countDown",
            },

            length: 0,

            product: {
                title: "",
                code: "",
                boxcount: 1,
                status: true,
                sector: "",
            },
            productEdit: {
                title: "",
                code: "",
                boxcount: 1,
                status: true,
                sector: "",
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                boxcount: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
            },
            rulesEdit: {
                title: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                boxcount: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
            },
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
        changeSort() {
            this.getData();
            this.filter.page = 1;
        },
        generateCode() {
            let timestamp = new Date().getTime();

            this.product.code = timestamp;
        },
        async getData() {
            let products = await this.$axios.post(
                "product/get/products",
                this.filter
            );

            this.filter;
            this.tableData = products.data.data;
            this.length = products.data.count;
        },
        goBack() {
            this.$router.go(-1);
        },
        openModalEdit(item) {
            this.productEdit = item;
            this.dialogEdit = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post("product/create", this.product)
                        .then((res) => {
                            console.log(res);
                            this.product.title = "";
                            this.product.code = "";
                            this.product.boxcount = 1;
                            this.product.sector = "";
                            this.product.status = true;

                            this.getData();
                            this.$message({
                                message: "Mahsulot qo'shildi",
                                type: "success",
                                showClose: true,
                            });

                            this.dialogFormVisible = false;
                        })
                        .catch((err) => {
                            console.log("error->", err);
                            this.$message({
                                message: "Mahsulot mavjud yoki boshqa xatolik",
                                type: "success",
                                showClose: true,
                            });
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submitEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .put(
                            "product/update/" + this.productEdit._id,
                            this.productEdit
                        )
                        .then((res) => {
                            this.getData();
                            this.$message({
                                message: "Mahsulot o'zgartirildi",
                                type: "success",
                                showClose: true,
                            });

                            this.dialogEdit = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // reset form validation
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleEdit(index, row) {
            console.log("index -> ", index);
            console.log("row -> ", row);
        },
        openEdit(id) {
            console.log(id);
        },
        confirmDelete(id) {
            this.$axios.delete(`product/${id}`).then((res) => {
                this.getData();
                this.$message({
                    message: "Ma`lumot o'chirildi",
                    type: "success",
                    showClose: true,
                });
            });
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
    margin-bottom: 30px;
}
.flex {
    display: flex;
    align-items: center;
}
</style>
