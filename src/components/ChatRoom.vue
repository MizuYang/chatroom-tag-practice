<template>
  <div class="container">
    <div class="row row-cols-2 justify-content-center">
      <!-- 學生對話窗(左邊) -->
      <section class="w-40 position-relative bg-chatroom-header border chatroom-h overflow-scrollY px-0 me-5" ref="studentChat">
        <!-- 對話的對象 -->
        <header class="position-sticky top-0 zIndex1">
          <h2 class="chatroom-title text-light text-center lh-base py-2">
            老師
            <a href="javascript:;" class="position-absolute end-0 border-start ps-3 me-3 ">
              <img src="../assets/chatroom/設定圖標.png" alt="設定圖標" height="40">
            </a>
          </h2>
        </header>

        <!-- 對話內容 -->
        <div class="container contentBodyStu my-4">
          <div v-for="(val, index) in chat" :key="`${val.content}${index}`" class="lh-lg mb-2">
            <div class="d-flex align-items-center">
              <div class="w-20">
                <div class="d-flex align-items-center">
                  <!-- 大頭貼、姓名-->
                  <img src="../assets/chatroom/默認大頭貼.png" alt="默認大頭貼" width="20" height="20" class="me-1">
                  <strong>{{ val.name }}</strong>
                </div>
                <!-- 日期 -->
                <span :data-time="val.time" class="ms-auto"></span>
              </div>
              <!-- 對話氣泡 -->
              <span class="w-80 position-relative border-0 rounded-1 bg-light p-2"
                  :class="{'bg-myChar': val.name==='小華'}">
                {{ val.content }}
                <!-- 對話氣泡三角形 -->
                <span class="triangle" :class="{'triangle-myChar': val.name==='小華'}"></span>
              </span>

            </div>
          </div>
        </div>
        <!-- Tag 名單 -->
        <ul class="tag w-100 list-unstyled overflow-scrollY" v-if="tagList.length > 0">
          <li v-for="persons in tagList" :key="persons" class="mb-2">
            <button type="button" class="btn btn-secondary w-100" @click="selectTagName(persons)">
              <div class="d-flex align-items-center justify-content-center">
                <img src="../assets/chatroom/默認大頭貼.png" alt="默認大頭貼" width="20" height="20" class="d-block me-1">
                <span>{{ persons }}</span>
              </div>
            </button>
          </li>
        </ul>

        <!-- 文字輸入列表 -->
        <footer class="w-100 bg-chatroom-footer position-sticky bottom-0 h-60px">
          <!-- Icons 元件 -->
          <div class="position-absolute emoji-position" v-if="stuIconShow">
            <EmojiItem :status="'student'" @stuAddEmoji="stuAddEmoji" data-watch="emoji"></EmojiItem>
          </div>
          <div class="d-flex align-items-center justify-content-center h-100">
            <!-- Icons 按鈕 -->
            <a href="javascript:;" class="me-2" @click="stuIconShow = !stuIconShow">
              <img src="../assets/chatroom/貼圖按鈕.png" alt="表情貼圖按鈕" width="40">
            </a>
            <!-- 文字框 -->
            <textarea cols="45" rows="1" class="fs-2 ps-2" v-model.trim="studentTxt" ref="studentTxt" placeholder="請輸入文字"></textarea>
            <!-- 送出按鈕 -->
            <button type="button" class="btn btn-lg btn-primary ms-2" @click="stuSendTxt" :disabled="!studentTxt">送出</button>
          </div>
        </footer>
      </section>

      <!-- 老師對話窗(右邊) -->
      <section class="w-40 position-relative bg-chatroom-header border chatroom-h overflow-scrollY px-0" ref="teacherChat">
        <!-- 對話的對象 -->
        <header class="position-sticky top-0 zIndex1">
          <h2 class="chatroom-title text-light text-center lh-base py-2">
            學生
            <a href="javascript:;" class="position-absolute end-0 border-start ps-3 me-3 ">
              <img src="../assets/chatroom/設定圖標.png" alt="設定圖標" height="40">
            </a>
          </h2>
        </header>
        <!-- 對話內容 -->
        <div class="container contentBodyStu my-4">
          <div v-for="(val, index) in chat" :key="`${val.content}${index}`" class="lh-lg mb-2">
            <div class="d-flex align-items-center">
              <div class="w-20">
                <div class="d-flex align-items-center">
                  <!-- 大頭貼、姓名 -->
                  <img src="../assets/chatroom/默認大頭貼.png" alt="默認大頭貼" width="20" height="20" class="me-1">
                  <strong>{{ val.name }}</strong>
                </div>
                <!-- 日期 -->
                <span :data-time="val.time" class="ms-auto"></span>
              </div>
              <!-- 對話氣泡 -->
              <span class="w-80 position-relative border-0 rounded-1 bg-light p-2"
                  :class="{'bg-myChar': val.name==='王老師'}">
                {{ val.content }}
                <!-- 對話氣泡三角形 -->
                <span class="triangle" :class="{'triangle-myChar': val.name==='王老師'}"></span>
              </span>
            </div>
          </div>
        </div>

        <!-- 文字輸入列表 -->
        <footer class="w-100 bg-chatroom-footer position-sticky bottom-0 h-60px">
          <!-- Icons 元件 -->
          <div class="position-absolute emoji-position" v-if="teaIconShow">
            <EmojiItem :status="'teacher'" @teaAddEmoji="teaAddEmoji"></EmojiItem>
          </div>
          <div class="d-flex align-items-center justify-content-center h-100">
            <!-- Icons 按鈕 -->
            <a href="javascript:;" class="me-2" @click="teaIconShow = !teaIconShow">
              <img src="../assets/chatroom/貼圖按鈕.png" alt="表情貼圖按鈕" width="40">
            </a>
            <!-- 文字框 -->
            <textarea cols="45" rows="1" class="fs-2 ps-2" v-model.trim="teacherTxt" ref="teacherTxt" placeholder="請輸入文字"></textarea>
             <!-- 送出按鈕 -->
            <button type="button" class="btn btn-lg btn-primary ms-2" @click="TeaSendTxt" :disabled="!teacherTxt">送出</button>
          </div>
        </footer>

      </section>
    </div>
  </div>

   <IsLoading v-model:active="isLoading"></IsLoading>
</template>

<script>
import EmojiItem from '../components/EmojiItem.vue'
import PersonName from '../mixins/PersonName.vue'
export default {
  components: {
    EmojiItem
  },

  mixins: [PersonName],

  data () {
    return {
      isLoading: false,
      // chat: [
      //   {
      //     status: 'teacher',
      //     name: '王老師',
      //     content: '你好，我是小明老師，記得打卡簽到唷!!',
      //     time: '上午10:00'
      //   },
      //   {
      //     status: 'teacher',
      //     name: '王老師',
      //     content: '這是報到的 QR Code!',
      //     time: '上午10:02'
      //   },
      //   {
      //     status: 'student',
      //     name: '小華',
      //     content: '謝謝老師，我想順便請問作業是寫到第二章節就可以嗎?目前正準備開始寫作業!',
      //     time: '上午10:02'
      //   },
      //   {
      //     status: 'teacher',
      //     name: '王老師',
      //     content: '沒有錯，記得要準時繳交唷!!',
      //     time: '上午10:04'
      //   },
      //   {
      //     status: 'student',
      //     name: '小華',
      //     content: '謝謝老師，我已經開始蒐集作業資料，順便整理了一下筆記，希望明天可以準時提交作業。',
      //     time: '上午10:20'
      //   },
      //   {
      //     status: 'teacher',
      //     name: '王老師',
      //     content: '不客氣^^',
      //     time: '上午11:30'
      //   }
      // ],
      chat: [],
      studentTxt: '',
      teacherTxt: '',
      stuIconShow: false,
      teaIconShow: false,
      // tempTagName: '',
      tagName: [],
      tagList: [] //* 符合標記名稱名單
    }
  },

  watch: {
    studentTxt (newVal, oldVal) {
      //* 字串英文轉小寫
      const nVal = newVal.toLowerCase()
      const oVal = oldVal.toLowerCase()

      const inputTag = nVal[nVal.length - 1] === '@'
      //* 用戶輸入"@"顯示所有名單
      if (inputTag) {
        this.tagList = this.personsList
      }
      //* 若將"@"刪掉，則清空 Tag 列表
      if (oVal[oVal.length - 1] === '@' && nVal[nVal.length - 1] !== '@') {
        this.tagList = []
      }
      //* 判斷名稱有部分相符就做顯示
      for (let i = 0; i <= nVal.length; i++) {
        if (nVal[nVal.length - 2 - i] === '@') {
          this.tagList = this.personsList.filter(name => {
            return name.includes(nVal.slice(nVal.length - 1 - i, nVal.length))
          })
        }
      }

      //* 按下送出的初始化
      // this.tagName = []
      // this.tagList = []
    }
  },

  methods: {
    //* 學生送出訊息
    stuSendTxt () {
      //* 取得時間
      const dateSplit = new Date().toLocaleString().split(' ')[1].split(':')
      const time = `${dateSplit[0]}:${dateSplit[1]}`

      this.chat.push({
        status: 'student',
        name: '小華',
        content: this.studentTxt,
        time: time
        //! 可能要判斷 studentTxt 中 tag 幾個人
        //! template 可能判斷如果有 tagName 就跑函式，包裝成 span 來做樣式處理?
        //! 最壞打算就是用 v-html 來做了
        // tagName: [],
      })

      //* 初始化
      this.studentTxt = ''
      this.$refs.studentTxt.focus()
      //* 對話內容增加時，畫面自動捲動到最下面
      this.$nextTick(() => {
        //* 老師聊天室捲動置底
        this.$refs.teacherChat.scrollTop = this.$refs.teacherChat.scrollHeight
        //* 學生聊天室捲動置底
        this.$refs.studentChat.scrollTop = this.$refs.studentChat.scrollHeight
      })
    },
    //* 老師送出訊息
    TeaSendTxt () {
      //* 取得時間
      const dateSplit = new Date().toLocaleString().split(' ')[1].split(':')
      const time = `${dateSplit[0]}:${dateSplit[1]}`

      this.chat.push({
        status: 'teacher',
        name: '王老師',
        content: this.teacherTxt,
        time: time
      })
      //* 初始化
      this.teacherTxt = ''
      this.$refs.teacherTxt.focus()
      //* 對話內容增加時，畫面自動捲動到最下面
      this.$nextTick(() => {
        //* 老師聊天室捲動置底
        this.$refs.teacherChat.scrollTop = this.$refs.teacherChat.scrollHeight
        //* 學生聊天室捲動置底
        this.$refs.studentChat.scrollTop = this.$refs.studentChat.scrollHeight
      })
    },
    //* 學生新增 emoji
    stuAddEmoji (emoji) {
      this.studentTxt = `${this.studentTxt}${emoji}`
    },
    //* 老師新增 emoji
    teaAddEmoji (emoji) {
      this.teacherTxt = `${this.teacherTxt}${emoji}`
    },
    //* 點擊@標記對象的名稱
    selectTagName (name) {
      for (let i = 0; i < name.length; i++) {
        //* 直接將@後面的字元當作是tag名
        const tagIndex = this.studentTxt.split('').findIndex(word => {
          return word === '@'
        })
        //* 取得用戶輸入的 tag 名 (直接取"@"的下一位到最後一個字元)
        const tagName = this.studentTxt.split('').slice(tagIndex + 1, this.studentTxt.split('').length).join('')
        //* 跟點擊的名稱做比對，若名稱相同才執行(驗證資料庫有該名稱)
        if (name.includes(tagName)) {
          this.studentTxt = this.studentTxt.replace(`@${tagName}`, ` @${name} `)
          return
        }
      }

      //! 此方法只能從姓氏開頭才可使用(O：@王小明、@王小  ||  X：@小明、@明)
      // for (let i = 0; i < name.length; i++) {
      //   //* 測出用戶鍵入的tag名稱，用遞減的方式 (用戶可能是輸入：@王、@王小、@王小明，因此需判斷他輸入啥)
      //   const inputName = name.split('').slice(0, name.length - i).join('')
      //   //* 若點擊的tag名稱有在用戶輸入欄位中才執行
      //   if (this.studentTxt.includes(inputName)) {
      //     //* 將用戶欄位中的名稱換成資料庫的全名
      //     this.studentTxt = this.studentTxt.replace(`@${inputName}`, ` @${name} `)
      //     return
      //   }
      // }
    }
  },

  mounted () {
    //* 監聽聊天室窗，若點擊的不是 Emoji 則隱藏 Emoji
    //* 監聽學生
    this.$refs.studentChat.addEventListener('click', (e) => {
      if (!e.target.classList.value) return
      if (!e.target.classList.value.includes('emoji')) {
        this.stuIconShow = false
      }
    })
    //* 監聽老師
    this.$refs.teacherChat.addEventListener('click', (e) => {
      if (!e.target.classList.value) return
      if (!e.target.classList.value.includes('emoji')) {
        this.teaIconShow = false
      }
    })
  }

}
</script>

<style lang='scss' scope>
textarea {
  resize:none;
  width: 70%;
}
.w-20 {
  width: 20%;
}
.w-40 {
  width: 40%;
}
.w-80 {
  max-width: 80%;
}
.h-60px{
  height: 60px;
}
.bg-chatroom-header {
  background-image: url('../assets/chatroom/LINE聊天室背景.webp');
  background-repeat: no-repeat;
}
.chatroom-title {
  background-color: #3B4555;
}
.chatroom-h {
  height: calc(100vh - 50px);
}
.bg-chatroom-footer {
  background-color: #EBEDEF;
}
.rounded-1 {
  border-radius: 15px !important;
}
//* 對話氣泡三角形
.triangle::before {
  position: absolute;
  top: 50%;
  left: -12px;
  transform: translateY(-50%);
  display: inline-block;
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) transparent transparent;
}
//* 自己的對話氣泡 - 綠色
.bg-myChar {
  background-color: #84E148 !important;
}
//* 自己的對話氣泡三角形 - 綠色
.triangle-myChar::before {
  border-color: transparent #84E148 transparent transparent;
}
//* 日期時間
[data-time]::after {
  content: attr(data-time) "";
}
//* 滾動條
.overflow-scrollY {
  overflow-y: scroll;
}
.contentBodyStu {
  min-height: calc( 100vh - 224px );
}
.zIndex1 {
  z-index: 1;
}
//* 表情包位置調整
.emoji-position {
  left: 20px;
  bottom: 60px;
}
.tag {
  position: absolute;
  bottom: 45px;
  max-height: 150px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.563);
  // color: #fff;
}
</style>
