<template>
    <div class="mind-map-node" :id="itemData.id" >
        <div class="title">{{itemData.title}}</div>
    </div>
</template>

<script>
export default {
    props: {
        itemData: {
            type: Object,
        },
    },
    mounted() {
        console.log(this.itemData)
    }
}
</script>

<style scoped>
.mind-map-node {
        border-radius: 10px;
        padding: 4px 8px;
        font-size: 12px;
        background: #fff;
        border: 1px solid;
      }
#Root {
    width: 100px;
    background: orange;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    height: 28px;
    line-height: 28px;
    padding: 0;
}
</style>