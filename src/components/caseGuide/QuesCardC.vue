<template>
    <div class="item">   
        <div v-for="({title, depth, id, children, questions}) in data.children" :key="id">
            <title-h-2 v-if="depth === 2" :title="title" />
            <h4 v-if="depth === 3" class="js_anchor">{{title}}</h4>
            <h5 v-if="depth === 4" class="js_anchor">{{title}}</h5>
            <h6 v-if="depth === 5" class="js_anchor">
                <span class="line line-l"></span>
                <span class="line line-r"></span>
                <span>{{title}}</span>
            </h6>
            <ques-card-s
                :marginT="depth === 5 ? 'mgt-0' : ''"
                :borderT="depth === 5 ? 'bdt-0' : ''" 
                :borderB="depth === 4 && children && children.length ? 'bdb-0' : ''" 
                :questions="questions" 
                @showResult="onShowResult" 
                @showEvidence="onShowEvidence" 
            />
            <ques-card-c v-if="children && children.length" :data="{title, depth, id, children, questions}" />
        </div>
    </div>
</template>

<script>
import TitleH2 from './TitleH2'
import QuesCardS from './QuesCardS'

export default {
    name: 'QuesCardC',
    components: {
        TitleH2,
        QuesCardS
    },
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            
        }
    },

    methods: {
        onShowResult(quetions, i) {
            this.$emit('showResult', quetions, i)
        },
        onShowEvidence() {
            this.$emit('showEvidence')
        }
    }
}
</script>

<style lang="less" scoped>
.item {
    h4, h5, h6 {
        font-size: 14px;
    }

    h4 {
        margin-top: 20px;
    }

    h5 {
        margin-top: 16px;
    }

    h6 {
        margin: 4px 0 0 20px;
        position: relative;

        span {
            position: relative;
        }

        .line {
            position: absolute;
            width: 1px;
            height: 56px;
            background: #e8e8e8;
            top: -21px;

            &.line-l {
                left: -20px;
            }

            &.line-r {
                right: 0;
            }
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;                    
            background: #F8F6F4;
            // border-radius: 2px;
            // filter: blur(10px);
        }
    }
}
</style>