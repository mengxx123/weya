<template>
    <my-page title="我的报餐" :page="page">
        <div v-if="user">
            <ui-text-field v-model="note" label="想吃什么" />
            <br>
            <ui-radio class="radio" v-model="type" label="明天" nativeValue="1"/>
            <ui-radio class="radio" v-model="type" label="今天" nativeValue="2"/>
            <div class="btns">
                <ui-raised-button class="btn" label="报餐" primary @click="sign2" />
                <!-- <ui-raised-button class="btn" label="明天报餐" primary @click="signToday" /> -->
                <!-- <ui-raised-button class="btn" label="今天报餐" secondary @click="signTodayAfter" /> -->
            </div>
            <h2 class="section-title">我的报餐</h2>
            <div class="empty" v-if="!eats.length">暂无报餐记录</div>
            <ul class="eat-list">
                <li class="item" v-for="item in eats">
                    {{ item.time }}
                </li>
            </ul>
        </div>
        <div v-else>
            <ui-text-field v-model="userName" label="姓名" hintText="不可修改"/>
            <div class="btns">
                <ui-raised-button label="一键注册登录" primary @click="register" />
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                user: null,
                userId: '',
                userName: '',
                type: '1',
                eats: [],
                loading: true,
                note: '',
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
                this.user = this.$storage.get('user')
                if (this.user) {
                    this.loadData()
                }
            },
            register() {
                if (!this.userName) {
                    this.$message({
                        type: 'danger',
                        text: '请输入姓名'
                    })
                    return
                }
                this.$http.post(`/eat/loginOrRegister`, {
                    name: this.userName
                })
                    .then(response => {
                        let data = response.data
                        this.user = data
                        this.$storage.set('user', this.user)
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            loadData() {
                this.$http.get(`/users/${this.user.id}/eats`)
                    .then(response => {
                        let data = response.data
                        this.eats = data
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            sign2() {
                if (this.type === '1') {
                    this.sign(moment().add(1, 'days').format('YYYY-MM-DD'))
                } else {
                    this.sign(moment().format('YYYY-MM-DD'))
                }
            },
            sign(time) {
                this.$http.post(`/eat/create`, {
                    userId: this.user.id,
                    time,
                    note: this.note
                })
                    .then(response => {
                        let data = response.data
                        this.$message({
                            type: 'success',
                            text: '提交成功'
                        })
                        this.note = ''
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            signToday() {
                this.sign(moment().format('YYYY-MM-DD'))
            },
            signTodayAfter() {
                this.sign(moment().add(1, 'days').format('YYYY-MM-DD'))
            }
        },
        watch: {
            code(value) {
                console.log('change')
                if (!/^([0-9]){7,18}(x|X)?$/.test(value)) {
                    let match = value.match(/([0-9]){7,18}(x|X)?/)
                    if (match) {
                        console.log('match')
                        this.code = match[0]
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-title {
        margin: 16px 0;
        font-weight: bold;
    }
    .empty {
        padding: 80px 0;
        text-align: center;
    }
    .tip {
        color: #999;
        margin-bottom: 16px;
    }
    .btns {
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
    .radio {
        margin-right: 16px;
        margin-bottom: 16px;
    }
</style>
