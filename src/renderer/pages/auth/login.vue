<template>
    <div>
        <div class="login-page">
            <div class="login-form">
                <h3>Kirish</h3>

                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm"
                >
                    <div class="form">
                        <el-form-item label="Login" prop="login">
                            <el-input v-model="ruleForm.login"></el-input>
                        </el-form-item>

                        <el-form-item label="Password" prop="password">
                            <el-input
                                type="password"
                                v-model="ruleForm.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >Kirish</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            ruleForm: {
                login: "",
                password: "",
            },
            rules: {
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
        };
    },
    async mounted() {},
    methods: {
        ...mapActions(["login"]),
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.login(this.ruleForm);

                    // if (this.$store.state.user.role == "vendor") {
                    //     this.$router.push({ name: "cash" });
                    // } else {
                    this.$router.push("/");
                    // }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.login-page {
    width: 100%;
    height: 100vh;
    background: #d2d6de;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
        width: 360px;
        border-radius: 5px;
        background: #fff;
        padding: 20px;
        .el-form-item {
            margin-bottom: 10px !important;
            button {
                width: 100%;
            }
        }
        h3 {
            text-align: center;
            margin-bottom: 20px;
        }
        .form {
            margin-bottom: 20px;
        }
    }
}
</style>
