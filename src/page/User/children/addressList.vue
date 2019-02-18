<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.name}}</div>
            <div class="address-msg">{{item.remark}}</div>
            <div class="telephone">{{item.mobile}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault?'( 默认地址 )':'设为默认'"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div>
            <div class="operation">
              <a href="javascript:;" @click="update(item)">修改</a>
              <a href="javascript:;" :data-id="item.id" @click="del(item.id,i)">删除</a>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.id">
        <div>
          <input type="text" placeholder="收货人姓名" v-model="msg.name">
        </div>
        <div>
          <input type="number" placeholder="手机号码" v-model="msg.mobile">
        </div>
        <div>
          <input type="text" placeholder="收货地址" v-model="msg.remark">
        </div>
        <div>
          <span><input type="checkbox" v-model="msg.isDefault" style="margin-right: 5px;">设为默认</span>
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({id:msg.id,name:msg.name,mobile:msg.mobile,remark:msg.remark,isDefault:msg.isDefault})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import {addressList, addressUpdate, addressAdd, addressDel} from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import {getStore} from '/utils/storage'

  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          id: '',
          name: '',
          mobile: '',
          remark: '',
          isDefault: false
        }
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.name && msg.tel && msg.remark
      }
    },
    methods: {
      _addressList () {
        addressList({token: getStore('token')}).then(res => {
          let data = res.data
          if (data.length) {
            this.addList = res.data
            this.id = res.data[0].id || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          this._addressList()
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
      },
      // 保存
      save (p) {
        if (p.id) {
          this._addressUpdate(p)
        } else {
          delete p.id
          this._addressAdd(p)
        }
        this.popupOpen = false
      },
      // 删除
      del (id, i) {
        addressDel({id}).then(res => {
          if (res.status === '0') {
            this.addList.splice(i, 1)
          } else {
            alert('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.name = item.name
          this.msg.mobile = item.mobile
          this.msg.remark = item.remark
          this.msg.isDefault = item.isDefault
          this.msg.id = item.id
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.name = ''
          this.msg.mobile = ''
          this.msg.remark = ''
          this.msg.isDefault = false
          this.msg.id = ''
        }
      }
    },
    created () {
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;

    .name {
      width: 106px;
    }

    .address-msg {
      flex: 1;
    }

    .telephone {
      width: 160px;
    }

    .defalut {
      width: 80px;

      > a {
        text-align: center;
        /*display: none;*/
      }
    }

    .operation {
      width: 135px;

      a {
        padding: 10px 5px;
      }
    }

    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;

      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
