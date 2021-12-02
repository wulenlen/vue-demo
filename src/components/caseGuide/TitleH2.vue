<template>
    <h3 class="js_anchor">
        <i class="iconfont icon-xinghao"></i>
        <span>{{title}}</span>
    </h3>
</template>

<script>
export default {
    name: 'TitleH2',
    props: {
        title: String
    }
}
</script>

<style lang="less" scoped>
h3 {
    margin: 24px 0 16px 0;

    .iconfont {
        color: #51C48A;
        font-size: 16px;
        margin-right: 8px;
    }
}
</style>