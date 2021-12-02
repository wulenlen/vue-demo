<template>
    <span class="option">
        <a-tooltip placement="top">
            <template slot="title">
                <span>详情</span>
            </template>
            <i :class="['iconfont', {'icon-xia': !showResult, 'icon-shang': showResult}]" @click="onShowResult"></i>
        </a-tooltip>
        <a-tooltip placement="top">
            <template slot="title">
                <span>举证材料</span>
            </template>
            <i class="iconfont icon-juzhengcailiao" @click="onShowEvidence"></i>
        </a-tooltip>
    </span>
</template>

<script>
export default {
    name: 'QuesOption',
    props: {
        showResult: Boolean
    },
    methods: {
        onShowResult() {
            this.$emit('showResult')
        },
        onShowEvidence() {
            this.$emit('showEvidence')
        }
    }
}
</script>

<style lang="less" scoped>
.option {
    position: absolute;
    right: 16px;
    top: 0;

    .iconfont {
        color: #2B4258 !important;
        font-size: 16px;
        margin-left: 16px;
        cursor: pointer;
    }
}
</style>