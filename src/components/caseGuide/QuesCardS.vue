<template>
    <div :class="['ques-card', borderT, borderB, marginT]" v-if="questions.length">
        <div v-for="({question, showResult, answer}, i) in questions"
            :key="question"
        >
            <div class="ques-row">
                <i>Q：</i>
                <p class="question">{{question}}</p>
                <ques-option :showResult="showResult" @showResult="onShowResult(questions, i)" @showEvidence="onShowEvidence" />
            </div>
            <div class="ques-result" v-if="showResult">{{answer}}</div>
        </div>
    </div>
</template>

<script>
import QuesOption from './QuesOption'

export default {
    name: 'QuesCardS',
    components: { QuesOption },
    props: {
        questions: {
            type: Array,
            default: () => []
        },
        borderT: String,
        borderB: String,
        marginT: String
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
.ques-card {
    &.bdt-0 {
        border-top-width: 0 !important;
    }

    &.bdb-0 {
        border-bottom-width: 0 !important;
    }

    &.mgt-0 {
        margin-top: 0 !important;
    }
}
</style>