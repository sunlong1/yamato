<template>
  <div class="paylater-box" v-if="start_show">
    <div class="paylater">
      <div class="paylater-banner">
        <h6>AED <span>50.00</span></h6>
        <p>Credit Pending</p>
        <div class="active" @click="confirm">Activate</div>
        <div class="banner-text">Use now, Pay later & No fees, up to 40 days </div>
      </div>
      <div class="list">
        <ul>
          <li @click="jump_charge">
            <div class="li-left">
              <img src="../assets/index/Topup.png" />
              <div class="li-left-text">
                <h6>Mobile Topup</h6>
                <p>Etisalat & du at a discount!</p>
              </div>
            </div>
            <img class="li-right" src="../assets/index/right_grey.png" />
          </li>
        </ul>
      </div>
      <div class="whatpaylater"><router-link :to="{name:'repayment',query:{source: 'index'}}"><img src="../assets/index/FAQ.png"></router-link></div>
    </div>
  </div>
</template>

<script>
// import { getIndexMess } from '../api/getData'
// import rButton from './rButton'
// import {mapActions} from 'vuex'
// import copy from 'copy-to-clipboard';

// const components = {}
// components[rButton.name] = rButton
export default {
  name: 'index',
  // components,
  data () {
    return {
      isVip: 0, //0是非vip 1是vip
      is_cashNow_user: 0, // 1是在cashnow借过
      start_show: 1 //如果已经开通就不用渲染首页，不用显示
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      alert('network error!')
    },
    jump_charge () {
      // let url = location.host.indexOf('payby.com')>-1?'https://m.payby.com/charge':'https://sim-m.test2pay.com/charge'
      window.location.href = 'https://m.payby.com/topUp/mobile'
    },
    copyButton () {
      copy('https://www.cnblogs.com/guohu/p/9764869.html', {
        debug: true,
        message: 'Press #{key} to copy',
      });
    }
  }
}
</script>
<style scoped lang="less">
  .paylater-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .paylater {
      .paylater-banner {
        width: 100%;
        height: 220px;
        background: url(../assets/index/bg.png) no-repeat left top;
        background-size: cover;
        text-align: center;
        color: #FFFFFF;
        h6 {
          font-size: 14px;
          padding-top: 42px;
          span {
            font-size: 48px;
          }
        }
        p {
          font-size: 14px;
          font-weight: bold;
        }
        .active {
          width: 112px;
          height: 32px;
          line-height: 32px;
          background: #FFFFFF;
          border-radius: 18px;
          color: #000000;
          margin: 12px auto;
          font-size: 14px;
          font-weight: bold;
        }
        .banner-text {
          font-size: 14px;
          font-weight: normal;
        }
      }
      .whatpaylater {
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
      .list {
        padding: 22px 16px;
        ul {
          li {
            padding: 10px 12px;
            background-image: linear-gradient(45deg, #2AE1FF 0%, #546BEA 100%);
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .li-left {
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 44px;
                padding-right: 11px;
              }
              .li-left-text {
                color: #FFFFFF;
                h6 {
                  font-size: 16px;
                }
                p {
                  font-size: 12px;
                }
              }
            }
            .li-right {
              width: 10px;
              height: 16px;
            }
          }
          .card-two {
            margin-top: 18px;
            background-image: linear-gradient(45deg, #6A4CFA 0%, #3FC5FF 100%);
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
            .li-left {
              img {
                width: 46px;
                padding: 0 10px 0 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
