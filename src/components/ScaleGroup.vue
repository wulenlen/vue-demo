<template>
    <div class="scale-group">
        <div :class="['option', {disable: disableLarge}]" @click="onScale(true)"><a-icon type="plus" /></div>
        <a-divider />
        <div :class="['option', {disable: disableLess}]" @click="onScale(false)"><a-icon type="minus" /></div>
    </div>
</template>

<script>

export default {
    name: 'ScaleGroup',
    props: {
        minScaleNum: {
            type: Number,
            default: -10
        },
        maxScaleNum: {
            type: Number,
            default: 10
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            scaleNum: 0,
        }
    },
    watch: {
        value(val) {
            this.scaleNum = val
        }
    },
    computed: {
        disableLess() {
            return this.scaleNum <= this.minScaleNum
        },
        disableLarge() {
            return this.scaleNum >= this.maxScaleNum
        }
    },
    mounted() {
        this.scaleNum = this.value
    },
    methods: {
        onScale(flag) {
            if (!flag && this.disableLess || flag && this.disableLarge) {
                return
            }

            flag ? this.scaleNum += this.step : this.scaleNum -= this.step

            this.$emit('input', this.scaleNum, flag)
        }
    }
}
</script>

<style scoped lang="less">
    .scale-group {
        position: absolute;
        bottom: 31px;
        right: 32px;
        background: #FFFFFF;
        box-shadow: 2px -1px 4px 0px rgba(67, 75, 89, 0.21);
        padding: 0 12px;
        user-select: none;
        z-index: 2222;
        border: 1px solid #e8e8e8;

        .option {
            font-size: 14px;
            color: #2B4258;
            padding: 15px 3px;
            line-height: 1;
            cursor: pointer;

            &.disable {
                color: #C8C9CC;
            }
        }

        & /deep/ .ant-divider-horizontal {
            margin: 0;
        }
    }
</style>
