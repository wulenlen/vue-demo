<template>
    <h2 class="js_anchor">
        <span class="num">{{num}}</span>
        <i class="iconfont icon-xia" @click="onShowMore"></i>
        <span class="title">{{title}}</span>
    </h2>
</template>

<script>
export default {
    name: 'TitleH1',
    props: {
        title: String,
        num: Number
    },
    methods: {
        onShowMore() {
            this.$emit('showMore')
        }
    }
}
</script>

<style lang="less" scoped>
h2 {  
    font-size: 18px;

    .num {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: #2B6BCF;
        border: 2px solid #ABC9F8;
        color: #fff;
        font-size: 14px;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
    }

    .num,
    .iconfont {
        vertical-align: middle;
    }

    .iconfont {
        font-size: 16px;
        margin: 0 8px;
        cursor: pointer;
    }
}
</style>