import Vue from "vue";
const beauty = {
    install(Vue, options) {
        Vue.prototype.beautySum = function (Number) {
            if (!isNaN(Number) && isFinite(Number)) {
                let string = Number.toString();
                const arr = string.split(".");
                let str = "";
                let count = 0;
                let temp = "";
                if (arr[0].length <= 3) return Number;
                for (let j = arr[0].length - 1; j >= 0; j--) {
                    count++;
                    temp = arr[0][j] + temp;
                    if (count === 3) {
                        if (str.length > 0) {
                            str = temp + "." + str;
                        } else {
                            str = temp;
                        }
                        temp = "";
                        count = 0;
                    }
                }
                if (temp.length > 0) str = temp + "." + str;
                if (arr.length > 1) str = str + "." + arr[1].slice(0, 2);
                return str;
            } else {
                return 0;
            }
        };
    },
};
Vue.use(beauty);
