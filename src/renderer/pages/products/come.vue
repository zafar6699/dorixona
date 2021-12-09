<template>
    <div v-if="one != null">
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">{{ one.title }} - {{ one.code }}</h4>
                </div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="dialogFormVisible = true">
                        <i class="el-icon-plus"></i> Prixod</el-button
                    >
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

            <div class="table">
                <table v-if="tableData != null">
                    <thead>
                        <tr>
                            <th>Olish narxi(so'm)</th>
                            <th>Sotish narxi(so'm)</th>
                            <th>Turi</th>
                            <th>Soni</th>
                            <th>Vaqti</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style="border-bottom: 1px solid"
                            v-for="item in tableData"
                            :key="item"
                        >
                            <td>{{ item.perPrice }}</td>
                            <td>{{ item.price }}</td>
                            <td>
                                <span v-if="item.size == 1"> Kilogramm </span>
                                <span v-if="item.size == 2"> Dona </span>
                            </td>
                            <td>
                                {{ item.count }}
                            </td>
                            <td>
                                {{ item.createdAt.slice(0, 10) }}
                            </td>
                            <td>
                                <div class="table-actions">
                                    <el-button
                                        @click="openModalEdit(item)"
                                        type="primary"
                                        icon="el-icon-edit"
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
                    :total="556"
                    :page-size="limit"
                    :current-page="page"
                    @current-change="changePagination"
                >
                </el-pagination>
            </div>
        </el-card>

        <el-dialog title="Prixod qo'shish" :visible.sync="dialogFormVisible">
            <el-form
                :model="come"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="Olish narxi" prop="perPrice">
                                <el-input
                                    placeholder="Narxni kiriting"
                                    v-model="come.perPrice"
                                >
                                    <template slot="append">so'm</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Miqdori" prop="count">
                                <el-input-number
                                    v-model="come.count"
                                    :min="1"
                                ></el-input-number>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Sotish narxi" prop="price">
                            <el-input
                                placeholder="Narxni kiriting"
                                v-model="come.price"
                            >
                                <template slot="append">so'm</template>
                            </el-input>
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

        <el-dialog title="Prixodni o'zgartirish" :visible.sync="dialogEdit">
            <el-form
                :model="comeEdit"
                :rules="rules2"
                ref="ruleForm2"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="Olish narxi" prop="perPrice">
                                <el-input
                                    placeholder="Narxni kiriting"
                                    v-model="comeEdit.perPrice"
                                >
                                    <template slot="append">so'm</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item label="Miqdori" prop="count">
                                <el-input-number
                                    v-model="comeEdit.count"
                                    :min="1"
                                ></el-input-number>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Sotish narxi" prop="price">
                            <el-input
                                placeholder="Narxni kiriting"
                                v-model="comeEdit.price"
                            >
                                <template slot="append">so'm</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">Bekor qilish</el-button>
                <el-button type="success" @click="editForm('ruleForm2')"
                    >O'zgartirish</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: "",
            activeName: "first",
            dialogFormVisible: false,
            dialogEdit: false,
            page: 1,
            limit: 10,
            product: null,

            tableData: null,
            one: null,

            comeEdit: {},

            come: {
                product: "",
                perPrice: "",
                price: "",
                count: 1,
            },
            rules: {
                perPrice: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                count: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
            },
            rules2: {
                perPrice: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                count: [
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
        let one = await this.$axios.get("product/one/" + this.$route.params.id);
        this.one = one.data.data;

        this.come.product = this.one._id;
        this.getData();
    },

    methods: {
        async getData() {
            let comes = await this.$axios.get(
                "product/prixod/one/" + this.$route.params.id
            );
            this.tableData = comes.data.data;

            if (this.tableData.length) {
                this.come.perPrice = this.tableData[0].perPrice;
                this.come.price = this.tableData[0].price;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        openModalEdit(item) {
            this.comeEdit = item;
            this.dialogEdit = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post(
                            "product/prixod/create/" + this.one._id,
                            this.come
                        )
                        .then((res) => {
                            this.come.perPrice = "";
                            this.come.price = "";
                            this.come.count = 1;
                            this.getData();
                            this.$message({
                                message: "Mahsulot qo'shildi",
                                type: "success",
                                showClose: true,
                            });

                            this.$router.push({ name: "products" });
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        editForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .put(
                            "product/prixod/update/" + this.comeEdit._id,
                            this.comeEdit
                        )
                        .then((res) => {
                            this.comeEdit.perPrice = "";
                            this.comeEdit.product = "";
                            this.comeEdit.price = "";
                            this.comeEdit.count = 1;
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
            this.page = page;
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
