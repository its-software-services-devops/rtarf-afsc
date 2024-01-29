
<template>
  <!-- <q-btn @click="clickVisible">asda</q-btn> -->
  <q-page class="q-pa-lg">


    <div>
      <h4 class="q-pa-sm q-ma-sm text-center text-bold">รายงาน</h4>

    </div>
    <div class="q-pa-md">
      <div class="q-pa-md example-col-gutter-horizontal">
        <div class="row q-col-gutter-x-md">
          <q-input dense class="col-4" filled v-model="dateStart" label="วันที่( วัน-เดือน-ปี )">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateStart" mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="text-center self-center">
            ถึง
          </div>

          <q-input dense class="col-4" filled v-model="dateEnd" label="วันที่( วัน-เดือน-ปี )">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateEnd" mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-btn class="col-2 q-ml-lg" color="primary" @click="onClickSearch">แสดง</q-btn>
        </div>
      </div>

    </div>

    <div class="q-pa-md">
      <div style="height: 50vh;">
        <Bar :data="chartData" :options="chartOptions" />
      </div>


    </div>

  </q-page>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { date } from 'quasar';

// Register
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

function useDateFn() {
  const currentDate = moment();
  let futureDate30 = currentDate.add(30, 'days');
  let next_30_day = futureDate30.format('DD-MM-YYYY'); // 2024-01-18

  let futureDate31 = currentDate.add(1, 'days');
  let next_31_day = futureDate31.format('DD-MM-YYYY');
  let today = moment().format('DD-MM-YYYY');

  return { next_30_day: next_30_day, next_31_day: next_31_day, today: today }
}

const file = ref(null)
const excelFile = ref("")
const isEditMode = ref(false)
const textEdit = ref('')
const filter = ref('')
const dateFilter = ref(null)
const dateStart = ref(null)
const dateEnd = ref(null)


const news_letter = [
  {
    created_at: '01-01-2024',
    total_news_letter: 10
  },
  {
    created_at: '02-01-2024',
    total_news_letter: 12
  },
  {
    created_at: '03-01-2024',
    total_news_letter: 14
  },
  {
    created_at: '04-01-2024',
    total_news_letter: 20
  },
  {
    created_at: '05-01-2024',
    total_news_letter: 11
  },
  {
    created_at: '06-01-2024',
    total_news_letter: 10
  },
  {
    created_at: '07-01-2024',
    total_news_letter: 13
  },
  {
    created_at: '08-01-2024',
    total_news_letter: 15
  },
  {
    created_at: '09-01-2024',
    total_news_letter: 10
  },
  {
    created_at: '10-01-2024',
    total_news_letter: 19
  },
]

const chartData = ref({
  labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'May'],
  datasets: [
    {
      label: 'จำนวนจดหมายข่าว',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 50, 10],
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  height: 400,
})

function onClickSearch() {
  console.log(dateStart.value)
  const dateParts = dateStart.value.split("-");
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1; // Months are 0-indexed in JavaScript Date objects
  const year = Number(dateParts[2]);

  const dateParts2 = dateEnd.value.split("-");
  const day2 = Number(dateParts2[0]);
  const month2 = Number(dateParts2[1]) - 1; // Months are 0-indexed in JavaScript Date objects
  const year2 = Number(dateParts2[2]);
  let date1 = new Date(year, month, day);
  let date2 = new Date(year2, month2, day2);

  let pre_chart = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'May'],
    datasets: [
      {
        label: 'จำนวนจดหมายข่าว',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 50, 10],
      },
    ],
  }

  console.log(date1)
  console.log(date2)
  if (date2 > date1) {

    const differenceInMilliseconds = date2 - date1
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    console.log("Difference in days:", differenceInDays);
    let chartLabel = []
    let data = []
    const currentStartDate = date1
    // console.log(currentStartDate)
    for (let index = 0; index < differenceInDays; index++) {
      // const add_date = new Date(date1.getTime()); 
      // let new_date = date1.getDate() + index
      // newDate.setDate(newDate.getDate() + 1);
      // let add_date = currentStartDate.add(index, 'days');
      let add_date = currentStartDate.setDate(date1.getDate() + 1);
      // console.log(currentStartDate)
      // console.log(date1)
      let momentDate = moment(add_date);

      // Format the Moment object into DD-MM-YYYY string:
      let formattedDate = momentDate.format("DD-MM-YYYY");
      chartLabel.push(formattedDate)
      data.push(Math.floor(Math.random() * 30))
      console.log(chartLabel)
      // chartLabel.push(dateStart.value.add(index, 'days'))
      // console.log(chartLabel)

    }
    pre_chart.labels = chartLabel
    pre_chart.datasets[0].data = data
    chartData.value = []
    chartData.value = pre_chart
    // chartData.value.labels = chartLabel
    // chartData.value.datasets.data = data
    console.log(chartData.value)

  } else {
    alert("กรุณาใส่วันที่เริ่มต้น น้อยกว่าวันที่สิ้นสุด");
    // chartData.value.labels = chartLabel
    // chartData.value.datasets.data = chartData
  }

}


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


// function exportTable() {
//   // naive encoding to csv format
//   let export_datetime = moment().format('YYYY-MM-DD_HH-mm-ss');
//   const content = [table_columns.map(col => wrapCsvValue(col.label))].concat(
//     table_rows.value.map(row => table_columns.map(col => wrapCsvValue(
//       typeof col.field === 'function'
//         ? col.field(row)
//         : row[col.field === void 0 ? col.name : col.field],
//       col.format,
//       row
//     )).join(','))
//   ).join('\r\n')

//   const status = exportFile(

//     `hotel_list_${export_datetime}.csv`,
//     content,

//     {
//       encoding: "utf-8",
//       mimeType: "text/csv",
//       byteOrderMark: "\uFEFF",
//     }
//     // 'text/csv;charset=utf-8'
//   )

//   if (status !== true) {
//     $q.notify({
//       message: 'Browser denied file download...',
//       color: 'negative',
//       icon: 'warning'
//     })
//   }
// }

// function onClickSearch() {
//   console.log('start:' + dateStart.value)
//   console.log('start:' + dateEnd.value)

// }



onMounted(() => {
  let currentDate = moment();
  dateEnd.value = moment().format('DD-MM-YYYY');
  let futureDate7 = currentDate.add(-7, 'days');
  dateStart.value = futureDate7.format('DD-MM-YYYY');
  onClickSearch()

  // dateEnd.value = moment().format('DD-MM-YYYY');  

})
</script>