<script setup lang="ts">
import { ref } from 'vue';
import type { EssentialLinkProps } from '../components/EssentialLink.vue';
const route = useRoute()
const menuInsetLevel = 0.3
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'หน้าหลัก',
    caption: 'จดหมายข่าว',
    icon: 'newspaper',
    link: "/"
  },
  {
    title: 'รายงาน',
    caption: 'รายงานจดหมายข่าว',
    icon: 'library_books',
    link: '/dashboard'
  },
];
const reportMenu: EssentialLinkProps[] = [
  {
    title: 'จำนวนจดหมายข่าว',
    caption: 'รายงานจำนวนจดหมายข่าวรายวัน',
    icon: 'library_books',
    link: '/dashboard/index'
  },
  {
    title: 'จำแนกตามจังหวัด',
    caption: 'รายงานจดหมายข่าว จำแนกตามจังหวัด',
    icon: 'library_books',
    link: '/dashboard/by_province'
  },
];
const splitterModel = ref(50)
const selected = ref('Food')
const simple = [
  {
    label: 'Relax Hotel',
    icon: "summarize",
    children: [
      {
        label: 'จำนวนจดหมายข่าว',
        icon: 'restaurant_menu'
      },
      {
        label: 'แยกตามจังหวัด',
        icon: 'room_service'
      },
    ]
  }
]

const leftDrawerOpen = ref(false)
const initUsername = ref(false)
const username = ref('admin')
function logout() {
  let currentUrl = new URL(window.location)
  localStorage.removeItem('UserProfile')
  location.replace(currentUrl.origin + "/login")
}
function toggleLeftDrawer() {
  console.log('eftDrawerOpen.value')
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function setUsername() {
  let local_username = useGetUsername()
  // username.value = local_username
  console.log('get username')
  console.log(local_username)
  // local_username = "admin"
  if (local_username) {
    username.value = local_username
    initUsername.value = true
    console.log(local_username)
    console.log('username set !')
  } else {
    console.log('username not set')
  }

}
function handleBeforeUnload() {
  // Clear local storage or perform other actions
  console.log('clear storage')
  localStorage.clear();
};
// window.addEventListener('beforeunload', handleBeforeUnload);




onBeforeMount(() => {
  // window.removeEventListener('beforeunload', handleBeforeUnload);
  if (typeof window !== 'undefined') {
    console.log('onBeforeMount')
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }
  // useCheckLogin()
  // setUsername()
})
watchEffect(() => {
  // console.log('in watch eff')
  if (route.path != '/login') { // Check if in main page
    // console.log('')

    username.value = 'admin'
    initUsername.value = true

    // setUsername(); // Trigger the function
  }
});
onMounted(() => {
  useCheckLogin()
  setUsername()
  leftDrawerOpen.value = false


  if (typeof window !== 'undefined') {
    console.log('onMounted')
    window.addEventListener('beforeunload', handleBeforeUnload);
  }
})


// onbeforeunload(() => {
//   localStorage.clear()
// })

</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div v-show="initUsername">
          <q-btn flat dense round icon="menu" aria-label="Menu" :glossy="false" @click="toggleLeftDrawer" />
        </div>
        <q-toolbar-title>
          ศูนย์รักษาความปลอดภัยแห่งชาติ
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <!-- <div v-show="initUsername"> -->
        <div v-show="(route.path != '/login')">

          <q-chip outline color="white" text-color="white" icon="account_circle">
            {{ username }}
          </q-chip>
          <q-btn class="q-ml-md" push color="dark" label="ออกจากระบบ" size="sm" @click="logout()">
          </q-btn>
        </div>



      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :breakpoint="500" bordered v-show="initUsername">
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        <!-- <q-expansion-item expand-separator icon="settings_ethernet" label="รายงาน" caption="รายงานจดหมายข่าว"> -->
        <q-expansion-item :header-inset-level="menuInsetLevel" expand-separator icon="library_books" label="รายงาน"
          caption="รายงานจดหมายข่าว">
          <q-card>
            <MenuRedirect v-for=" link  in  reportMenu " :key="link.title" v-bind="link" />
          </q-card>
        </q-expansion-item>
        <!-- </q-expansion-item> -->
      </q-list>
      <div>
        <q-tree :nodes="simple" node-key="label" selected-color="primary" v-model:selected="selected"
          default-expand-all />
        <!-- <q-splitter v-model="splitterModel" style="height: 400px">

          <template v-slot:before>
            <div class="q-pa-md">
              <q-tree :nodes="simple" node-key="label" selected-color="primary" v-model:selected="selected"
                default-expand-all />
            </div>
          </template>


        </q-splitter> -->
      </div>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

