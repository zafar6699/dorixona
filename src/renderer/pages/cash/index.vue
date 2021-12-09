<template>
    <div class="cash">
        <div class="container-full">
            <div class="cash-title">
                <!-- <el-button
                    v-if="$store.state.user.role != 'vendor'"
                    @click="$router.go(-1)"
                    icon="el-icon-back"
                >
                    Orqaga</el-button
                > -->
                <el-button @click="$router.go(-1)" icon="el-icon-back">
                    Orqaga</el-button
                >

                <el-button icon="el-icon-user">{{
                    $store.state.user.name
                }}</el-button>
            </div>
            <div class="cash-box">
                <div class="cash-left" @click="clickSearchCode">
                    <div class="cash-top-title">
                        <form @submit.prevent="searchProduct">
                            <div class="cash-search">
                                <input
                                    placeholder="Maxsulot kodi"
                                    type="text"
                                    id="searchInput"
                                    @blur="outFocus"
                                    v-model="code"
                                    autofocus
                                />
                                <!-- <button class="but but-primary">Izlash</button> -->
                            </div>
                        </form>
                        <div class="time">
                            <h6>{{ clock }}</h6>
                            <h5>{{ date }}</h5>
                        </div>
                    </div>

                    <div class="table-products">
                        <table cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Nomi</th>
                                    <th>Miqdori</th>
                                    <th>Summasi</th>
                                    <th>Umumiy</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in payProduct"
                                    :key="index"
                                    :class="item.count == 0 ? 'notcount' : ''"
                                >
                                    <td class="title">{{ item.title }}</td>
                                    <td>
                                        <span v-if="item.dona == 0">
                                            {{ item.count }}
                                        </span>
                                        <span v-else>
                                            {{ item.count }} - ({{ item.dona }})
                                            / {{ item.boxcount }}
                                        </span>
                                    </td>
                                    <td>{{ item.price }}</td>
                                    <td>
                                        <span>
                                            {{
                                                (
                                                    parseInt(
                                                        item.count * item.price
                                                    ) +
                                                    parseFloat(
                                                        (item.dona *
                                                            item.price) /
                                                            item.boxcount
                                                    )
                                                ).toFixed(2)
                                            }}
                                        </span>
                                    </td>
                                    <td>
                                        <el-button
                                            @click="editProduct(item)"
                                            size="small"
                                            type="success"
                                            icon="el-icon-edit"
                                            circle
                                        ></el-button>
                                        <el-button
                                            @click="deleteProduct(index)"
                                            size="small"
                                            type="danger"
                                            icon="el-icon-delete"
                                            circle
                                        ></el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="cash-right" @click="clickSearchText">
                    <div class="input-right">
                        <input
                            type="text"
                            placeholder="Mahsulot nomi yoki kodi"
                            id="isSearchText"
                            v-model="search"
                            @keyup="searchText"
                        />
                    </div>

                    <div class="right-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nomi</th>
                                    <th>Qolgan soni</th>
                                    <th>O'rni</th>
                                    <th>Summa</th>
                                </tr>
                            </thead>
                            <tbody v-if="rightProduct.length > 0">
                                <tr
                                    v-for="(item, index) in rightProduct"
                                    :key="index"
                                    @click="findProduct(item)"
                                >
                                    <td class="tit-name">
                                        {{ item.title }}
                                    </td>
                                    <td>
                                        {{
                                            parseInt(item.count / item.boxcount)
                                        }}
                                        <span
                                            v-if="
                                                item.count % item.boxcount != 0
                                            "
                                            >-</span
                                        >
                                        <span
                                            v-if="
                                                item.count % item.boxcount != 0
                                            "
                                        >
                                            ({{ item.count % item.boxcount }})
                                        </span>
                                    </td>
                                    <td>
                                        <span v-if="item.sector == ''">
                                            -
                                        </span>
                                        <span v-else> {{ item.sector }} </span>
                                    </td>
                                    <td>{{ item.price }} so'm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            width="550px"
            title="Tasdiqlash"
            :visible.sync="dialogTableVisible"
        >
            <div slot="footer" class="dialog-footer">
                <div class="modal-price">
                    <h5>Jami:</h5>
                    <h4>{{ allSum }}</h4>
                </div>

                <div>
                    <el-button @click="dialogTableVisible = false"
                        >Bekor qilish</el-button
                    >
                    <el-button
                        id="confirmOrder"
                        type="success"
                        @click="confirmOrder"
                        >Tasdiqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>

        <el-dialog
            title="Mahsulot miqdorini kiriting"
            :visible.sync="dialogKilo"
            width="400px"
        >
            <div class="input-kilo">
                <h2 class="pr-title">{{ kiloProduct.title }}</h2>
                <h4>
                    Qolgan:
                    {{ parseInt(kiloProduct.max / kiloProduct.boxcount) }}
                    <span v-if="kiloProduct.max % kiloProduct.boxcount != 0">
                        ({{ kiloProduct.max % kiloProduct.boxcount }})
                    </span>
                </h4>
                <h4 class="pr-gram">Karobka soni</h4>
                <input
                    v-model="kiloProduct.count"
                    type="number"
                    min="0"
                    id="boxcount"
                    ref="kil"
                    @keyup="keyupBox"
                />
                <div v-if="kiloProduct.boxcount != 1">
                    <h4 class="pr-gram">Donadagi soni</h4>
                    <input
                        v-model="kiloProduct.dona"
                        type="number"
                        min="0"
                        id="dona"
                        ref="kil"
                        @keyup="keyupDona"
                    />
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button id="kil" type="primary" @click="clickKilo"
                    >Tasdilash</el-button
                >
            </span>
        </el-dialog>

        <div class="fixed-bottom">
            <div class="container-full">
                <div class="bottom-inner">
                    <div class="bottom-inner-left">
                        <h6>Jami:</h6>
                        <h4>{{ allSum }}</h4>
                    </div>
                    <div class="bottom-inner-right">
                        <el-button @click="clearCash" type="danger"
                            >Tozalash</el-button
                        >
                        <el-button
                            @click="clickPay"
                            type="primary"
                            id="confirmButton"
                            >Sotish</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let { remote } = require("electron");
// console.log(process.versions.electron);
const { PosPrinter } = remote.require("electron-pos-printer");

import axios from "axios";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/src/scss/vue-select.scss";
export default {
    layout: "full",

    data() {
        return {
            options: ["foo", "bar", "baz"],
            isSearchText: false,
            dialogKilo: false,
            search: "",
            clock: "",
            date: "",
            code: "",
            products: null,
            dialogTableVisible: false,
            salePrice: "",
            payProduct: [],
            rightProduct: [],
            order: {
                product: [],
                price: 0,
                perPrice: 0,
            },
            fast: null,

            kiloProduct: {
                code: "",
                count: "",
                dona: "",
                title: "",
                boxcount: "",
                max: "",
            },
        };
    },

    async mounted() {
        let input = document.getElementById("searchInput");
        input.focus();
        setInterval(() => {
            let date = new Date();

            let hour, minute, second, day, month, year;

            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
            day = date.getDate();
            month = parseInt(date.getMonth()) + 1;

            year = date.getFullYear();

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            if (day < 10) {
                day = "0" + day;
            }
            month = parseInt(month);
            if (month < 10) {
                month = "0" + month;
            }

            this.clock = hour + ":" + minute + ":" + second;

            this.date = day + "." + month + "." + year;
        }, 1000);

        this._keyListener = function (e) {
            if (e.key === "Enter" && e.ctrlKey && this.payProduct.length > 0) {
                document.getElementById("confirmButton").click();
            }
        };

        this._keyListener2 = function (e) {
            if (e.key === "Enter" && this.dialogTableVisible) {
                document.getElementById("confirmOrder").click();
            }
            if (e.key === "Enter" && this.dialogKilo) {
                document.getElementById("kil").click();
            }
        };

        document.addEventListener("keyup", this._keyListener.bind(this));
        document.addEventListener("keydown", this._keyListener2.bind(this));

        this.getFast();

        setInterval(() => {
            var list = document.getElementsByTagName("input");

            let isFocus = false;

            if (!this.isSearchText) {
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (item == document.activeElement) {
                        isFocus = true;
                    }
                }

                let kilo = document.getElementById("boxcount");
                if (
                    kilo != document.activeElement &&
                    !this.dialogKilo &&
                    !isFocus
                ) {
                    let input = document.getElementById("searchInput");
                    input.focus();
                }
            }
        }, 100);
    },
    computed: {
        allSum() {
            let sum = 0;
            this.payProduct.forEach((item) => {
                sum =
                    sum +
                    item.count * item.price +
                    (item.dona * item.price) / item.boxcount;
            });

            return sum.toFixed(2);
        },

        allSumInput() {
            let sum = 0;
            this.payProduct.forEach((item) => {
                sum =
                    sum +
                    item.count * item.price +
                    (item.dona * item.price) / item.boxcount;
            });

            return sum.toFixed(2);
        },
    },
    methods: {
        async searchText() {
            if (this.search.length > 0) {
                let products = await this.$axios.get(
                    `product/search?text=${this.search}`
                );

                this.rightProduct = products.data.data;
            } else {
                let products = await this.$axios.get(`product/search?text=""`);

                this.rightProduct = products.data.data;
            }
        },
        keyupDona() {
            if (this.kiloProduct.dona >= this.kiloProduct.boxcount) {
                this.kiloProduct.count =
                    parseInt(this.kiloProduct.count) +
                    parseInt(this.kiloProduct.dona / this.kiloProduct.boxcount);
                this.kiloProduct.dona =
                    this.kiloProduct.dona % this.kiloProduct.boxcount;
            }
            if (
                parseInt(this.kiloProduct.count * this.kiloProduct.boxcount) +
                    parseInt(
                        this.kiloProduct.dona == "" ? 0 : this.kiloProduct.dona
                    ) >
                this.kiloProduct.max
            ) {
                alert("Mahsulot yetarli emas");
                this.kiloProduct.count = parseInt(
                    this.kiloProduct.max / this.kiloProduct.boxcount
                );

                this.kiloProduct.dona = parseInt(
                    this.kiloProduct.max % this.kiloProduct.boxcount
                );
            }

            this.kiloProduct.dona = parseInt(this.kiloProduct.dona);
        },
        editProduct(item) {
            this.dialogKilo = true;
            this.kiloProduct.title = item.title;
            this.kiloProduct.boxcount = item.boxcount;
            this.kiloProduct.code = item.code;

            setTimeout(() => {
                let kilo = document.getElementById("boxcount");

                kilo.focus();
            }, 100);
        },
        keyupBox() {
            if (this.kiloProduct.count == 0 && this.kiloProduct.boxcount != 1) {
                let isText = document.getElementById("dona");
                isText.focus();
            }

            if (
                parseInt(this.kiloProduct.count * this.kiloProduct.boxcount) +
                    parseInt(
                        this.kiloProduct.dona == "" ? 0 : this.kiloProduct.dona
                    ) >
                this.kiloProduct.max
            ) {
                alert("Mahsulot yetarli emas");
                this.kiloProduct.count = parseInt(
                    this.kiloProduct.max / this.kiloProduct.boxcount
                );

                this.kiloProduct.dona = parseInt(
                    this.kiloProduct.max % this.kiloProduct.boxcount
                );
            }

            this.kiloProduct.count = parseInt(this.kiloProduct.count);
        },
        clickSearchCode() {
            this.isSearchText = false;
        },
        clickSearchText() {
            let isText = document.getElementById("isSearchText");
            isText.focus();
            this.isSearchText = true;
        },
        myChangeEvent(val) {
            console.log(val);
        },
        mySelectEvent({ id, text }) {
            console.log({ id, text });
        },
        clearCash() {
            this.kiloProduct.code = "";
            this.kiloProduct.title = "";
            this.kiloProduct.kilo = "";
            this.payProduct = [];
            this.dialogTableVisible = false;
            this.order.payType = 1;
        },
        blurCount(item, index) {
            if (!item.count) {
                this.payProduct[index].count = 0;
            }
        },
        handleClose() {},
        async clickKilo() {
            let pr = await this.$axios.get(
                `product/kassa/one/${this.kiloProduct.code}`
            );

            let product = pr.data.data;

            let price = product.price;
            let perPrice = product.perPrice;
            let boxcount = product.boxcount;
            let count = !this.kiloProduct.count ? 0 : this.kiloProduct.count;
            let dona = !this.kiloProduct.dona ? 0 : this.kiloProduct.dona;

            if (count == 0 && dona == 0) {
                alert("Mahsulot sonini kiriting");
                return 1;
            }

            if (this.kiloProduct)
                if (product != null) {
                    let isPay = this.payProduct.findIndex(
                        (item) => item.code == product.code
                    );

                    console.log("count", count);
                    console.log("dona", dona);

                    if (
                        parseInt(product.count) >=
                        parseInt(product.boxcount * count) + parseInt(dona)
                    ) {
                        if (isPay != -1) {
                            this.payProduct[isPay].count = count;
                            this.payProduct[isPay].dona = dona;
                        } else {
                            this.payProduct.push({
                                title: product.title,
                                max: product.count,
                                boxcount: boxcount,
                                perPrice: perPrice,
                                count: count,
                                dona: dona,
                                price: price,
                                code: product.code,
                            });
                        }
                    } else {
                        this.$message({
                            message: `Mahsulot yetarli emas`,
                            type: "success",
                            showClose: true,
                        });
                        this.code = "";
                        return 0;
                    }
                } else {
                    this.$message({
                        message: `${this.code} mahsulot topilmadi`,
                        type: "success",
                        showClose: true,
                    });
                }

            this.dialogKilo = false;
            this.kiloProduct.count = "";
            this.kiloProduct.dona = "";
        },
        outFocus() {},
        async getFast() {
            let fast = await this.$axios.get("product/fast");
            this.fast = fast.data.data;
        },
        clickFast(item) {
            this.code = item.code;
            this.searchProduct();
        },
        async searchProduct() {
            if (this.code != "") {
                let pr = await this.$axios.get(
                    `product/kassa/one/${this.code}`
                );

                let product = pr.data.data;
                this.findProduct(product);
                this.code = "";
            }
        },

        findProduct(product) {
            this.search = "";
            this.searchText();
            if (product != null) {
                this.dialogKilo = true;
                this.kiloProduct.title = product.title;
                this.kiloProduct.max = product.count;
                this.kiloProduct.boxcount = product.boxcount;
                this.kiloProduct.code = product.code;

                setTimeout(() => {
                    let kilo = document.getElementById("boxcount");

                    kilo.focus();
                }, 100);
            } else {
                this.$message({
                    message: `${product.code} mahsulot topilmadi`,
                    type: "success",
                    showClose: true,
                });
            }
        },

        deleteProduct(index) {
            this.payProduct.splice(index, 1);

            this.kiloProduct.code = "";
            this.kiloProduct.title = "";
            this.kiloProduct.kilo = "";
        },
        clickPay() {
            this.dialogTableVisible = true;
            this.salePrice = this.allSumInput;
            // this.payType = 1;
        },
        async confirmOrder() {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });

            let sum = 0;
            this.payProduct.forEach((item) => {
                sum =
                    sum +
                    item.count * item.price +
                    (item.dona * item.price) / item.boxcount;
            });

            let perSum = 0;
            this.payProduct.forEach((item) => {
                perSum =
                    perSum +
                    item.count * item.perPrice +
                    (item.dona * item.perPrice) / item.boxcount;
            });

            let sendProducts = [];

            this.payProduct.forEach((item) => {
                let count = item.count == "" ? 0 : item.count;
                let dona = item.dona == "" ? 0 : item.dona;

                let realcount =
                    parseFloat(count) +
                    parseFloat((dona / item.boxcount).toFixed(10));

                let allCount = parseInt(count * item.boxcount) + parseInt(dona);

                sendProducts.push({
                    title: item.title,
                    code: item.code,
                    perPrice: item.perPrice,
                    price: item.price,
                    count: allCount,
                    realcount: realcount,
                });
            });

            this.order.product = sendProducts;
            this.order.price = sum;
            this.order.perPrice = perSum;

            console.log("order", this.order);

            axios
                .post("http://localhost:8080/api/order/create", this.order)
                .then((res) => {
                    let num = res.data.num;
                    let pr = [];

                    this.payProduct.forEach((item) => {
                        pr.push({
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: item.title,
                            css: {
                                "font-weight": "450",
                                "font-size": "11px",
                                margin: "0",
                                "word-break": "break-all",
                                "font-family":
                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            },
                        });

                        let str = "";

                        if (item.count == 0 && item.dona != 0) {
                            str = `${item.dona} x ${(
                                item.price / item.boxcount
                            ).toFixed(2)} = ${(
                                (item.dona * item.price) /
                                item.boxcount
                            ).toFixed(2)} so'm`;
                        } else {
                            str = `${item.count} - ${item.dona} x ${(
                                item.price / item.boxcount
                            ).toFixed(2)} = ${(
                                ((item.dona + item.count * item.boxcount) *
                                    item.price) /
                                item.boxcount
                            ).toFixed(2)} so'm`;
                        }

                        pr.push({
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: str,
                            css: {
                                "font-weight": "450",
                                "text-align": "right",
                                "font-size": "11px",
                                "border-bottom": "1px solid #333",
                                margin: "0",
                                "word-break": "break-all",
                                "font-family":
                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            },
                        });
                    });

                    const data = [
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: "AZIZLAR MARKET",
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "600",
                                "font-size": "13px",
                                border: "1px solid #333",
                                margin: "0",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Chek nomeri: №${num}`,
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                margin: "0",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Vaqt: ${this.date} ${this.clock.substr(
                                0,
                                5
                            )}`,
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "600",
                                "font-size": "12px",
                                margin: "0px 0px 25px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        ...pr,
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Jami: ${sum}`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                "text-align": "right",
                                margin: "0px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },

                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Sotuvchi:`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                margin: "10px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `${this.$store.state.user.name}`,
                            css: {
                                "font-weight": "600",
                                "font-size": "12px",
                                margin: "0px 0px 5px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Sog'-salomat bo'ling`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                "text-align": "center",
                                margin: "15px 0px 35px 0px",
                                "font-family": "sans-serif",
                            },
                        },

                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `------------`,
                            css: {
                                "font-weight": "500",
                                "font-size": "14px",
                                "text-align": "center",
                                margin: "0px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                    ];
                    PosPrinter.print(data, {
                        preview: false, // Preview in window or print
                        width: 155, //  width of content body
                        margin: "0 0 0 0", // margin of content body
                        copies: 1, // Number of copies to print
                        printerName: "XP-58", // printerName: string, check it at webContent.getPrinters()
                        timeOutPerLine: 400,
                        silent: true,
                    })
                        .then(() => {
                            loading.close();
                            this.payProduct = [];
                            this.dialogTableVisible = false;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
        },
    },
};
</script>

<style lang="scss">
tr.notcount {
    td {
        background-color: rgb(253, 241, 241);
    }
}
.input-right {
    input {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        padding-left: 15px;
        font-size: 20px;
        color: #333;
        border: 1px solid #999;
        &:focus {
            outline: none;
            border: 1px solid #000;
        }
    }
}

.right-table {
    height: calc(100vh - 225px);
    overflow-y: scroll;
    background-color: #fff;
    table {
        width: 100%;
        border: none;
        position: relative;
        border-collapse: collapse;
        tr {
            cursor: pointer;
            &:hover td {
                background-color: #007bff;
                color: #fff;
            }
        }
        td.tit-name {
            width: 180px;
            font-weight: bold;
        }
        th {
            position: sticky;
            top: 0;
            background-color: #e8f3ff;
        }
        th {
            padding: 10px 10px;
            text-align: left;
            font-size: 14px;
        }
        td {
            padding: 12px 10px;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
        }
    }
}
div.sale-box {
    display: flex;
    justify-content: center;
    margin: 15px 0px;
    input {
        height: 50px;
        font-size: 32px;
        text-align: center;
        padding: 0px 20px;
    }
}
.el-checkbox__label {
    font-size: 26px;
}

div.input-kilo {
    h2.pr-title {
        margin-bottom: 15px;
    }
    h4.pr-gram {
        margin-bottom: 10px;
        font-weight: 400;
        margin-top: 20px;
    }
    input {
        height: 50px;
        width: 100%;
        padding: 0px 15px;
        font-size: 30px;
    }
}
div.cash {
    padding: 5px 0px;
    div.cash-title {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    div.dialog-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div.modal-price {
            display: flex;
            align-items: center;
            h5 {
                font-size: 22px;
                color: #666;
                font-weight: 400;
            }
            h4 {
                font-size: 32px;
                color: #333;
                margin-left: 10px;
            }
        }
    }
    div.cash-box {
        display: flex;
        margin: 0px -10px;
        div.cash-left {
            width: 60%;
            padding: 0px 10px;
        }
        div.cash-right {
            width: 40%;
            padding: 0px 10px;
        }

        div.cash-top-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            h6 {
                font-size: 28px;
            }
            h5 {
                font-size: 14px;
                color: #666;
                text-align: right;
                font-weight: 400;
            }
        }

        div.cash-search {
            display: flex;
            align-items: center;
            input {
                width: 400px;
                height: 50px;
                border-radius: 5px;
                padding-left: 15px;
                font-size: 20px;
                color: #333;
                border: 1px solid #999;
                &:focus {
                    outline: none;
                    border: 1px solid #000;
                }
            }
            button {
                height: 50px;
                margin-left: 15px;
            }
        }

        div.ul-products {
            display: flex;
            flex-wrap: wrap;
            margin: 0px -7px;
            max-height: calc(100vh - 150px);
            overflow-y: scroll;
            div.ul-item {
                width: calc(100% / 3);
                padding: 0px 7px;
                button {
                    padding: 15px 10px;
                    border-radius: 5px;
                    background-color: #ddd;
                    color: #333;
                    font-weight: 600;
                    font-size: 18px;
                    width: 100%;
                    margin-bottom: 10px;
                    cursor: pointer;
                    transition: 0.2s;
                    &:hover {
                        background-color: #eee;
                    }
                    &:active {
                        background-color: #ccc;
                    }
                }
            }
        }
        div.table-products {
            margin-top: 10px;
            max-height: calc(100vh - 225px);
            overflow-y: scroll;
            table {
                width: 100%;
                border: none;

                th {
                    padding: 5px 10px;
                    text-align: left;
                    font-size: 14px;
                }
                td {
                    padding: 8px 10px;
                    font-size: 14px;
                    border-bottom: 1px solid #ccc;
                }
                td.title {
                    width: 300px;
                }
            }
        }
    }

    div.fixed-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 30;
        background-color: #e8f3ff;

        div.bottom-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0px;
            div.bottom-inner-left {
                display: flex;
                align-items: center;
                h6 {
                    font-size: 22px;
                    font-weight: 400;
                }
                h4 {
                    font-size: 28px;
                    margin-left: 15px;
                }
            }

            div.bottom-inner-right {
                .el-button--primary {
                    font-size: 30px !important;
                }
                .el-button--danger {
                    font-size: 30px !important;
                }
            }
        }
    }
}
</style>
