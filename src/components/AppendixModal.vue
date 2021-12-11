<template>
    <div class="appendix-modal" ref="appendixModal" v-drag="{handle: '.js_drag'}" v-show="show">
        <span class="pos-right" @click="onClose"><i class="iconfont icon-a-24px"></i></span>
        <div class="header js_drag">
            <div class="name">{{curImgData.name}}</div>
            <div class="time-txt">时间</div>
        </div>
        <div class="content" ref="appendixImgArea">
            <div class="display-area" v-drag="{handle: '.js_img_drag'}" :style="{transform: `scale(${scaleNum}) rotate(${angle}deg)`}">
                <img src="../../assets/1.jpeg" alt="材料">
            </div> 
            <div class="drag-target js_img_drag" @mousewheel="wheel"></div>
        </div>
        <div class="footer">
            <div class="option">
                <i class="iconfont icon-shangyizhang" @click="prev"></i>
                <i class="iconfont icon-xiayizhang" @click="next"></i>
                <i class="iconfont icon-xiangzuoxuanzhuan" @click="onRotate(true)"></i>
                <i class="iconfont icon-xiangyouxuanzhuan" @click="onRotate(false)"></i>
                <i class="iconfont icon-fangda" @click="onScale(true)"></i>
                <i class="iconfont icon-suoxiao" @click="onScale(false)"></i>
                <i class="iconfont icon-xiazai" @click="onDownload"></i>
            </div>
            <div class="appendix-box">
                <div :class="['img-box', {active: i + 1 === curImg}, {'js_selected_img': i + 1 === curImg}]" v-for="(item, i) in imgs" :key="i" @click="onSelect(i, item)">
                    <img src="../../assets/1.jpeg" alt="材料" />
                    <span class="num-tag">{{i + 1}}</span>
                </div>
            </div>
            <span class="num">{{curImg}}/{{imgs.length}}</span>
        </div>
    </div>
</template>

<script>
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import {downloadImg} from '../../utils/utils'

export default {
    name: 'AppendixModal',
    props: {
        show: Boolean,
        activeImg: String,
        imgs: {
            type: Array,
            default() {
                return [1,3,4,5,6,7]
            }
        }
    },
    data() {
        return {
            scaleNum: 1,
            angle: 0,
            curImg: 1,
            curImgData: {},
            docWidth: 0,
            modalW: 0,
        }
    },
    mounted() {
        this.disabledMouseWheel();
        this.modalW = this.$refs.appendixModal.clientWidth;
        this.docWidth = document.documentElement.clientWidth;
    },
    methods: {
        onClose() {
            this.$emit('close')
        },
        onDownload() {
            console.log(2222)
            downloadImg('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic15.nipic.com%2F20110708%2F3388327_164155701127_2.jpg&refer=http%3A%2F%2Fpic15.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635498618&t=690fb501ec3ab2aa0b63a49d6f567023', '1.jpeg')
        },
        prev() {
            this.curImg > 1 && (this.curImg -= 1);
            this.curImgUrl = this.imgs[this.curImg];
            this.updateActiveImg();
        },
        next() {
            this.curImg < this.imgs.length && (this.curImg += 1);
            this.curImgUrl = this.imgs[this.curImg];
            this.updateActiveImg();
        },
        onSelect(idx, item) { 
            this.curImg = idx + 1;
            this.curImgData = item;
            this.updateActiveImg();
        },
        updateActiveImg() {
            const dis = (this.docWidth - this.modalW) / 2;
            
            this.$nextTick(() => {
                const imgDom = document.querySelector('.js_selected_img'),
                    imgLeft = imgDom.getBoundingClientRect().left,
                    imgOffsetL = imgLeft - dis
                
                if(imgOffsetL > this.modalW / 2 || imgOffsetL < this.modalW / 2) {
                    elementScrollIntoView(imgDom, { behavior: "smooth", block: "center", inline: "center" });
                }
            })
        },
        onRotate(flag) {
            flag ? this.angle += 90 : this.angle -= 90;
        },
        onScale(flag) {
            if(this.scaleNum < 0.5 && !flag) return;

            flag ? this.scaleNum += 0.2 : this.scaleNum -= 0.1;
        },

        wheel(event) {
            let delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
            } else if (event.detail) {
                //FF浏览器使用的是detail,其值为“正负3”
                delta = -event.detail / 3;
            }
            if (delta) this.handle(delta);
        },

        handle(delta) {
            if (delta < 0) {
                //向下滚动
                if (this.scaleNum < 0.5) {
                    return
                }

                this.scaleNum -= 0.1
            } else {
                //向上滚动
                this.scaleNum += 0.1
            }
        },
        disabledMouseWheel() {

            var div = this.$refs.appendixImgArea;

            if (div.addEventListener) {

                div.addEventListener('DOMMouseScroll', this.scrollFunc, false);

            }

            div.onmousewheel = div.onmousewheel = this.scrollFunc;

        },

        scrollFunc(evt) {

            evt = evt || window.event;

            if (evt.preventDefault) {

                // Firefox

                evt.preventDefault();

                evt.stopPropagation();

            } else {

                // IE

                evt.cancelBubble = true;

                evt.returnValue = false;

            }

            return false;

        },
    }
}
</script>

<style scoped lang="less">
.appendix-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    width: 50%;
    height: 90%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #E8E8E8;
    padding: 24px;
    user-select: none;

    .pos-right {
        position: absolute;
        right: 24px;
        top: 24px;

        .iconfont {
            cursor: pointer;
        }
    }

    .header {
        .name {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            line-height: 28px;
        }

        .time-txt {
            color: #3A4046;
            margin-top: 8px;
        }
    }

    .content {
        position: absolute;
        top: 104px;
        bottom: 251px;
        left: 24px;
        right: 24px;
        background: #F7F7F7;
        border: 1px solid #E8E8E8;
        overflow: hidden;
        
        .drag-target {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .display-area {
            position: absolute;
            width: 100%;
            height: 100%;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50%;
                object-fit: contain;
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 2%;
        left: 0;
        right: 0;
        text-align: center;

        .option {
            display: inline-block;
            padding: 0.5% 32px;
            border-radius: 34px;
            border: 1px solid #E8E8E8;

            i {
                margin-left: 32px;
                cursor: pointer;

                &:first-child {
                    margin-left: 0;
                }
            }
        }

        .appendix-box {
            margin-top: 16px;
            overflow-x: auto;
            white-space: nowrap;

            .img-box {
                position: relative;
                display: inline-block;
                width: 100px;
                height: 100px;
                background: #F7F7F7;
                border-radius: 2px;
                border: 1px solid #E8E8E8;
                margin-left: 20px;
                line-height: 100px;
                text-align: center;

                &:last-child {
                    margin-right: 20px;
                }

                &.active {
                    background: rgba(43, 107, 207, 0.2);
                    border: 2px solid #2B6BCF;
                }

                img {
                    width: 52px;
                    height: 73px;
                    object-fit: fill;
                }

                .num-tag {
                    position: absolute;
                    top: 6px;
                    left: 7px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    line-height: 20px;
                }
            }
        }

        .num {
            display: inline-block;
            padding: 3px 27px;
            background: rgba(0, 0, 0, 0.64);
            border-radius: 15px;
            color: #fff;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            line-height: 22px;
            margin-top: 16px;
        }
    }
}
</style>
