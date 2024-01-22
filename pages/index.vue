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
function clickVisible(){
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

function createGoogleMapLink(latitude: String, longitude: String) {

  if (latitude && longitude) {
    let link = "https://www.google.com/maps/dir/?api=1&destination=" + latitude + "," + longitude
    return link
  } else {
    return null
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

async function searchByProvince() {
  console.log(province_name.value)
  console.log(dateFilter.value)

  // return
  if (province_name.value && site_name) {
    try {
      loading.show()

      let auth_key = useGetAuthKey()
      // console.log(auth_key)
      const config = useRuntimeConfig();

      let url = config.public.baseURL + '/scrape/listTodayHotel'
      let result = await useFetch(url, {
        method: 'post',
        body: {
          province_name: province_name,
          site_name: site_name,
          dateFilter: dateFilter,
          auth: { auth_key: auth_key }
        }
      })
      console.log(result)
      if (result.status.value === 'success') {
        console.log(result.data.value.rows)
        let data_rows = result.data.value.rows
        for (let index = 0; index < data_rows.length; index++) {
          const element = data_rows[index];
          element.index = index + 1

        }
        console.log(data_rows)
        table_rows.value = data_rows

      }
    } catch (error) {

    } finally {
      loading.hide()
    }
  } else {
    useCustomAlert('รายละเอียดไม่ครบ', 'กรุณาระบุจังหวัดและเว็บไซต์')
  }

}

onMounted(() => {
  dateFilter.value = moment().format('YYYY-MM-DD');
})
</script>
<template>
  <!-- <q-btn @click="clickVisible">asda</q-btn> -->
  <q-page class="q-pa-lg">
    <div class="q-pa-md example-col-gutter-horizontal">
      <div class="row q-col-gutter-x-md">
        <q-input class="col-3" filled v-model="dateFilter" label="วันที่( ปี-เดือน-วัน )">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFilter" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select class="col-3" filled emit-value map-options transition-show="jump-up" transition-hide="jump-up"
          v-model="site_name" :options="site_name_options" label="เว็บไซต์" />

        <q-select class="col-3" filled transition-show="jump-up" transition-hide="jump-up" v-model="province_name"
          :options="province_option" label="เลือกจังหวัด" />

        <q-btn class="col-2 q-ml-lg" color="primary" @click="searchByProvince">ค้นหา</q-btn>
      </div>
    </div>
    <div class="q-pa-md">
      
      <q-table auto-width style="height: 75vh;" class="my-sticky-header-table" flat bordered title="ช้อมูลโรงแรม"
        :rows="table_rows" :columns="table_columns" row-key="name" no-data-label="ไม่พบข้อมูลที่ท่านค้นหา"
        :visible-columns="visibleColumns" separator="cell" :pagination="initialPagination">
        <template v-slot:top>
<!-- 
          <q-space />
          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleColumns" val="ลำดับที่" label="ลำดับที่" />
            <q-toggle v-model="visibleColumns" val="(จำนวนห้องประมาณการ) ชื่อโรงแรม" label="(จำนวนห้องประมาณการ) ชื่อโรงแรม" />
            <q-toggle v-model="visibleColumns" val="ที่อยู่" label="ที่อยู่" />
            <q-toggle v-model="visibleColumns" val="แผนที่" label="Protein" />
            <q-toggle v-model="visibleColumns" val="ราคาต่ำสุด" label="ราคาต่ำสุด" />
            <q-toggle v-model="visibleColumns" val="เพิ่มเติม" label="เพิ่มเติม" />
            <q-toggle v-model="visibleColumns" val="วันที่เก็บข้อมูล" label="วันที่เก็บข้อมูล" />
          </div>
          <q-select v-else v-model="visibleColumns" multiple borderless dense options-dense
            :display-value="$q.lang.table.columns" emit-value map-options :options="table_columns" option-value="name"
            style="min-width: 150px" /> -->

          <q-space />

          <q-select v-model="visibleColumns" multiple outlined dense label="ตารางที่แสดง" options-dense
            :display-value="$q.lang.table.columns" emit-value map-options :options="table_columns" option-value="name"
            options-cover style="min-width: 150px" />
        </template>
        <template v-slot:body-cell-latitude="props">
          <q-td :props="props">
            <div v-show="(props.row.latitude && props.row.longitude)">
              <q-btn class="full-width" outline icon="location_on"
                :href="createGoogleMapLink(props.row.latitude, props.row.longitude)" target="_blank" label="เปิดแผนที่"
                color="blue" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-hotel_info_link="props">
          <q-td :props="props">
            <div v-show="props.row.hotel_info_link">
              <q-btn :href="props.row.hotel_info_link" target="_blank" label="ไปยังเว็บ" color="green" />

            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-address="props">
          <q-td :props="props">
            <p>{{ props.row.address }}</p>
          </q-td>
        </template>
        <template v-slot:body-cell-hotel_name="props">
          <q-td :props="props">

            <!-- <div>
              {{ props.row.hotel_name }}
              <q-badge class="float-left ma-lg" color="orange"> {{ checkTotalRoom(props.row.total_room) }}</q-badge>
            </div> -->
            <div v-if="props.row.total_room > 0">
              <q-chip>
                <q-avatar color="green" text-color="white">{{ checkTotalRoom(props.row.total_room) }}</q-avatar>
                {{ props.row.hotel_name }}
              </q-chip>
            </div>
            <div v-if="props.row.total_room === 0">
              <q-chip>
                <q-avatar color="red" text-color="white">X</q-avatar>
                {{ props.row.hotel_name }}
              </q-chip>
            </div>
          </q-td>
        </template>
      </q-table>

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
