<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QBtnProps, QNotifyOptions } from 'quasar'
import moment from 'moment';
// import { useGoogleFonts } from "@nuxtjs/google-fonts";


const { dialog, fullscreen, bottomSheet, loading, loadingBar, notify, dark } = useQuasar()

loadingBar.setDefaults({
  color: 'green',
  size: '15px',
  position: 'bottom',
})

const province_option = [
  'ขอนแก่น', 'อุดรธานี', 'นครราชสีมา', 'สกลนคร', 'ชัยภูมิ', 'นครพนม', 'กาฬสินธุ์', 'เลย', 'ร้อยเอ็ด', 'หนองคาย'
]

const textEdit = ref('')
// 1. traveloka.com
// 2. trip.com
// 3. booking.com
// 4. expedia.co.th
// 5. agoda.com
// 6. airbnb.com
// const site_name_options = [
//   'agoda', 'booking', 'airbnb', 'expedia', 'traveloka', 'trip'
// ]

const site_name_options = [
  {
    label: 'Agoda.com',
    value: 'agoda',
  },
  {
    label: 'Booking.com',
    value: 'booking',
  },
  {
    label: 'Airbnb.com',
    value: 'airbnb',
  },
  {
    label: 'Expedia.com',
    value: 'expedia',
  },
  {
    label: 'Traveloka.com',
    value: 'traveloka',
    disable: true,
  },
  {
    label: 'Trip.com',
    value: 'trip',
    disable: true,
  }
]
const province_name = ref(null)
const site_name = ref(null)
const dateFilter = ref(null)
const table_columns = [
  { name: 'index', label: 'ลำดับที่', align: 'center', field: 'index', sortable: true, headerStyle: 'width: 5px', style: "max-width: 5px" },
  { name: 'hotel_name', align: 'left', label: '(จำนวนห้องประมาณการ) ชื่อโรงแรม', field: 'hotel_name', sortable: true, },
  { name: 'address', align: 'left', label: 'ที่อยู่', field: 'address', sortable: true, },
  { name: 'latitude', align: 'center', label: 'แผนที่', field: 'latitude', sortable: true },
  { name: 'price_min', align: 'center', label: 'ราคาต่ำสุด', field: 'price_min', format: (val, row) => `${numberFormat(val)} บาท`, sortable: true },
  // { name: 'total_room', align: 'left', label: 'จำนวนห้อง(ประมาณการ)', field: 'total_room', sortable: true },
  { name: 'hotel_info_link', align: 'left', label: 'เพิ่มเติม', field: 'hotel_info_link' },
  { name: 'created_at', align: 'center', label: 'วันที่เก็บข้อมูล', field: 'created_at', format: (val, row) => convertTimestamp(val), sortable: true },
]


const visibleColumns = ref(['index', 'hotel_name', 'address', 'latitude', 'price_min', 'hotel_info_link', 'created_at'])
const table_rows = ref([])
const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 10
  // rowsNumber: xx if getting data from a server
}
function clickVisible() {
  console.log(visibleColumns.value)
}

const showBottomsheet = () => bottomSheet({
  message: 'Bottom Sheet',
  actions: [
    {
      label: 'Drive',
      img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
      id: 'drive'
    },
    {
      label: 'Keep',
      img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
      id: 'keep'
    },
    {
      label: 'Google Hangouts',
      img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
      id: 'calendar'
    },
    {
      label: 'Calendar',
      img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
      id: 'calendar'
    },
  ]
})

const random = <T extends string>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)]

type Position = Exclude<QNotifyOptions['position'], undefined>



const buttons: QBtnProps[] = [
  {
    label: 'Fullscreen',
    onClick: () => fullscreen.toggle()
  },
  {
    label: "Bottomsheet",
    onClick: () => showBottomsheet()
  },
  {
    label: 'Loading',
    onClick: () => {
      loading.show()
      setTimeout(() => {
        loading.hide()
      }, 1000)
    }
  },
  {
    label: 'LoadingBar',
    onClick: () => {
      loadingBar.start()
      setTimeout(() => {
        loadingBar.stop()
      }, 1000)
    }
  },
  {
    label: 'Dialog',
    onClick: () => dialog({ message: 'Hello World' })
  },
  {
    label: 'Dark',
    onClick: () => dark.toggle()
  },
  {
    label: 'Notify',
    onClick: () => notify({
      message: 'Hello World',
      position: random<Position>([
        'left',
        'right',
        'center',
        'bottom',
        'top',
      ])
    })
  },
]
function numberFormat(number: any) {
  if (number) {
    return Intl.NumberFormat('en-US').format(parseFloat(number))
  } else {
    return ""
  }
}


function convertTimestamp(datetime: string) {
  let dbtime = moment(datetime);
  let formattedDate = dbtime.format("DD-MM-YYYY");
  return formattedDate // Output: 26-12-2023
}

function checkTotalRoom(total_room: Number) {
  if (total_room === 0) {
    return "ไม่ระบุ"
  }
  return total_room
}
function onRejected(rejectedEntries) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  try {
    console.log(rejectedEntries)
  } catch (error) {

  }
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

// return { onRejected }


function pasteCapture(event) {
  console.log(event)
}
function dropCapture(event) {
  console.log(event)
}



onMounted(() => {
  dateFilter.value = moment().format('DD-MM-YYYY');
})
</script>
<template>
  <!-- <q-btn @click="clickVisible">asda</q-btn> -->
  <q-page class="q-pa-lg">
    <div>
      <h4 class="q-pa-sm q-ma-sm text-center">เพิ่มจดหมายข่าว</h4>
    </div>

    <div class="q-pa-md example-col-gutter-horizontal q-gutter-x-xs q-gutter-y-lg">

      <div class="row q-col-gutter-x-md">
        <q-input outlined dense class="col-9" label="หัวข้อ"></q-input>
        <q-input class="col-3" dense outlined v-model="dateFilter" label="วันที่( วัน-เดือน-ปี )">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFilter" mask="DD-MM-YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- 
        <q-select class="col-3" filled emit-value map-options transition-show="jump-up" transition-hide="jump-up"
          v-model="site_name" :options="site_name_options" label="เว็บไซต์" />

        <q-select class="col-3" filled transition-show="jump-up" transition-hide="jump-up" v-model="province_name"
          :options="province_option" label="เลือกจังหวัด" /> -->

        <!-- <q-btn class="col-2 q-ml-lg" color="primary" @click="searchByProvince">ค้นหา</q-btn>  -->
      </div>
      <div class="q-gutter-sm">
        <q-editor v-model="textEdit" @paste.native="evt => pasteCapture(evt)" @drop.native="evt => dropCapture(evt)"
          :dense="$q.screen.lt.md" :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify']
              },
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: [

                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'p',
                ]
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              },

            ],
            ['quote', 'unordered', 'ordered'],

            ['undo', 'redo'],
            // ['viewsource']
          ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />
      </div>
      <div class="row q-col-gutter-x-md">

        <div class="col-6">
          <div class="column justify-around" style="height: 100%">
            <div class="col-4 justify-start">
              <q-input outlined dense label="ขื่อ Tag"></q-input>
            </div>
            <div class="col-4  self-center">
              <q-btn size="xl" push color="green" label="บันทึกข่าว"></q-btn>
            </div>
          </div>

        </div>
        <div class="col-6">
          <q-uploader url="http://localhost:4444/upload" label="เพิ่มภาพ ( ไม่เกิน 3 ภาพ )" multiple hide-upload-btn
            style="height: 250px;width: 100%;" max-files="3">
            <template v-slot:list="scope">
              <q-list separator>

                <q-item v-for="file in scope.files" :key="file.__key">
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      {{ file.name }}
                    </q-item-label>

                    <q-item-label caption>
                      Status: {{ file.__status }}
                    </q-item-label>

                    <q-item-label caption>
                      {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                    <img :src="file.__img.src">
                  </q-item-section>

                  <q-item-section top side>
                    <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="scope.removeFile(file)" />
                  </q-item-section>
                </q-item>

              </q-list>
            </template>
          </q-uploader>
        </div>
      </div>
    </div>

    <div class="q-pa-md">


    </div>

    <!-- <p class="text-h6 q-pt-md">
      Plugin Showcase
    </p>
    <q-list>
      <q-item
        v-for="(button, idx) in buttons"
        :key="idx"
      >
        <q-btn
          color="primary"
          v-bind="button"
        />
      </q-item>
    </q-list>
    <p class="text-h6 q-pt-md">
      Directive Showcase
    </p>
    <example-list /> -->
  </q-page>
</template>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #a73c24

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
.top-left-badge 
      position: fixed
      top: 10px
      left: 10px
    
</style>
