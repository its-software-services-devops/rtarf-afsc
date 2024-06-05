<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QBtnProps, QNotifyOptions } from 'quasar'
import moment from 'moment'
// import { useGoogleFonts } from "@nuxtjs/google-fonts";

const imageList = [
  {
    img: new URL('../assets/images/img-1.jpg', import.meta.url).href,
    link: "https://ibb.co/s2bpdcD"

  }
  ,
  {
    img: new URL('../assets/images/img-2.jpg', import.meta.url).href,
    link: "https://ibb.co/TDXt0k3"
  }
  ,
  {
    img: new URL('../assets/images/img-3.jpg', import.meta.url).href,
    link: "https://ibb.co/nMzDFmz"
  }
  ,
  {
    img: new URL('../assets/images/img-4.jpg', import.meta.url).href,
    link: "https://ibb.co/m4vPqc0"
  }
  ,
  {
    img: new URL('../assets/images/img-5.jpg', import.meta.url).href,
    link: "https://ibb.co/8NZFw3z"
  }
  ,
  {
    img: new URL('../assets/images/img-6.jpg', import.meta.url).href,
    link: "https://ibb.co/swH5Mfz"
  }
  ,
  {
    img: new URL('../assets/images/img-7.jpg', import.meta.url).href,
    link: "https://ibb.co/VmR6Yxr"
  }
  ,
  {
    img: new URL('../assets/images/img-8.jpg', import.meta.url).href,
    link: "https://ibb.co/hZ4vmfY"
  }
  ,
  {
    img: new URL('../assets/images/img-9.jpg', import.meta.url).href,
    link: "https://ibb.co/C92JdQr"
  }
  ,
  {
    img: new URL('../assets/images/img-10.jpg', import.meta.url).href,
    link: "https://ibb.co/J5VmB23"
  }
]


const { dialog, fullscreen, bottomSheet, loading, loadingBar, notify, dark } = useQuasar()

loadingBar.setDefaults({
  color: 'green',
  size: '15px',
  position: 'bottom',
})

// title: "title1",
//         paragraph: "paragrapt",
//         tag: "tag1",
//         images: ['image1', 'image2', 'image3'],
//         created_date: "",
//         updated_date: "",
//         updated_by: "",
//         created_by: "admin"
const file = ref(null)
const excelFile = ref("")
const isEditMode = ref(false)
const textEdit = ref('')
const filter = ref('')
const dateFilter = ref(null)
const table_columns = [
  { name: 'index', label: 'ลำดับที่', align: 'center', field: 'index', sortable: true, headerStyle: 'width: 3px' },
  { name: 'title', align: 'left', label: 'ชื่อข่าว', field: 'title', sortable: true, },
  { name: 'paragraph', align: 'left', label: 'รายละเอียดโดยย่อ', field: 'paragraph' },
  { name: 'tag', align: 'center', label: 'Tag', field: 'tag', sortable: true },
  { name: 'created_date', align: 'center', label: 'วันที่สร้าง', field: 'created_date', format: (val, row) => `${convertTimestamp(val)}`, sortable: true },
  // { name: 'total_room', align: 'left', label: 'จำนวนห้อง(ประมาณการ)', field: 'total_room', sortable: true },
  { name: 'created_by', align: 'left', label: 'สร้างโดย', field: 'created_by' },
  // { name: 'created_at', align: 'center', label: 'วันที่เก็บข้อมูล', field: 'created_at', format: (val, row) => convertTimestamp(val), sortable: true },
]


// const visibleColumns = ref(['index', 'hotel_name', 'address', 'latitude', 'price_min', 'hotel_info_link', 'created_at'])
const table_rows = ref([
  {
    index: 1,
    title: "สถานการณ์ภายในประเทศ",
    paragraph: `<div style="text-align: center;"><img src="https://picsum.photos/500/300" height="200">&nbsp;</div><blockquote>เมื่อ วันที่ 12 มกราคม 2567 เมื่อเวลา 10.00 น. ที่อาคารศรียานนท์ รพ.ตํารวจ ถนนพระรามที่ 1 นายชัยชนะ เดชเดโช สส.นครศรีธรรมราช ในฐานะประธานคณะกรรมาธิการตํารวจ สภา ผู้แทนราษฎร นัดหมายผู้บริหารรพ.ตํารวจ ขอเดินทางเข้าไปศึกษาดูงาน และเยี่ยมชมการปฏิบัติหน้าที่ในการ ควบคุมผู้ต้องขังป่วยที่รักษาตัวอยู่ โดยมุ่งเน้นไปที่นายทักษิณ ชินวัตร อดีตนายกฯ นักโทษคดีทุจริต รักษาตัว อยู่ที่ชั้น 14 อาคารมหาภูมิพลราชานุสรณ์ 88 พรรษา</blockquote><div><img src="https://picsum.photos/500/300" height="200" style="text-align: center;"><span style="text-align: center;">&nbsp;</span><br></div><div style="text-align: right;">เมื่อ วันที่ 12 มกราคม 2567 เมื่อเวลา 10.00 น. ที่อาคารศรียานนท์ รพ.ตํารวจ ถนนพระรามที่ 1 นายชัยชนะ เดชเดโช สส.นครศรีธรรมราช ในฐานะประธานคณะกรรมาธิการตํารวจ สภา ผู้แทนราษฎร นัดหมายผู้บริหารรพ.ตํารวจ ขอเดินทางเข้าไปศึกษาดูงาน และเยี่ยมชมการปฏิบัติหน้าที่ในการ ควบคุมผู้ต้องขังป่วยที่รักษาตัวอยู่ โดยมุ่งเน้นไปที่นายทักษิณ ชินวัตร อดีตนายกฯ นักโทษคดีทุจริต รักษาตัว อยู่ที่ชั้น 14 อาคารมหาภูมิพลราชานุสรณ์ 88 พรรษา</div>`,
    tag: "ภายในประเทศ",
    // images: ['image1', 'image2', 'image3'],
    images: [
      imageList[0].img,
      imageList[1].img,
      imageList[2].img,
    ],
    created_date: "01-01-2024",
    updated_date: "01-01-2024",
    updated_by: "admin",
    created_by: "admin"
  },
  {
    index: 2,
    title: "สถานการณ์ภายนอกประเทศ",
    paragraph: `<img src="https://picsum.photos/500/300" height="200">เมื่อ 4 พ.ย.66 พล.ท.คําเลียง อุทะไกสอน รองรัฐมนตรีกระทรวงป้องกันประเทศ หัวหน้ากรมใหญ่เสนาธิ
การ กองทัพประชาชนลาว ได้ลงตรวจพื้นที่เพื่อเตรียมความพร้อมสําหรับการซ้อมรบร่วมของกองทัพ “ลาว-รัสเซีย” ครั้งใหญ่ 
ภายใต้รหัส “LAROS-2022” ซึ่งจะจัดขึ้นในแขวงเชียงขวาง ภาคตะวันออกเฉียงเหนือของลาว ที่มีชายแดนติดกับประเทศ
เวียดนาม`,
    tag: "ภายนอกประเทศ",
    // images: ['image1', 'image2', 'image3'],
    images: [
      imageList[3].img,
      imageList[4].img,
      imageList[5].img,
    ],
    created_date: "01-01-2024",
    updated_date: "01-01-2024",
    updated_by: "admin",
    created_by: "admin"
  },
  {
    index: 3,
    title: "กลุ่มผู้ได้รับความเดือดร้อน",
    paragraph: `เมื่อ 27 ธ.ค. 66 กลุ่มประมงพาณิชย์และประมงต่อเนื่องใน จ.ระยอง รวมทั้งกลุ่ม
ประมงสมาคมปากน้ําประแสร์ อ.แกลง จ.ระยอง&nbsp;<div><ul><li>ได้เดินทางโดยรถบัสจํานวน 6 คัน&nbsp;</li><li>และรถตู้อีก 7 คัน พร้อม</li></ul><div style="text-align: center;">เพื่อเข้าร่วมการชุมนุมเป็นเวลา 3 วัน ร่วมกับกลุ่มประมงจาก 22 จังหวัด
ชายทะเล ที่บริเวณด้านหน้ากระทรวงเกษตรและสหกรณ์ กรุงเทพมหานคร เพื่อทวงถามถึงข้อเรียกร้อง 11 ข้อ
ในการจัดการปัญหาที่ส่งผลกระทบต่อการทําประมงของไทยจากรัฐบาล</div><div style="text-align: center;">&nbsp;
<img src="https://picsum.photos/500/300" height="200"></div></div>`,
    tag: "ผู้เดือดร้อน",
    // images: ['image1', 'image2', 'image3'],
    images: [
      imageList[6].img,
      imageList[7].img,
      imageList[8].img,
    ],
    created_date: "01-01-2024",
    updated_date: "01-01-2024",
    updated_by: "admin",
    created_by: "admin"
  },

])


const initialPagination = {
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 10
  // rowsNumber: xx if getting data from a server
}
// function clickVisible() {
//   console.log(visibleColumns.value)
// }

const suggestions = [
  'อัตโนมัติ',   // automation
  'นักบินอัตโนมัติ', // autopilot
  'ยานยนต์',  // automobile
  'ระบบอัตโนมัติ', // autonomous system
  'อนุญาต',   // authorize
  'เครื่องจักร', // machinery
  'หุ่นยนต์',   // robot
  'การเขียนโปรแกรม', // programming
  'การจัดการ', // management
  'คอมพิวเตอร์', // computer
  'เทคโนโลยี', // technology
  'นวัตกรรม', // innovation
  'ระบบควบคุม', // control system
  'ระบบสารสนเทศ', // information system
  'ปัญญาประดิษฐ์', // artificial intelligence
  'การวิเคราะห์', // analytics
  'ซอฟต์แวร์', // software
  'วิศวกรรม', // engineering
  'อินเทอร์เน็ต', // internet
  'เครือข่าย', // network

  // Thai Provinces
  'กรุงเทพมหานคร', // Bangkok
  'เชียงใหม่', // Chiang Mai
  'ภูเก็ต', // Phuket
  'ขอนแก่น', // Khon Kaen
  'ชลบุรี', // Chonburi
  'เชียงราย', // Chiang Rai
  'นครราชสีมา', // Nakhon Ratchasima
  'นครศรีธรรมราช', // Nakhon Si Thammarat
  'สงขลา', // Songkhla
  'สุราษฎร์ธานี', // Surat Thani
  'ระยอง', // Rayong
  'ลำปาง', // Lampang
  'เพชรบุรี', // Phetchaburi
  'ประจวบคีรีขันธ์', // Prachuap Khiri Khan
  'อุบลราชธานี', // Ubon Ratchathani
  'ราชบุรี', // Ratchaburi
  'พระนครศรีอยุธยา', // Phra Nakhon Si Ayutthaya
  'สระบุรี', // Saraburi
  'สกลนคร', // Sakon Nakhon
  'บุรีรัมย์', // Buriram
  'ตรัง', // Trang
  'นราธิวาส', // Narathiwat
  'ปัตตานี', // Pattani
  'ยะลา', // Yala
  'แม่ฮ่องสอน', // Mae Hong Son
  'นครพนม', // Nakhon Phanom
  'อุดรธานี', // Udon Thani

  // Tags about News
  'ข่าวด่วน', // breaking news
  'การเมือง', // politics
  'เศรษฐกิจ', // economy
  'สังคม', // society
  'บันเทิง', // entertainment
  'กีฬา', // sports
  'การศึกษา', // education
  'เทคโนโลยี', // technology
  'สุขภาพ', // health
  'วิทยาศาสตร์', // science
  'สิ่งแวดล้อม', // environment
  'อาชญากรรม', // crime
  'ต่างประเทศ', // international
  'ท้องถิ่น', // local
  'ธุรกิจ', // business
  'การท่องเที่ยว', // tourism
  'วัฒนธรรม', // culture
  'ศาสนา', // religion
  'ประเพณี', // tradition

  'ระเบิด',
  'ภายในประเทศ',
  'ต่างประเทศ',
  'ภายนอกประเทศ',
  'ผู้เดือดร้อน'
]

const filterOptions = ref(suggestions)
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

// const filteredSuggestions = computed(() => {
//   if (newTag.value) {
//     return suggestions.value.filter(tag => tag.includes(newTag.value));
//   }
//   return [];
// });

function filterFn(val, update) {
  update(() => {
    if (val === '') {
      filterOptions.value = suggestions
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = suggestions.filter(
        v => v.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}
function createValue(val, done) {

  if (val.length > 0) {
    const modelValue = (newTag.value || []).slice()

    val
      .split(/[,;|]+/)
      .map(v => v.trim())
      .filter(v => v.length > 0)
      .forEach(v => {
        if (suggestions.includes(v) === false) {
          suggestions.push(v)
        }
        if (modelValue.includes(v) === false) {
          modelValue.push(v)
        }
      })

    done(null)
    newTag.value = modelValue
  }
}
function pasteCapture(event) {
  console.log(event)
}
function dropCapture(event) {
  console.log(event)
}
const add_new_letter_diag = ref(false)
const maximizedToggle = ref(true)
const newTag = ref(null)
const create_new_letter = ref([
  {
    index: 0,
    title: "",
    paragraph: "",
    tag: [],
    images: ['image1', 'image2', 'image3'],
    created_date: "",
    updated_date: "",
    new_date: "",
    updated_by: "",
    created_by: ""
  }
])

function addNewsLetter() {
  isEditMode.value = false
  // console.log(newTag.value)
  create_new_letter.value = [
    {
      index: 0,
      title: "",
      paragraph: "",
      tag: [],
      images: ['image1', 'image2', 'image3'],
      created_date: "",
      updated_date: "",
      new_date: "",
      updated_by: "",
      created_by: ""
    }
  ]

  console.log(add_new_letter_diag.value)
  add_new_letter_diag.value = true
}

function editNewsLetter(value) {
  newTag.value = []
  newTag.value.push(value.tag)
  create_new_letter.value = value
  isEditMode.value = true
  add_new_letter_diag.value = true

  console.log(newTag)
  console.log(value)
}

function addNewsLetterFile() {
  console.log(file.value)
  file.value.pickFiles()
  // file.pickFiles();
}

function exportTable() {
  // naive encoding to csv format
  let export_datetime = moment().format('YYYY-MM-DD_HH-mm-ss');
  const content = [table_columns.map(col => wrapCsvValue(col.label))].concat(
    table_rows.value.map(row => table_columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(

    `hotel_list_${export_datetime}.csv`,
    content,

    {
      encoding: "utf-8",
      mimeType: "text/csv",
      byteOrderMark: "\uFEFF",
    }
    // 'text/csv;charset=utf-8'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
function truncateString(value: string) {
  value = value.replace(`<img src="https://picsum.photos/500/300" height="200">`, "")
  value = value.replace(`<div style="text-align: center;">`, "")
  value = value.replace(`&nbsp;`, "")
  value = value.replace(`<blockquote>`, "")
  value = value.replace(`</blockquote>`, "")
  // if (value.includes(`height="200">`)) {
  //   let checkSplit = value.split(`height="200">`)
  //   console.log(checkSplit)
  //   if(checkSplit[0].includes(`<img src="`)){
  //     value = checkSplit[1]
  //   }
  //   if(checkSplit[1].includes(`<img src="`)){
  //     value = checkSplit[0] 
  //   }

  // }
  value.trimStart()
  if (value.length > 100) {
    return (value.substring(0, 80)) + "..."
  } else {
    return value
  }
}




onMounted(() => {
  dateFilter.value = moment().format('DD-MM-YYYY');
  // newData.value = getCurrentNews()
  // console.log(newData.value)

  // for (let index = 0; index < news.value.length; index++) {
  //   const element = news.value[index];
  //   element.index = index + 1

  // }
  // console.log(news.value)
  // table_rows.value = news.value
})
</script>
<template>
  <!-- <q-btn @click="clickVisible">asda</q-btn> -->
  <q-page class="q-pa-lg">
    <div>
      <h4 class="q-pa-sm q-ma-sm text-center text-bold">จดหมายข่าว</h4>
    </div>
    <div class="q-pa-md">
      <!-- <div class="q-pa-md">
        <q-table class="my-sticky-header-table" :filter="filter" flat bordered title="Treats" :rows="table_rows"
          :columns="table_columns" row-key="name" />
      </div> -->

      <q-table auto-width style="height: 75vh;" :filter="filter" class="my-sticky-header-table" flat bordered
        title="ข้อมูลจดหมายข่าว" :rows="table_rows" :columns="table_columns" row-key="name" wrap-cells
        no-data-label="ไม่พบข้อมูลที่ท่านค้นหา" separator="cell">
        <template v-slot:top-right>

          <q-file outlined dense v-model="excelFile" label="อัพโหลดจดหมายข่าว" style="min-width: 100px"
            accept="image/jpeg , .pdf , .xls , .xlsx">
            <template v-slot:prepend>
              <q-icon name="upload_file" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop.prevent="excelFile = null" class="cursor-pointer" />
            </template>

          </q-file>
          <!-- <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="exportTable" /> -->

          <q-btn outlined push color="primary" class="q-ml-sm" icon-right="add" label="เพิ่มจดหมายข่าว" no-caps
            @click="addNewsLetter()" />
        </template>
        <template v-slot:top-left>

          <q-input label="ค้นหา" outlined style="width: 30vw;" dense debounce="300" color="white" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" color="white" />
            </template>
          </q-input>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-bold bg-primary"
              style="font-size: large;font-weight: bold;">
              <!-- <h6 class="text-bold q-pa-none q-ma-none">      {{ col.label }}</h6> -->
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-index="props">
          <q-td :props="props">


            <q-chip class="shadow-up-3" clickable rounded @click="editNewsLetter(props.row)">
              <q-avatar icon="edit" color="green" text-color="white"></q-avatar>
              <div class="text-center text-bold">{{ props.row.index }} </div>
            </q-chip>
            <!-- <q-chip>
              <q-btn dense rounded color="blue-grey" icon="edit" @click="editNewsLetter(props.row)" />
              <q-avatar color="green" text-color="white">{{ props.row.index }}</q-avatar>
            </q-chip> -->

          </q-td>
        </template>
        <template v-slot:body-cell-paragraph="props">
          <q-td :props="props">
            <q-card-section v-html="truncateString(props.row.paragraph)" />
            <!-- {{ truncateString(props.row.paragraph) }} -->
            <div v-if="props.row.paragraph.length > 100">
              <!-- <q-btn color="primary">
                เพิ่มเติม
                <q-tooltip class="bg-purple text-body2" :offset="[10, 10]">
                  {{ props.row.paragraph
                  }}
                </q-tooltip>
              </q-btn> -->

            </div>
          </q-td>
        </template>

        <!-- <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left"> {{ props.row.paragraph }}.</div>
            </q-td>
          </q-tr>
        </template> -->
        <!-- <template v-slot:top>
          <div class="row  justify-between">

            <div class="col-6">
              <q-input label="ค้นหา" outlined style="width: 30vw;" dense debounce="300" color="white" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" color="white" />
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <div class="row">
                <q-file outlined dense v-model="excelFile" label="อัพโหลดไฟล์ข่าว" style="min-width: 150px">
                  <template v-slot:prepend>
                    <q-icon name="upload_file" @click.stop.prevent />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click.stop.prevent="excelFile = null" class="cursor-pointer" />
                  </template>

                </q-file>

                <q-btn outlined push color="primary" class="q-ml-sm" icon-right="add" label="เพิ่มจดหมายข่าว" no-caps
                  @click="addNewsLetter()" />
              </div>
            </div>
          </div>
        </template> -->
        <!-- <template v-slot:top-right>
          <q-btn outlined push color="primary" class="q-ml-sm" icon-right="add" label="เพิ่มจดหมายข่าว" no-caps
            @click="addNewsLetter()" />

        </template> -->
        <!-- 
        <template v-slot:body-cell-hotel_name="props">
          <q-td :props="props">

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
        </template> -->
      </q-table>

    </div>

    <q-dialog v-model="add_new_letter_diag" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card>
        <q-bar class="bg-primary">
          <div class="text-bold">เพิ่มจดหมายข่าว</div>

          <q-space />
          <q-btn class="bg-dark" dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">ย่อ</q-tooltip>
          </q-btn>
          <q-btn class="bg-dark" dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">ขยาย</q-tooltip>
          </q-btn>
          <q-btn class="bg-dark" dense flat color="red" icon="close" v-close-popup>
            <q-tooltip class="bg-red text-white">ปิด</q-tooltip>
          </q-btn>
        </q-bar>

        <!-- <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section> -->
        <div class="q-pa-lg example-col-gutter-horizontal q-gutter-x-xs q-gutter-y-lg">

          <div class="row q-col-gutter-x-md">
            <q-input outlined dense class="col-9" label="หัวข้อ" v-model="create_new_letter.title"></q-input>
            <q-input class="col-3" dense outlined v-model="create_new_letter.created_date" label="วันที่( วัน-เดือน-ปี )">
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

            <q-editor v-model="create_new_letter.paragraph" @paste.native="evt => pasteCapture(evt)"
              @drop.native="evt => dropCapture(evt)" :dense="$q.screen.lt.md" :toolbar="[
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

                ['undo', 'redo'], ['viewsource']
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
              <div class="column" style="height: 100%">
                <div>
                  <!-- <q-input outlined dense label="ขื่อ Tag" v-model="newTag" @keyup.enter="addTag"></q-input> -->
                  <!-- <q-select outlined dense label="ชื่อ Tag" v-model="newTag" :options="filteredSuggestions" use-input
                    use-chips @filter="filterTags" @new-value="addTag" @remove="removeTag" input-debounce="0"></q-select> -->
                  <!-- <q-select v-if="newTag" outlined dense label="Suggestions" :options="filteredSuggestions"
                    option-value="value" option-label="label" @input="newTag = $event" /> -->
                  <q-select outlined dense label="ขื่อ Tag" v-model="newTag" use-input use-chips multiple
                    input-debounce="0" @new-value="createValue" :options="filterOptions" @filter="filterFn">
                    <template v-slot:selected-item="scope">
                      <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                        color="primary" text-color="white" class="q-mt-sm">

                        {{ scope.opt }}
                      </q-chip>
                    </template>
                  </q-select>
                </div>
                <!-- <div class="q-mt-md">
                  <q-chip square v-for="(tag, index) in create_new_letter[0].tag" :key="index" removable
                    @remove="removeTag(index)" class="q-mr-sm q-mb-sm q-mt-none" color="primary">
                    {{ tag }}
                  </q-chip>
                </div> -->
                <q-input class="q-mt-md" outlined dense label="วันเวลาข่าว" v-model="create_new_letter.new_date">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="create_new_letter.new_date" mask="DD-MM-YYYY HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="create_new_letter.new_date" mask="DD-MM-YYYY HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <!-- <div class="col-4  self-center">
                  <q-btn size="xl" push color="green" label="บันทึกข่าว"></q-btn>
                </div> -->

              </div>


            </div>

            <div class="col-6">
              <q-uploader label="เพิ่มภาพ ( ไม่เกิน 3 ภาพ )" multiple hide-upload-btn style="height: 20vh;width: 100%;"
                max-files="3">
                <template v-slot:list="scope">
                  <q-list separator>

                    <q-item v-for="(file, index) in scope.files" :key="file.__key">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">
                          {{ file.name }}
                        </q-item-label>

                        <q-item-label caption>
                          Size : {{ file.__sizeLabel }}
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

            <div class="col-12 items-center">
              <div v-if="isEditMode" class="column items-center q-mt-lg" style="height: 100%">
                <q-btn size="lg" push color="green" label="บันทึกข่าว"></q-btn>
              </div>
              <div v-if="!isEditMode" class="column items-center q-mt-lg" style="height: 100%">
                <q-btn size="lg" push color="green" label="สร้างข่าว"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>


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
