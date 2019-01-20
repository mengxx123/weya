<template>
    <my-page title="报餐系统" :page="page">
        <app-list :data="groups" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        // name: '报餐',
                        apps: [
                            {
                                name: '我的报餐',
                                desc: '',
                                icon: '/static/img/meal.svg',
                                to: 'eat'
                            },
                            {
                                name: '报餐统计',
                                desc: '',
                                icon: '/static/img/data.svg',
                                to: 'stat'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'search',
                        //     href: 'https://search.yunser.com?utm_source=life',
                        //     target: '_blank',
                        //     title: '搜索'
                        // },
                        // {
                        //     type: 'icon',
                        //     icon: 'apps',
                        //     href: 'https://app.yunser.com?utm_source=life',
                        //     target: '_blank',
                        //     title: '应用'
                        // }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

.tool-list {
    max-width: 840px;
    margin: 0 auto;
    @include clearfix;
    .list-item {
        position: relative;
        float: left;
        width: 260px;
        height: 96px;
        padding: 8px;
        margin: 2px 16px 16px 2px;
        background-color: #fff;
        //border: 1px solid #ccc;
        &:hover {
            background-color: #f9f9f9;
            // box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
            //border-color: #09c;
            .icon {
                display: block;
            }
        }
        &.active {
            border: 1px solid #f00;
        }
    }
    a {
        display: block;
        height: 100%;
        color: #666;
        cursor: pointer;
    }
    .img {
        float: left;
        width: 72px;
        height: 72px;
        margin-right: 16px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
    }
    .info {
        float: left;
    }
    .text {
        font-size: 18px;
        color: #000;
    }
    .header {
        overflow: hidden;
    }
    .desc {
        max-width: 150px;
        margin-top: 8px;
    }
    .icon-heart {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 32px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
}
@media all and (max-width: 400px){
    .tool-list {
        .list-item {
            width: 100%;
            margin-right: 0;
        }
    }
}
</style>
