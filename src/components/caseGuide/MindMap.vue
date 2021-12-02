<template>
    <div class="mindmap-container">
        <div class="main">
            <h1 class="guide-header">
                <span>审理指引</span>
                <div class="line" ref="lineRef"></div>
                <div class="slider" :style="{transform: `translateX(${sliderX}px)`}"></div>
            </h1>

            <div class="ques-content" ref="quesContentRef" :style="{paddingRight: `${showSidebar ? 242 : 36}px`}" @scroll="onScroll" @mousewheel="onMouseWheel">
                <div class="ques-main" v-for="(item, i) in data" :key="item.id">
                    <title-h-1 :title="item.title" :num="item.num" @showMore="onShowMore(i)" />
                    
                    <div class="mgl-55" v-if="item.showMore">
                        <ques-card-s :questions="item.questions" @showResult="onShowResult" @showEvidence="onShowEvidence" />
                        <ques-card-c :data="item" @showResult="onShowResult" @showEvidence="onShowEvidence" />
                    </div>
                </div>
            </div>

            <tips-card class="sidebar-tip" v-if="showTip" 
                :style="{right: `${showSidebar ? 255 : 60}px`}"
                title="查看大纲" 
                desc="你可以点击展开大纲，实现对段落的快速定位" 
                stepTip=""  
                :showNextBtn="false"
                :showPrevBtn="false"
                :showCloseBtn="true"
                arrow="right"
                @close="close"  
            />
        </div>

        <div class="right-sidebar" :style="{transform: `translateX(${showSidebar ? 0 : '100%'}) translateX(${showSidebar ? 0 : '-48px'})`}">
            <tree-menu :data="data" @change="onChange" :curActive="curActive" />
            <div class="right-arrow" @click="onShowSidebar">
                <i :class="['iconfont', {'icon-zuo': !showSidebar, 'icon-you': showSidebar}]"></i>
            </div>
        </div>
    </div>
</template>

<script>
import TreeMenu from './TreeMenu'
import QuesCardS from './QuesCardS'
import QuesCardC from './QuesCardC'
import TitleH1 from './TitleH1'
import TipsCard from '../caseInfoComp/TipsCard'
import {mindMapDfs} from '../../utils/utils'

export default {
    name: 'MindMap',
    components: { 
        TreeMenu, 
        QuesCardS,
        TitleH1,
        QuesCardC,
        TipsCard
    },
    data() {
        return {
            anchorDom: null,
            curActive: 0,
            showSidebar: false,
            data: [],
            showTip: false,
            sliderX: 0
        }
    },
    mounted() {
        this.showTip = !localStorage.getItem('mindMapTipHasShowed')
        this.getData()
    },
    methods: {
        getData() {
            this.$services.getMindData().then(res => {
            
                res.forEach((item, i) => {
                    item.num = i + 1
                    item.showMore = true
                })

                mindMapDfs({children: res})

                this.data = res
            })
        },
        onShowMore(i) {
            this.data[i].showMore = !this.data[i].showMore
        },
        onShowEvidence() {
            this.$emit('showEvidence')
        },
        onShowResult(questions, i) {
            questions.forEach(item => {
                item.showResult = false
            })
            questions[i].showResult = !questions[i].showResult
        },
        onScroll(e) {
            const scrollHeight = this.$refs.quesContentRef.scrollHeight
            const {width} = this.$refs.lineRef.getBoundingClientRect()

            this.sliderX = e.target.scrollTop * width / (scrollHeight + this.$refs.quesContentRef.clientHeight)
            
            if(this.onClicking) return

            if(!this.anchorDom) {
                this.anchorDom = document.querySelectorAll('.js_anchor');
            }

            for(let i = this.anchorDom.length - 1; i >= 0; i --) {
                const item = this.anchorDom[i]
                
                if(e.target.scrollTop >= item.getBoundingClientRect().top - this.anchorDom[0].getBoundingClientRect().top) {
                    this.curActive = i

                    break;
                }
            }
        },
        onMouseWheel() {
            this.onClicking = false
        },
        onChange(i) {
            this.curActive = i;
            this.onClicking = true
        },
        onShowSidebar() {
            this.showSidebar = !this.showSidebar
        },
        close() {
            this.showTip = false
            localStorage.setItem('mapTipHasShowed', true)
        }
    }
}
</script>

<style scoped lang="less">
    .mindmap-container {
        height: 100%;
        position: relative;
        padding: 24px 0 0;
        color: #2B4258;
        overflow: hidden;

        .main {
            height: 100%;

            h1 {
                font-size: 36px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                line-height: 50px;
                padding: 0 0 24px;
                margin-left: 24px;
            }

            .guide-header {
                position: relative;
                margin-bottom: 20px;

                .line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: #E8E8E8;
                    width: calc(100vw - 100px);
                    height: 1px;
                }

                .slider {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100px;
                    height: 2px;
                    background: #2B6BCF;
                    z-index: 2;
                    transition: transform .3s linear;
                }
            } 

            .ques-content {
                height: calc(100% - 74px);
                padding: 0 24px 24px;
                overflow-y: auto;

                .ques-main {
                    margin-top: 40px;

                    &:first-child {
                        margin-top: 0;
                    }
                }

                & /deep/ h2,h3,h4,h5,h6 {
                    color: #2B4258;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                }

                .mgl-55 {
                    margin-left: 55px;
                }

                & /deep/ .ques-card {
                    position: relative;
                    // background: url("../../assets/images/ques_bg.png") center center/cover;
                    border-radius: 2px;
                    border: 1px solid #E8E8E8;
                    padding-top: 16px;
                    margin-top: 16px;
                    background: #F8F6F4;

                    // &::before {
                    //     content: '';
                    //     position: absolute;
                    //     top: 0;
                    //     left: 0;
                    //     width: 100%;
                    //     height: 100%;                     
                    //     background: rgba(255, 255, 255, 0.95);
                    //     border-radius: 2px;
                    //     // filter: blur(10px);
                    // }

                    & > div {
                        &:last-child {
                            .ques-result {
                                margin-bottom: 0;
                            }

                        }
                    }

                    .ques-row {
                        position: relative;
                        padding: 0 16px 16px;
                    

                        i {
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #FE9142;
                            font-style: normal;
                            vertical-align: top;
                        }

                        p {
                            width: calc(100% - 86px);
                            display: inline-block;
                            text-align: left;
                            line-height: 1.5;
                            font-family: PingFangSC-Regular, PingFang SC;
                        }
                    }

                    .ques-result {
                        position: relative;
                        padding: 16px;
                        margin-bottom: 16px;
                        line-height: 1.5;
                        background: #FAFAFA;
                        border-bottom: 1px solid #E8E8E8;
                    }
                }
            }

        }

        .right-sidebar {
            position: absolute;
            right: 0;
            top: 24px;
            bottom: 0;
            width: 242px;
            padding-left: 40px;
            overflow-y: auto;
            overflow-x: hidden;
            background: #fff;
            transition: transform .3s ease-in-out;
            z-index: 22;

        }

        .sidebar-tip {
            position: absolute;
            right: 0;
            top: 0;
            transition: all .3s ease-in-out;
            // transform: translateX(-100%);

            &.tips-card.right {
                &::after {
                    margin-top: -20px;
                }
            }
        }


        .right-arrow {
            position: absolute;
            left: 4px;
            top: 0;
            width: 20px;
            height: 24px;
            line-height: 22px;
            background: #F7F7F7;
            border: 1px solid #E8E8E8;
            cursor: pointer;

            .iconfont {
                font-size: 16px;
            }
        }
    }
</style>
