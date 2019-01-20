<template>
    <my-page title="报餐统计" :page="page">
        <ul class="count-list">
            <li class="item item-before" @click="viewDetail(-1)">
                <div class="key">昨天</div>
                <div class="value">{{ count.todayBefore }}人</div>
            </li>
            <li class="item item-today" @click="viewDetail(0)">
                <div class="key">今天</div>
                <div class="value">{{ count.today }}人</div>
            </li>
            <li class="item item-after" @click="viewDetail(1)">
                <div class="key">明天</div>
                <div class="value">{{ count.todayAfter }}人</div>
            </li>
        </ul>
        <ul class="log-list">
            <li class="item" v-for="item in data">
                <div class="time">{{ item.time }}</div>
                <div class="times">{{ item.number }} 人</div>
            </li>
        </ul>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                count: {
                    today: 0,
                    todayBefore: 0,
                    todayAfter: 0,
                },
                data: [],
                loading: true,
                code: '',
                result: null,
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     href: 'https://project.yunser.com/products/fd5fcc00fbe011e8a644d75e0db84a23',
                        //     target: '_blank'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.loadData()
            },
            loadData() {
                this.$http.get(`/eat/stat`)
                    .then(response => {
                        let data = response.data
                        this.data = data
                        let item = this.data.find(item => item.time === moment().format('YYYY-MM-DD'))
                        this.count.today = item ? item.number : 0
                        item = this.data.find(item => item.time === moment().add(1, 'days').format('YYYY-MM-DD'))
                        this.count.todayAfter = item ? item.number : 0
                        item = this.data.find(item => item.time === moment().subtract(1, 'days').format('YYYY-MM-DD'))
                        this.count.todayBefore = item ? item.number : 0
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            viewDetail(offset) {
                this.$router.push('/detail?date=' + moment().add(offset, 'days').format('YYYY-MM-DD'))
            }
        },
        watch: {
        }
    }
</script>

<style lang="scss" scoped>
    .count-list {
        max-width: 480px;
        display: flex;
        margin-bottom: 16px;
        .item {
            padding: 16px 0;
            flex-grow: 1;
            margin-right: 16px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
        }
        .key {
            font-size: 16px;
            color: #666;
        }
        .value {
            font-size: 24px;
        }
        .item-before {
            .value {
                color: #ea4335;
            }
        }
        .item-today {
            .value {
                color: #4285f4;
            }
        }
        .item-after {
            .value {
                color: #34a853;
            }
        }
    }
    .log-list {
        .item {
            display: flex;
        }
        .time {
            margin-right: 16px;
        }
    }
</style>
