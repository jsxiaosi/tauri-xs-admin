<script setup lang="ts"></script>

<template>
  <div class="comment">
    <ul>
      <li v-for="(_item, index) in 4" :key="index">
        <div class="item">
          <img src="@/assets/login/logo.png" />
          <div class="item-content">
            <span class="title">某某某</span>
            <span class="time">2021-12-31</span>
            <span class="text">
              据我观察，你今天吃意大利面遇到不良商家，没有拌42号混凝土，以及使用劣质螺丝钉，严重影响你的扭矩，从而影响UFO的产量，吸收不足引发内蜂蜜失调，导致排放系统紊乱，对整个太平洋以及充电器造成严重的核污染。我个人认为，这个意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩你知道吧，你往里砸的时候，一瞬间它就会产生大量的高能蛋白。
            </span>
          </div>
        </div>
        <el-divider v-if="index !== 3" border-style="double" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .comment {
    width: 100%;
    height: 410px;
    overflow-y: auto;

    .item {
      display: flex;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .item-content {
        display: flex;
        flex-direction: column;
        margin-left: 16px;

        .title {
          font-size: var(--font-size-medium);
        }

        .time {
          margin: 5px 0;
          font-size: var(--font-size-extra-small);
        }

        .text {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          /* stylelint-disable-next-line property-no-deprecated */
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
