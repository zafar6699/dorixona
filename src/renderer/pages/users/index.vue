<template>
    <div class="category">
        <el-card class="box-card">
            <el-dialog
                title="
                        Foydalanuvchi o'zgartirish
                "
                :visible.sync="isModalEdit"
            >
                <el-form
                    :model="userEdit"
                    :rules="rulesEdit"
                    ref="userEdit2"
                    class="demo-ruleForm"
                >
                    <div class="form">
                        <div class="col-3">
                            <el-form-item label="F.I.O" prop="name">
                                <el-input v-model="rulesEdit.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item label="Login" prop="login">
                                <el-input v-model="rulesEdit.login"></el-input>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item
                                label="Foydalanuvchini tanlang"
                                prop="region"
                            >
                                <el-select
                                    v-model="rulesEdit.role"
                                    placeholder="Rol"
                                >
                                    <el-option
                                        label="Admin"
                                        value="admin"
                                    ></el-option>
                                    <el-option
                                        label="Moderator"
                                        value="manager"
                                    ></el-option>
                                    <el-option
                                        label="Sotuvchi"
                                        value="vendor"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item label="Parol" prop="password">
                                <el-input
                                    type="password"
                                    v-model="rulesEdit.password"
                                    show-password
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="title-box-top">
                    <div class="title-top-left"></div>

                    <div class="title-box-right flex">
                        <el-button
                            type="success"
                            @click="saveEdit('userEdit2')"
                        >
                            Saqlash</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="
                    Foydalanuvchi qo'shish
                "
                :visible.sync="dialogTableVisible"
            >
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleCreate"
                    class="demo-ruleForm"
                >
                    <div class="form">
                        <div class="col-3">
                            <el-form-item label="F.I.O" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item label="Login" prop="login">
                                <el-input v-model="ruleForm.login"></el-input>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item
                                label="Foydalanuvchini tanlang"
                                prop="role"
                            >
                                <el-select
                                    v-model="ruleForm.role"
                                    placeholder="Foydalanuvchini tanlang"
                                >
                                    <el-option
                                        label="Admin"
                                        value="admin"
                                    ></el-option>
                                    <el-option
                                        label="Moderator"
                                        value="manager"
                                    ></el-option>
                                    <el-option
                                        label="Sotuvchi"
                                        value="vendor"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="col-3">
                            <el-form-item label="Parol" prop="password">
                                <el-input
                                    type="password"
                                    v-model="ruleForm.password"
                                    show-password
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="title-box-top">
                    <div class="title-top-left"></div>

                    <div class="title-box-right flex">
                        <el-button
                            type="success"
                            @click="createUser('ruleCreate')"
                        >
                            Saqlash</el-button
                        >
                    </div>
                </div>
            </el-dialog>

            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Foydalanuvchi</h4>
                </div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="openModalAdd">
                        <i class="el-icon-plus"></i> Foydalanuvchi
                        qo'shish</el-button
                    >
                </div>
            </div>
            <table v-if="tableData != null">
                <thead>
                    <tr>
                        <th>F.I.O</th>
                        <th>Login</th>
                        <th>Foydalanuvchi turi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style="border-bottom: 1px solid"
                        v-for="item in tableData"
                        :key="item"
                    >
                        <td>
                            <div class="name"></div>
                            {{ item.name }}
                        </td>
                        <td>
                            <div class="name"></div>
                            {{ item.login }}
                        </td>
                        <td>
                            <span v-if="item.role == 'admin'"> Admin </span>
                            <span v-if="item.role == 'manager'"> Manager </span>
                            <span v-if="item.role == 'seller'"> Sotivchi </span>
                        </td>
                        <td>
                            <div class="table-actions">
                                <!-- <el-button
                                    @click="openModalEdit(item)"
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    plain
                                    class="edit"
                                ></el-button> -->
                                <!-- 
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
                                </el-popconfirm> -->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: "",
                login: "",
                role: "admin",
                password: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "Loginni kiriting",
                        trigger: "blur",
                    },
                ],
                login: [
                    {
                        required: true,
                        message: "Loginni kiriting",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "Parolni kiriting",
                        trigger: "blur",
                    },
                ],
            },

            userEdit: {
                name: "",
                login: "",
                role: "admin",
                password: "",
            },

            rulesEdit: {
                name: [
                    {
                        required: true,
                        message: "Loginni kiriting",
                        trigger: "blur",
                    },
                ],
                login: [
                    {
                        required: true,
                        message: "Loginni kiriting",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "Parolni kiriting",
                        trigger: "blur",
                    },
                ],
            },

            user: "",
            dialogTableVisible: false,
            isModalEdit: false,
            tableData: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        openModalAdd() {
            this.dialogTableVisible = true;
        },
        async openModalEdit(id) {
            this.isModalEdit = true;
            this.editId = id;
        },
        async getData() {
            let category = await this.$axios.get("auth/all");
            this.tableData = category.data.data;
            console.log("qani", this.tableData);
        },

        saveEdit(formName) {},
        async createUser(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.$axios
                        .post("auth/create", this.ruleForm)
                        .then((res) => {
                            this.dialogTableVisible = false;
                            this.getData();
                            this.ruleForm.name = "";
                            this.ruleForm.login = "";
                            this.ruleForm.password = "";
                            this.ruleForm.role = "admin";
                            this.$message({
                                message: "Foydalanuvchi qo'shildi",
                                type: "success",
                            });
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async edit() {
            this.name = this.ruleForm.name;
            let name = await this.$axios
                .put("user/" + this.editId, { name: this.name })
                .then((res) => {
                    this.isModalEdit = false;
                    this.getData();
                    this.ruleForm.name = "";
                    this.$message({
                        message: "Foydalanuvchi o'zgartirildi",
                        type: "success",
                    });
                });
        },
        async confirmDelete(id) {
            await this.$axios.delete("user/" + id).then((res) => {
                this.getData();
                this.name = "";
                this.$message({
                    message: "Foydalanuvchi o'chirildi",
                    type: "success",
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.category {
    .form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .col-3 {
            width: calc((100% - 20px) / 2);
            .el-select {
                width: 100%;
            }
        }
    }
    .title-box-top {
        margin-bottom: 0;
    }
    table {
        width: 100%;
        border-spacing: 0;
        thead {
            tr {
                th {
                    text-align: left;
                    padding: 12px 10px;
                    border-bottom: 1px solid #ebeef5 !important;
                    color: #909399;
                }
            }
        }
        tbody {
            tr {
                padding: 0 10px;
                td {
                    border-bottom: 1px solid #ebeef5;
                    padding: 12px 10px;
                }
                .table-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .edit {
                        margin-right: 5px;
                    }
                }
                &:hover {
                    background-color: #f5f7fa;
                }
            }
        }
    }
}
</style>
